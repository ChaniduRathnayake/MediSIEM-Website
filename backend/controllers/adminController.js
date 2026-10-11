const ContactMessage = require('../models/ContactMessage');

// Fields managed by Mongoose itself; never taken from the request body.
const SYSTEM_FIELDS = ['_id', '__v', 'createdAt', 'updatedAt'];

// Copies only the fields defined on the model's schema from the request body.
function pickWritable(Model, body = {}) {
  const writable = Object.keys(Model.schema.paths).filter((p) => !SYSTEM_FIELDS.includes(p));
  return Object.fromEntries(writable.filter((p) => body[p] !== undefined).map((p) => [p, body[p]]));
}

const notFound = (res) => res.status(404).json({ success: false, message: 'Not found' });

// Create / update / delete handlers for one CDAP content model.
function crudFor(Model) {
  return {
    // POST /api/admin/cdap/<collection>
    async create(req, res, next) {
      try {
        const doc = await Model.create(pickWritable(Model, req.body));
        res.status(201).json({ success: true, data: doc });
      } catch (error) {
        next(error);
      }
    },

    // PUT /api/admin/cdap/<collection>/:id is a partial update. It loads and saves
    // the document (rather than findByIdAndUpdate) so every schema validator,
    // including cross-field ones, runs exactly as it does on create.
    async update(req, res, next) {
      try {
        const doc = await Model.findById(req.params.id);
        if (!doc) return notFound(res);
        doc.set(pickWritable(Model, req.body));
        await doc.save();
        res.json({ success: true, data: doc });
      } catch (error) {
        next(error);
      }
    },

    // DELETE /api/admin/cdap/<collection>/:id
    async remove(req, res, next) {
      try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) return notFound(res);
        res.json({ success: true, data: { _id: doc._id } });
      } catch (error) {
        next(error);
      }
    },
  };
}

// GET /api/admin/messages?source=website|cdap&limit=50
async function listMessages(req, res, next) {
  try {
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 50, 1), 200);
    const filter = {};
    if (req.query.source) {
      if (!['website', 'cdap'].includes(req.query.source)) {
        return res.status(400).json({ success: false, message: "source must be 'website' or 'cdap'" });
      }
      filter.source = req.query.source;
    }
    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 }).limit(limit);
    res.json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/admin/messages/:id
async function deleteMessage(req, res, next) {
  try {
    const doc = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!doc) return notFound(res);
    res.json({ success: true, data: { _id: doc._id } });
  } catch (error) {
    next(error);
  }
}

module.exports = { crudFor, listMessages, deleteMessage, pickWritable };

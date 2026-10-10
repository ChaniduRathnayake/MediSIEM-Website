const Document = require('../models/Document');

// GET /api/documents?category=document|presentation
async function getDocuments(req, res, next) {
  try {
    const { category } = req.query;
    const filter = {};

    if (category) {
      if (!['document', 'presentation'].includes(category)) {
        return res.status(400).json({
          success: false,
          message: "category must be 'document' or 'presentation'",
        });
      }
      filter.category = category;
    }

    const documents = await Document.find(filter).sort({ date: -1 });
    res.json({ success: true, data: documents });
  } catch (error) {
    next(error);
  }
}

module.exports = { getDocuments };

const express = require('express');
const { requireAdmin, adminRateLimiter } = require('../middleware/requireAdmin');
const { crudFor, listMessages, deleteMessage } = require('../controllers/adminController');
const CdapMilestone = require('../models/CdapMilestone');
const CdapDocument = require('../models/CdapDocument');
const CdapMember = require('../models/CdapMember');

// Everything under /api/admin needs "Authorization: Bearer <ADMIN_API_KEY>".
const router = express.Router();

router.use(adminRateLimiter, requireAdmin);

router.get('/messages', listMessages);
router.delete('/messages/:id', deleteMessage);

// CDAP site content: POST to create, PUT /:id to update, DELETE /:id to remove.
// Reading uses the public /api/cdap/* endpoints.
const collections = { milestones: CdapMilestone, documents: CdapDocument, team: CdapMember };

for (const [name, Model] of Object.entries(collections)) {
  const { create, update, remove } = crudFor(Model);
  router.post(`/cdap/${name}`, create);
  router.put(`/cdap/${name}/:id`, update);
  router.delete(`/cdap/${name}/:id`, remove);
}

module.exports = router;

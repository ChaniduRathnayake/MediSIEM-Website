const express = require('express');
const { getMilestones, getDocuments, getTeam } = require('../controllers/cdapController');

// Public, read-only content for the CDAP research site (cdap-site/).
const router = express.Router();

router.get('/milestones', getMilestones);
router.get('/documents', getDocuments);
router.get('/team', getTeam);

module.exports = router;

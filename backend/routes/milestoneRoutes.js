const express = require('express');
const { getMilestones } = require('../controllers/milestoneController');

const router = express.Router();

router.get('/', getMilestones);

module.exports = router;

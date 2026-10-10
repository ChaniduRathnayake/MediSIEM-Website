const express = require('express');
const { getTeam } = require('../controllers/teamController');

const router = express.Router();

router.get('/', getTeam);

module.exports = router;

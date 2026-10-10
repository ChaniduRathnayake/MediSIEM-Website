const Milestone = require('../models/Milestone');

// GET /api/milestones
async function getMilestones(req, res, next) {
  try {
    const milestones = await Milestone.find().sort({ date: 1 });
    res.json({ success: true, data: milestones });
  } catch (error) {
    next(error);
  }
}

module.exports = { getMilestones };

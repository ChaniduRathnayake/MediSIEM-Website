const TeamMember = require('../models/TeamMember');

// Fields kept on the record for internal reference only — never sent to the
// public site.
const PRIVATE_FIELDS = '-studentId -email';

// GET /api/team
async function getTeam(req, res, next) {
  try {
    const team = await TeamMember.find().select(PRIVATE_FIELDS).sort({ order: 1 });
    res.json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
}

module.exports = { getTeam };

const CdapMilestone = require('../models/CdapMilestone');
const CdapDocument = require('../models/CdapDocument');
const CdapMember = require('../models/CdapMember');

// GET /api/cdap/milestones
async function getMilestones(req, res, next) {
  try {
    const milestones = await CdapMilestone.find().sort({ order: 1 });
    res.json({ success: true, data: milestones });
  } catch (error) {
    next(error);
  }
}

// GET /api/cdap/documents?kind=document|slides
async function getDocuments(req, res, next) {
  try {
    const { kind } = req.query;
    const filter = {};

    if (kind) {
      if (!['document', 'slides'].includes(kind)) {
        return res.status(400).json({ success: false, message: "kind must be 'document' or 'slides'" });
      }
      filter.kind = kind;
    }

    const documents = await CdapDocument.find(filter).sort({ order: 1 });
    res.json({ success: true, data: documents });
  } catch (error) {
    next(error);
  }
}

// GET /api/cdap/team
async function getTeam(req, res, next) {
  try {
    const team = await CdapMember.find().sort({ order: 1 });
    res.json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
}

module.exports = { getMilestones, getDocuments, getTeam };

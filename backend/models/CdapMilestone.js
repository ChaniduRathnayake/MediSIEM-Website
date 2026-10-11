const mongoose = require('mongoose');

// Assessment milestones for the CDAP research site (cdap-site/), kept apart
// from the commercial site's product roadmap (Milestone). `order` sets the
// drop-down order; `dateLabel` is the display text (e.g. "16-18 Mar 2026"),
// so `date` is optional.
const cdapMilestoneSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9-]+$/, 'key may only contain a-z, 0-9 and hyphens'],
    },
    title: { type: String, required: true, trim: true },
    dateLabel: { type: String, required: true, trim: true },
    date: { type: Date, default: null },
    description: { type: String, required: true, trim: true },
    marks: { type: Number, min: 0, max: 100, default: null },
    status: { type: String, enum: ['completed', 'upcoming'], default: 'upcoming' },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CdapMilestone', cdapMilestoneSchema);

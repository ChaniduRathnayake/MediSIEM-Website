const mongoose = require('mongoose');

// `date` holds the start date of the milestone (used for sorting), while
// `dateLabel` holds the human-readable text shown in the UI, since several
// milestones span a date range (e.g. "16-18 Mar 2026").
const milestoneSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    dateLabel: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['completed', 'upcoming'],
      required: true,
    },
    marks: { type: Number, default: null },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Milestone', milestoneSchema);

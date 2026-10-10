const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    studentId: { type: String, trim: true, default: '' },
    role: { type: String, required: true, trim: true },
    component: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    linkedin: { type: String, trim: true, default: '' },
    photoUrl: { type: String, trim: true, default: '' },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamMember', teamMemberSchema);

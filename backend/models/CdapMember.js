const mongoose = require('mongoose');
const { safeUrlValidator } = require('../utils/safeUrl');

// Group members and supervisors for the CDAP research site's About Us page.
// Unlike TeamMember (commercial site), studentId and email are public here.
const cdapMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    memberType: { type: String, enum: ['supervisor', 'co-supervisor', 'student'], required: true },
    role: { type: String, required: true, trim: true },
    studentId: { type: String, trim: true, default: '' },
    component: { type: String, trim: true, default: '' },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
      match: [/^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'email must be a valid address'],
    },
    photoUrl: { type: String, trim: true, default: '', validate: safeUrlValidator },
    linkedin: { type: String, trim: true, default: '', validate: safeUrlValidator },
    achievements: { type: [String], default: [] },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CdapMember', cdapMemberSchema);

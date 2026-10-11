const mongoose = require('mongoose');
const { safeUrlValidator } = require('../utils/safeUrl');

// Documents and slide decks listed on the CDAP research site. A `pending`
// item is shown without a link; an `available` one must have a fileUrl.
const cdapDocumentSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ['document', 'slides'], required: true },
    group: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    fileUrl: { type: String, trim: true, default: '', validate: safeUrlValidator },
    status: { type: String, enum: ['available', 'pending'], default: 'pending' },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

cdapDocumentSchema.pre('validate', function requireFileWhenAvailable(next) {
  if (this.status === 'available' && !this.fileUrl) {
    this.invalidate('fileUrl', 'fileUrl is required when status is "available"');
  }
  next();
});

module.exports = mongoose.model('CdapDocument', cdapDocumentSchema);

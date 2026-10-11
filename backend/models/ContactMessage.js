const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, trim: true, default: '' },
  message: { type: String, required: true, trim: true },
  // Which site the message came from: the marketing site or the CDAP site.
  source: { type: String, enum: ['website', 'cdap'], default: 'website' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);

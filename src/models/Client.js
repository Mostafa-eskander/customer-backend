const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  notes: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
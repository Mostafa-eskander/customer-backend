const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
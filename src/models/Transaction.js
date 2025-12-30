const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  amount: Number,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
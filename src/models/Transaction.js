const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  name: String,
  type: { 
    type: String, 
    enum: ['دخل', 'مصروف'],
    required: true 
  },
  amount: Number,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
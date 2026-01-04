const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['دخل', 'مصروف'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: String,

  // العميل
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },

  // صاحب الحساب (الأمان)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
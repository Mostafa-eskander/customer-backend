const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['دخل', 'مصروف'],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number
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

transactionSchema.pre('save', function(next) {
  this.total = this.quantity * this.price;
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
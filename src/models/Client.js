const mongoose = require('mongoose');
const Transaction = require('./Transaction'); // عشان نقدر نحذف المعاملات المرتبطة

const clientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  notes: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// 👈 قبل حذف العميل، احذف كل المعاملات المرتبطة به
clientSchema.pre('findOneAndDelete', async function(next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    await Transaction.deleteMany({ client: doc._id, user: doc.user });
  }
  next();
});

module.exports = mongoose.model('Client', clientSchema);
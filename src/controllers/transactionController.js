const Transaction = require('../models/Transaction');
const Client = require('../models/Client');


// 🟢 إنشاء معاملة (آمن)
exports.createTransaction = async (req, res) => {
  try {
    const { type, amount, description, client } = req.body;

    // تأكد إن العميل تابع لنفس اليوزر
    const foundClient = await Client.findOne({
      _id: client,
      user: req.user.id
    });

    if (!foundClient) {
      return res.status(403).json({ message: 'عميل غير مسموح' });
    }

    const transaction = await Transaction.create({
      type,
      amount,
      description,
      client,
      user: req.user.id
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🟢 جلب كل المعاملات (صاحب الحساب فقط)
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id
    }).populate('client', 'name');

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🟢 تعديل معاملة
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'غير مصرح أو غير موجود' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🟢 حذف معاملة
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!transaction) {
      return res.status(404).json({ message: 'غير مصرح أو غير موجود' });
    }

    res.json({ message: 'تم حذف المعاملة' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Transaction = require('../models/Transaction');

// فقط المعاملات الخاصة بالعميل المسجّل دخول
exports.getAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id; // معرف العميل من التوكن
    const transactions = await Transaction.find({ client: userId })
      .populate('client', 'name email');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    // نربط المعاملة بالعميل المسجل دخول
    const transaction = await Transaction.create({ ...req.body, client: req.user.id });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransactionsByClient = async (req, res) => {
  try {
    const userId = req.user.id;

    // بدل السطر القديم:
    // if (req.params.clientId !== userId) { ... }

    // استخدم السطر الجديد للتحويل لـ string:
    if (req.params.clientId !== userId.toString()) {
      return res.status(403).json({ message: 'غير مصرح لك بالوصول لهذه المعاملات' });
    }

    const transactions = await Transaction.find({ client: userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, client: userId }, // فقط المعاملات الخاصة بالعميل
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'المعاملة غير موجودة أو غير مصرح لك بتعديلها' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, client: userId });

    if (!transaction) {
      return res.status(404).json({ message: 'المعاملة غير موجودة أو غير مصرح لك بحذفها' });
    }

    res.json({ message: 'تم حذف المعاملة بنجاح' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
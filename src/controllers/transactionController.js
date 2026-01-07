const Transaction = require('../models/Transaction');
const Client = require('../models/Client');


// 🟢 إنشاء معاملة (آمن)
exports.createTransaction = async (req, res) => {
  try {
    const { type, quantity, price, description, client } = req.body;

    const foundClient = await Client.findOne({ _id: client, user: req.user.id });
    if (!foundClient) return res.status(403).json({ message: 'عميل غير مسموح' });

    const transaction = await Transaction.create({
      type,
      quantity,
      price,
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

// جلب كل معاملات عميل معين
exports.getTransactionsByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // تأكد إن المعاملات تابعة لنفس المستخدم
    const transactions = await Transaction.find({
      client: clientId,
      user: req.user.id
    }).populate('client', 'name'); // تجيب اسم العميل فقط

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get by id
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('client', 'name');

    if (!transaction) {
      return res.status(404).json({ message: 'المعاملة غير موجودة أو غير مصرح بها' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 تعديل معاملة
exports.updateTransaction = async (req, res) => {
  try {
    const { quantity, price } = req.body;

    // إعادة حساب total
    if (quantity && price) req.body.total = quantity * price;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!transaction) return res.status(404).json({ message: 'غير مصرح أو غير موجود' });

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
// 🟢 حذف كل المعاملات الخاصة بالمستخدم
exports.deleteAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    // حذف كل المعاملات الخاصة بالمستخدم
    await Transaction.deleteMany({ user: userId });

    res.json({ message: 'تم حذف جميع المعاملات بنجاح' });
  } catch (err) {
    console.error('Error deleting all transactions:', err);
    res.status(500).json({ message: 'حدث خطأ أثناء الحذف' });
  }
};
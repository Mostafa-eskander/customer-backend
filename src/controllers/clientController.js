const Client = require('../models/Client');

exports.createClient = async (req, res) => {
  const client = await Client.create({ ...req.body, user: req.user.id });
  res.status(201).json(client);
};

exports.getClients = async (req, res) => {
  const clients = await Client.find({ user: req.user.id });
  res.json(clients);
};

exports.getClientById = async (req, res) => {
  const client = await Client.findById(req.params.id);
  res.json(client);
};

exports.updateClient = async (req, res) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(client);
};

exports.deleteClient = async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: 'Client deleted' });
};

exports.deleteAllClients = async (req, res) => {
  try {
    // حذف جميع المعاملات الخاصة بالمستخدم
    await Transaction.deleteMany({ user: req.user.id });
    // حذف جميع العملاء الخاصة بالمستخدم
    await Client.deleteMany({ user: req.user.id });

    res.json({ message: 'تم حذف جميع العملاء وجميع معاملاتهم' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
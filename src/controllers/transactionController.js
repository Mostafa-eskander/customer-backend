const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
  const transaction = await Transaction.create(req.body);
  res.status(201).json(transaction);
};

exports.getTransactionsByClient = async (req, res) => {
  const transactions = await Transaction.find({ client: req.params.clientId });
  res.json(transactions);
};

exports.updateTransaction = async (req, res) => {
  const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(transaction);
};

exports.deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: 'Transaction deleted' });
};
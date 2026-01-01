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
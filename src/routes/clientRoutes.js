const express = require('express');
const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
  deleteAllClients
} = require('../controllers/clientController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createClient);
router.get('/', protect, getClients);
router.delete('/all', deleteAllClients);
router.get('/:id', protect, getClientById);
router.put('/:id', protect, updateClient);
router.delete('/:id', protect, deleteClient);

module.exports = router;
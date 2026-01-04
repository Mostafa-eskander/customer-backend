const express = require('express');
const {
  createTransaction,
  getAllTransactions,
  getTransactionsByClient,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');

const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createTransaction);
router.get('/', protect, getAllTransactions);
router.get('/client/:clientId', protect, getTransactionsByClient);
router.put('/:id', protect, updateTransaction);
router.delete('/:id', protect, deleteTransaction);

module.exports = router;
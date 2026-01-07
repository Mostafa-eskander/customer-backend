const express = require('express');
const {
  createTransaction,
  getAllTransactions,
  getTransactionsByClientId,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  deleteAllTransactions,
} = require('../controllers/transactionController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.get('/client/:clientId', getTransactionsByClientId);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

// 🗑️ endpoint جديد لحذف جميع المعاملات
router.delete('/all', deleteAllTransactions);
module.exports = router;
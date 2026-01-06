const express = require('express');
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
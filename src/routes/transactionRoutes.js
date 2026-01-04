const express = require('express');
const {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
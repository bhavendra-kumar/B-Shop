const express = require('express');
const router = express.Router();
const { addOrder, getUserOrders } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, addOrder);
router.get('/myorders', protect, getUserOrders);

module.exports = router;

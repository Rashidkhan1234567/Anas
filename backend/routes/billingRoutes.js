const express = require('express');
const router = express.Router();
const { getInvoices, collectPayment } = require('../controllers/billingController');
const { protect } = require('../middlewares/authMiddleware');
const { roleCheck } = require('../middlewares/roleMiddleware');

router.use(protect);
router.use(roleCheck('Receptionist'));

router.get('/', getInvoices);
router.put('/:id/pay', collectPayment);

module.exports = router;

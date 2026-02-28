const express = require('express');
const router = express.Router();
const { getDoctorAnalytics } = require('../controllers/doctorAnalyticsController');
const { protect } = require('../middlewares/authMiddleware');
const { roleCheck } = require('../middlewares/roleMiddleware');

router.use(protect);
router.use(roleCheck('Doctor'));

router.get('/', getDoctorAnalytics);

module.exports = router;

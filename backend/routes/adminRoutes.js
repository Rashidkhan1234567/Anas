const express = require('express');
const router = express.Router();
const { getUsersByRole, createUser, updateUser, deleteUser, getAnalytics } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');
const { roleCheck } = require('../middlewares/roleMiddleware');

router.use(protect);
router.use(roleCheck('Admin'));

// Users management
router.route('/users')
  .get(getUsersByRole)
  .post(createUser);

router.route('/users/:id')
  .put(updateUser)
  .delete(deleteUser);

// System analytics
router.get('/analytics', getAnalytics);

module.exports = router;

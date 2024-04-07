const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/course', require('./course'));
router.use('/enroll', require('./enroll_course'));
router.use('/token', require('./token'));
router.use('/ask', require('./chatAI'));

module.exports = router;
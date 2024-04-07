const express = require('express');
const router = express.Router();
const chatAPI_controller = require('../controller/chatAi_controller');
const passport = require('passport')

router.post('/user-chat',passport.authenticate('user-jwt', {session: false}), chatAPI_controller.query);
router.post('/admin-chat',passport.authenticate('admin-jwt', {session: false}), chatAPI_controller.query);

module.exports = router;





;
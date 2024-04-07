const express = require('express');
const router = express.Router();
const enrollController = require('../controller/enrollment_controller');
const passport = require('passport');

router.post('/:id', passport.authenticate('user-jwt', {session: false}), enrollController.create);
router.get('/view',passport.authenticate('user-jwt', {session: false}), enrollController.view);
router.delete('/delete/:courseId',passport.authenticate('user-jwt', {session: false}), enrollController.removeFromEnrollnment );

module.exports = router;
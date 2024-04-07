const express = require('express');
const router = express.Router();
const courseCotroller = require('../controller/course_controller');
const passport = require('passport');

router.post('/create', passport.authenticate('admin-jwt', {session: false}), courseCotroller.create);
router.put('/update/:id', passport.authenticate('admin-jwt', {session: false}), courseCotroller.update);
router.delete('/delete/:id', passport.authenticate('admin-jwt', {session: false}), courseCotroller.delete);
router.get('/viewcourse-admin', passport.authenticate('admin-jwt',{session: false}), courseCotroller.viewCourse);
router.get('/view-user', passport.authenticate('user-jwt', {session: false}), courseCotroller.viewCourse);
router.get('/viewfilter-user', passport.authenticate('user-jwt', {session: false}), courseCotroller.filteredData);
router.get('/viewfilter-admin', passport.authenticate('admin-jwt', {session: false}), courseCotroller.filteredData);

module.exports = router
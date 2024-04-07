const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

router.post('/create', userController.create);
router.post('/login', userController.login);
router.put('/update/:id', userController.update);
router.get('/view/:id', userController.view)

module.exports = router;
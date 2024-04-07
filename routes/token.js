const express = require('express');
const router = express.Router();
const tokenController = require('../controller/token_controller');

router.post('/create/:id', tokenController.create);
router.post('/set-password', tokenController.updatePassword);

module.exports = router;
const express = require('express');
const router = express.Router();

router.use('/chatrooms', require('./chatrooms'));

module.exports = router;

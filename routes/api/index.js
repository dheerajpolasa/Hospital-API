const express = require('express');
const router = express.Router();

// Version 1 route
router.use('/v1', require('./v1'));

module.exports = router;
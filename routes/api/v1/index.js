const express = require('express');
const router = express.Router();

// Route that handles all the requests related to doctors
router.use('/doctors', require('./doctors'));

// Route that handles all the requests related to patients
router.use('/patients', require('./patients'));

// Route that handles all the requests related to reports
router.use('/reports', require('./reports'));

module.exports = router;
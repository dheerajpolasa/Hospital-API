const express = require('express');
const passport = require('passport');
const router = express.Router();
const reportApi = require('../../../controllers/api/v1/reports_api');

// Route for fetching reports by status
router.get('/:status', passport.authenticate('jwt', {session: false}), reportApi.getReportsByStatus)

module.exports = router;
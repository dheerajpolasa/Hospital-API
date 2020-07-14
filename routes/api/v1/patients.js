const express = require('express');
const patientApi = require('../../../controllers/api/v1/patients_api')
const passport = require('passport')
const router = express.Router();

// Router for creating new patient 
router.post('/register', passport.authenticate('jwt', {session: false}), patientApi.createPatient);
// Route for creating new report
router.post('/:id/create-report', passport.authenticate('jwt', {session: false}), patientApi.createReport);
// Route for fetching all reports
router.get('/:id/all-reports', passport.authenticate('jwt', {session: false}), patientApi.fetchAllReports);
module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const doctorsApi = require('../../../controllers/api/v1/doctors_api')

router.get('/', doctorsApi.index);

// route for new doctor profile
router.post('/register', doctorsApi.createDoctor);
// route for creating sesion
router.post('/create-session', doctorsApi.createSession);
module.exports = router;
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Doctor = require('../models/doctor');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'corona'  
}

// For JWT Authentication
passport.use(new JWTStrategy(opts, function(jwtPayload, done) {
    console.log(jwtPayload);
    Doctor.findById(jwtPayload._id, function(err, doctor) {
        if(err) {console.log('Error in finding doctor'); return;}
        console.log(doctor);
        if(doctor) {
            return done(null, doctor);
        }

        return done(null, false);
    })
}));

module.exports = passport;
const Doctor = require('../../../models/doctor')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

module.exports.index = function(req, res) {
    console.log('Inside')
    return res.json(200, {
        message: 'working'
    })
}

// Creating Doctor session
module.exports.createSession = async function(req, res) {
    try {
        console.log(req.body);
        let doctor = await Doctor.findOne({username: req.body.username})

        if(!doctor) {
            return res.json(422, {
                message: 'Invalid Username or Password'
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(doctor.password, hashedPassword);
        await bcrypt.compare(req.body.password, doctor.password, (err, isMatch) => {
            if(err) throw err;
            console.log(isMatch);
            if(isMatch) {
                return res.json(200, {
                    message: 'Sign In successful, here is your token, please keep it safe',
                    data: {
                        token: jwt.sign(doctor.toJSON(), 'corona', {expiresIn: 100000})
                    }
                })
            } else {
                return res.json(422, {
                message: 'Invalid Username or Password'
                })
            }
        })

        
    } catch(err) {
        return res.json(500, {
            error: err
        })
    }
}

// Registering a new Doctor
module.exports.createDoctor = async function(req, res) {
    try {
        console.log(req.body);
        let doctor = await Doctor.findOne({username: req.body.username});
        console.log(doctor)
        if(doctor && doctor !== null) {
            return res.json(200, {
                message: 'Already registered'
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await Doctor.create({
            username: req.body.username,
            password: hashedPassword
        });
        return res.json({
            message: 'Doctor Profile Created',
            link: 'Hit this URI for creating session - /doctors/create-session'
        })
    } catch(err) {
        console.log('Error', err);
        return res.json({
            error: err
        })
    }
}


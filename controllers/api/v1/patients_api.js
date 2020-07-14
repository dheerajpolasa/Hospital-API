const Patient = require('../../../models/patient');
const Report = require('../../..//models/report');

// Creating a new patient
module.exports.createPatient = async function(req, res) {
    try {
        console.log(typeof parseInt(req.body.phoneNumber));
        console.log(typeof req.body.name)
        if(typeof parseInt(req.body.phoneNumber) !== 'number' || typeof req.body.name !== 'string') {
            return res.json(422, {
                message: 'Phone number should be a number and Name should a string'
            })
        }
        let patient = await Patient.findOne({phoneNumber: req.body.phoneNumber});
        if(patient && patient !== null) {
            return res.json(200, {
                message: 'Patient details are fetched from db',
                patient: patient
            })
        }
        patient = await Patient.create(req.body);
        return res.json(200, {
            message: 'Patient Profile is created',
            patient: patient
        })
    } catch(err) {
        console.log('**************', err)
        return res.json(500, {
            message: 'Internal server error'
        })
    }
}


// Creating a new report
module.exports.createReport = async function(req, res) {
    try {
        console.log(req.body);
        let patient = await Patient.findById(req.params.id);
        if(patient === null) {
            return res.json(422, {
                message: 'Invalid Patient Id'
            })
        }
        console.log(patient);
        let report;
        try {
            report = await Report.create({
                name: patient.name,
                doctor: req.body.doctor,
                status: req.body.status,
                patient: patient._id,
                date: new Date()
            });
        } catch(err) {
            return res.json(422, {
                message: 'Invalid input'
            })
        }
        patient.reports.push(report);
        patient.save();
        console.log(report);
        return res.json(200, {
            message: 'Report created',
            report: report
        })
    } catch(err) {
        console.log('**************', err)
        return res.json(500, {
            message: 'Internal server error'
        })
    }
}


// Fetching all reports
module.exports.fetchAllReports = async function(req, res) {
    try {
        let reports = await Report.find({patient: req.params.id}).sort('-createdAt');
        
        return res.json(200, {
            message: 'All reports',
            reports: reports
        })
        
    } catch(err) {
        return res.json(500, {
            message: 'Internal Server Erro'
        })
    }
}
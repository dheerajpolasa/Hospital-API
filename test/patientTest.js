process.env.NODE_ENV = 'test';
const chai = require('chai');
const expected = chai.expect;
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const db = require('…/config/testMongoose');

const Patient = require('…/models/patient');

const server = require('…/index');
// Assertion style
chai.should();
chai.use(chaiHttp);

// This token is to be provide. You can get this token by hitting post request on /api/v1/doctors/create-session
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFkNDIxN2ViNjFhYTJmODg0ZWNhMmQiLCJ1c2VybmFtZSI6ImRoZWVyYWoiLCJwYXNzd29yZCI6IjEiLCJjcmVhdGVkQXQiOiIyMDIwLTA3LTI2VDA4OjQzOjAzLjQ2M1oiLCJ1cGRhdGVkQXQiOiIyMDIwLTA3LTI2VDA4OjQzOjAzLjQ2M1oiLCJfX3YiOjAsImlhdCI6MTU5NTc1NjY0OSwiZXhwIjoxNTk1ODU2NjQ5fQ.6764TAdfGHjwfvV70WgZjzW5EYMZmnnb3OkPgKZa9RE';

let authBearerToken = 'bearer ' + token;
let patientId = null;
let reportJSON = null;
describe('Hospital-API', () => {

    // Clearing the test DB before unit test
    before((done) => {
        Patient.remove({}, (err)=> {
            done();
        })
    })

    describe('/patients/register test', () => {
        it("check if it return the newly created patient", done => {
            const patient = {
                name: 'test-patient',
                phoneNumber: '9876543210'
            }
            chai.request(server)
                .post('/api/v1/patients/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('Authorization', authBearerToken)
                .send(patient)
                // Testing the creation of patient account 
                .end((err, res) => {
                    console.log(err);
                    patientId = res.body.patient._id;
                    res.should.have.status(200);
                    res.body.patient.should.have.property('name');
                    res.body.patient.should.have.property('phoneNumber');
                    res.body.patient.phoneNumber.should.have.least(6000000000);
                    res.body.patient.phoneNumber.should.have.most(10000000000);
                    done();
                })
        })
    })

    describe('/patients/:id/create_report POST', () => {
        it('Check if it is creating a report', done => {
            const report = {
                name: 'test-patient',
                patient: patientId,
                doctor: 'doctor',
                status: 'Negative',
                date: new Date()
            }
            console.log(patientId);
            chai.request(server)
                .post('/api/v1/patients/'+patientId+'/create-report')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('Authorization', authBearerToken)
                .send(report)
                // Testing the creation of report
                .end((err, res) => {
                    reportJSON = res.body.report;
                    res.should.have.status(200);
                    res.body.report.should.have.property('name');
                    res.body.report.should.have.property('doctor');
                    res.body.report.should.have.property('status');
                    res.body.report.should.have.property('patient');
                    done();
                })
        })
    })

    describe('/patients/:id/all_reports GET', () => {
        it('Check if the newly created report is present in the all reports', done => {
            chai.request(server)
                .get('/api/v1/patients/'+patientId+'/all-reports')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('authorization', authBearerToken)
                .send()
                // Testing the report which is created now
                .end((err, res) => {
                    console.log(res);
                    let flag = false;
                    res.body.reports.forEach(report => {
                        if(report._id === reportJSON._id) {
                            flag = true;
                        }
                    });
                    expected(true).equals(flag);
                    done();
                })
        })
    })
})

process.env.NODE_ENV = 'development';

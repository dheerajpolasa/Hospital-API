# Hospital-API Scalabe MVC-Architecture

> An API for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients

### Prerequisites

> Dependencies/Libraries
```
Express
Nodemon (optional)
Passport
jsonwebtoken
body-parser
mongoose
```

### Setting up the project
```
Clone the project from here
Modify the mongoose.js file in config folder according your requirement
Execute node index.js command
```

### Folder Structure
```
    ├── index.js
    ├── package.json
    ├── config
        ├── mongoose.js
        ├── passport-jwt-strategy.js    
    ├── controllers
    |    ├── api
    |        ├── v1
    |            ├── doctors_api.js  
    |            ├── patients_api.js     
    |            ├── reports_api.js
    ├── models
    │   ├── doctor.js
        ├── patient.js
        ├── report.js
    ├── routes
    |    ├── api
    |        ├── v1
    |            ├── index.js  
    |            ├── doctors.js
    |            ├── patients.js
    |            ├── reports.js
    |        ├── index.js
    ├── .gitignore
```

# Using the API
```
Open Postman, Since all the route are secured with jwt, you need make sure that you are passing the jwt token for every request
1. For Creating Doctor Profile, Make a POST request on this URL /api/v1/doctors/register
   Request-Body: {
      username: <username>,
      password: <password>
   }
2. For Creating the Doctor Session, Make a POST request on this URL /api/v1/doctors/create-session
   Request-Body: {
      username: <username>,
      password: <password>
   }
3. For Creating/Getting the Patient Profile, Make POST request on this URL /api/v1/patients/register
   Request-Body: {
      name: <patient-name>,
      phoneNumber: <phone-number>
   }
4. For Creating a report for patient, Make a POST request on this URL /api/v1/patient/:id/create-report
   Request-Body: {
      status: ['Positive', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive'],
      doctor: <doctor-name>
   }
5. For fetching all the reports of particular patient, Make a GET request on this URL /api/v1/patient/:id/all-reports
6. For fetching all the reports by status, Make a GET request on this URL /api/v1/reports/:status
```

# Unit Testing
```
There are three unit test in total.
They are:
1. Unit test for patient registration which will check whether the patient is created or not
2. Unit test for report creation which will check whether a new report is created or not
3. Unit test for all reports which will check whether the earlier created report is present in these reports or not
```

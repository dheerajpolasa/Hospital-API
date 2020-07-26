const express = require('express');
const port = 8080;
const path = require('path');
const cookieParser = require('cookie-parser');

if(process.env.NODE_ENV !== 'development') {
    const mongoose = require('mongoose');
    const db = require('./config/mongoose');
}

const passportJwt = require('./config/passport-jwt-strategy')

const app = express();
app.use(express.urlencoded());
app.use(cookieParser())
app.use('/api', require('./routes/api'));

app.listen(port, function(err) {
    if(err) {
        console.log('Error while listening to port: ', port);
        console.log(err);
        return;
    }
    console.log('Yup, server is running on port: ', port);
})
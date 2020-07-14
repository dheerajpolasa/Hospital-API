const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ['Negative','Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive'],
        default: 'Negative'
    },
    doctor: {
        type: String,
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    date: Date 
}, {
    timestamps: true
});


const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
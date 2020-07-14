const Report = require('../../../models/report')

// Fetching reports by status
module.exports.getReportsByStatus = async function(req, res) {
    try {
        let reports = await Report.find({status: req.params.status}).sort('-createdAt');

        return res.json(200, {
            message: 'All reports by status',
            reports: reports
        })

    } catch(err) {
        return res.json(200, {
            message: 'Internal Server Error'
        })
    }
}
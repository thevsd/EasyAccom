const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    post_id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: { 
        type: Date, 
        required: true,
	},
});

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;
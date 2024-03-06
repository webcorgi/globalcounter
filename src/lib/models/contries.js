const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    country_code: {
        type: String,
        required: true
    },
    country_count: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('contries', countrySchema);
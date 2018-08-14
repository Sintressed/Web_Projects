const mongoose = require('../config/mongoose.js');
const Schema = mongoose.Schema;

const TourSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    location: {type: String, required: true},
    theatre: {type: String, required: true},
    tickets: {type: Number, required: true},
})
const Tour = mongoose.model('Tour', TourSchema);
module.exports = Tour;
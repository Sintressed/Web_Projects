const mongoose = require('../config/mongoose.js');
const Schema = mongoose.schema;

const MerchSchema = new mongoose.Schema({
    img: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},

}, { timestamps: true });
const Merch = mongoose.model('Merch', MerchSchema);
module.exports = Merch;
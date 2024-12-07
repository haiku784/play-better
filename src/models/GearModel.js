const mongoose = require('mongoose');

const gearSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Gear', gearSchema);
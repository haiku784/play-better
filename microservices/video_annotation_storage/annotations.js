const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
    userId: String,
    highlights: Array
});

module.exports = mongoose.model('Annotations', annotationSchema);
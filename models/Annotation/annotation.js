const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
    userId: String,
    annotations: Array,
    createdAt: { type: Date, default: Date.now }
});

const Annotation = mongoose.model('Annotation', annotationSchema);
module.exports = Annotation;
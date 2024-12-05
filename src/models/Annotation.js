const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    videoId: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Number, required: true },
}, { timestamps: true });

const Annotation = mongoose.model('Annotation', annotationSchema);

module.exports = Annotation;
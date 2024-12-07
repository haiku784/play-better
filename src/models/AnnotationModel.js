// AnnotationModel.js
const mongoose = require('mongoose');

const AnnotationSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Annotation', AnnotationSchema);
const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    videoId: { type: String, required: true },
    annotations: [{
        timeStamp: { type: Number, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Annotation', annotationSchema);
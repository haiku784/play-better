// MongoDB schema for storing video annotations
const videoAnnotationSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    annotations: [{
        timestamp: { type: Number, required: true },
        comment: { type: String, required: true },
        improvements: [String]
    }]
});
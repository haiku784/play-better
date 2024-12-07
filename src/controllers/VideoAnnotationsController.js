// VideoAnnotationsController.js
const AnnotationModel = require('../models/Annotation');

exports.addAnnotation = async (req, res) => {
    const { videoId, timestamp, comment } = req.body;
    try {
        const newAnnotation = new AnnotationModel({ videoId, timestamp, comment });
        await newAnnotation.save();
        res.status(201).json(newAnnotation);
    } catch (error) {
        res.status(500).json({ message: 'Error saving annotation', error });
    }
};

exports.getAnnotations = async (req, res) => {
    const { videoId } = req.params;
    try {
        const annotations = await AnnotationModel.find({ videoId });
        res.status(200).json(annotations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching annotations', error });
    }
};
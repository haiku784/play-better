const express = require('express');
const router = express.Router();
const Annotation = require('../models/Annotation'); // Assuming Mongoose model

// POST: Create a new annotation
router.post('/annotations', async (req, res) => {
    try {
        const newAnnotation = new Annotation(req.body);
        await newAnnotation.save();
        res.status(201).json(newAnnotation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Retrieve annotations
router.get('/annotations', async (req, res) => {
    try {
        const annotations = await Annotation.find();
        res.status(200).json(annotations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
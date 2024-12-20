const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure storage for uploaded videos
const storage = multer.diskStorage({
    destination: './uploads/videos/', // Specify the directory for uploads
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // Limit file size to 100MB
    fileFilter: (req, file, cb) => {
        const filetypes = /mp4|mkv|mov|avi/; // Accept certain video formats
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Video files only!');
        }
    }
}).single('video');

// API endpoint for video upload
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        if (req.file === undefined) {
            return res.status(400).json({ message: 'No file selected!' });
        }
        res.status(200).json({ message: 'Video uploaded successfully!', file: `uploads/videos/${req.file.filename}` });
    });
});

module.exports = router;
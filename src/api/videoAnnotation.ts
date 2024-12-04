import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const annotationSchema = new mongoose.Schema({
  videoId: String,
  time: Number,
  text: String
});

const Annotation = mongoose.model('Annotation', annotationSchema);

router.post('/annotations', async (req, res) => {
  const { videoId, time, text } = req.body;
  const annotation = new Annotation({ videoId, time, text });
  await annotation.save();
  res.status(201).send(annotation);
});

router.get('/annotations/:videoId', async (req, res) => {
  const annotations = await Annotation.find({ videoId: req.params.videoId });
  res.send(annotations);
});

export default router;
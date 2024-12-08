// Create a schema for e-sport titles
const mongoose = require('mongoose');

const eSportTitleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  developer: { type: String, required: true },
});

const ESportTitle = mongoose.model('ESportTitle', eSportTitleSchema);

module.exports = ESportTitle;
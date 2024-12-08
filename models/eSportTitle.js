const mongoose = require('mongoose');

// Define the e-sport title schema including validation rules
const eSportTitleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is required
        trim: true,
        minlength: 3, // Title must be at least 3 characters long
        maxlength: 100 // Title cannot exceed 100 characters
    },
    developer: {
        type: String,
        required: true, // Developer is required
        trim: true,
        minlength: 3 // Developer name must be at least 3 characters long
    },
    releaseDate: {
        type: Date,
        required: true, // Release date is required
        validate: {
            validator: function(value) {
                return value <= Date.now(); // Release date must not be in the future
            },
            message: 'Release date cannot be in the future!'
        }
    },
    genre: {
        type: String,
        required: true,
        enum: ['Action', 'Strategy', 'Sports', 'Adventure', 'Simulation'], // Genre must be one of the specified values
    },
});

// Export the e-sport title model based on the schema
const eSportTitle = mongoose.model('eSportTitle', eSportTitleSchema);
module.exports = eSportTitle;

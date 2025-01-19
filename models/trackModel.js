const mongoose = require('mongoose');

// Track Schema
const trackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing spaces
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    album: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // Duration in seconds
      required: true,
    },
    trackUrl: {
      type: String,
      required: true, // URL or path to the music file
    },
    artwork: {
      type: String,
      default: 'default-album-art.jpg', // Default album artwork
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }],
    likes: {
      type: Number,
      default: 0,
    },
    isPremium: {
      type: Boolean,
      default: false, // Indicates if the track is for premium users
    },
    // Add any other necessary fields for tracks
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Track model
module.exports = mongoose.model('Track', trackSchema);

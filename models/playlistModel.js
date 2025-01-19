const mongoose = require('mongoose');

// Playlist Schema
const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing spaces
    },
    description: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tracks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track', // References the Track model
    }],
    isPublic: {
      type: Boolean,
      default: false, // Indicates whether the playlist is public or private
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Playlist model
module.exports = mongoose.model('Playlist', playlistSchema);

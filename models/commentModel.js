const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing spaces
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    track: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track',
      required: false, // Comment may not always be linked to a track, could be linked to a playlist
    },
    playlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlist',
      required: false, // Comment may not always be linked to a playlist
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Comment model
module.exports = mongoose.model('Comment', commentSchema);

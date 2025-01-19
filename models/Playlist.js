const mongoose = require('mongoose');

// Define the schema for a Playlist
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  tracks: [{
    type: String, // Assuming tracks are represented by track names or IDs as strings
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Playlist model from the schema
const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;

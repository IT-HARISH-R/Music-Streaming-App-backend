const express = require('express');
const router = express.Router();

// Controller functions
const {
  getTracks,
  searchTracks,
  addTrack,
  updateTrack,
  deleteTrack
} = require('../controllers/trackController');

// Route to get all tracks
router.get('/', getTracks);

// Route to search for tracks by query parameters (e.g., name, artist, album, genre)
router.get('/search', searchTracks);

// Route to add a new track
router.post('/', addTrack);

// Route to update a track by ID
router.put('/:id', updateTrack);

// Route to delete a track by ID
router.delete('/:id', deleteTrack);

module.exports = router;

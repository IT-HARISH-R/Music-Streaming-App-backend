const express = require('express');
const router = express.Router();

// Controller functions
const {
  getPlaylists,
  getPlaylistById,
  addPlaylist,
  updatePlaylist,
  deletePlaylist
} = require('../controllers/playlistController');

// Route to get all playlists
router.get('/', getPlaylists);

// Route to get a playlist by ID
router.get('/:id', getPlaylistById);

// Route to add a new playlist
router.post('/', addPlaylist);

// Route to update a playlist by ID
router.put('/:id', updatePlaylist);

// Route to delete a playlist by ID
router.delete('/:id', deletePlaylist);

module.exports = router;

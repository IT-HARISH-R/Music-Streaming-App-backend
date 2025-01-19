const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware.js');
const playlistController = require('../controller/playlistController.js');
const playlistRoutes = express.Router();


// Create a new playlist (requires authentication)
playlistRoutes.post('/', authenticate, playlistController.createPlaylist);

// Get a single playlist by its ID
playlistRoutes.get('/:playlistId', playlistController.getPlaylistById);

// Get all playlists (optional, could be paginated)
playlistRoutes.get('/', playlistController.getUserPlaylists);

// Update playlist details (requires authentication)
playlistRoutes.put('/:playlistId', authenticate, playlistController.updatePlaylist);

// Delete a playlist (requires authentication)
playlistRoutes.delete('/:playlistId', authenticate, playlistController.deletePlaylist);

// Add a track to a playlist (requires authentication)
playlistRoutes.post('/:playlistId/track/:trackId', authenticate, playlistController.addTrackToPlaylist);

// Remove a track from a playlist (requires authentication)
playlistRoutes.delete('/:playlistId/track/:trackId', authenticate, playlistController.removeTrackFromPlaylist);

module.exports = playlistRoutes;

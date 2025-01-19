const express = require('express');
const trackRoutes = express.Router();
const { authenticate } = require('../middlewares/authMiddleware.js');
const trackController = require('../controller/trackController.js');

// Add a new track (requires authentication)
// trackRoutes.post('/', authenticate, addTrack);
trackRoutes.post('/', authenticate, trackController.createTrack);

// Get a single track by its ID
trackRoutes.get('/:trackId', trackController.getTrackById);

// Get all tracks (optional, could be paginated)
trackRoutes.get('/',trackController.getAllTracks);

// Update track details (requires authentication)
trackRoutes.put('/:trackId', authenticate, trackController.updateTrack);

// Delete a track (requires authentication)
trackRoutes.delete('/:trackId', authenticate, trackController.deleteTrack);

module.exports = trackRoutes;

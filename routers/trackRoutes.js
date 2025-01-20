const express = require('express');
const trackRoutes = express.Router();
const { authenticate } = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/upload.js');
const trackController = require('../controller/trackController.js');

// Add a new track (requires authentication)
// trackRoutes.post('/', authenticate, addTrack);
trackRoutes.post('/', authenticate,upload.single('audio') ,trackController.createTrack);

// Get a single track by its ID
trackRoutes.get('/:trackId', trackController.getTrackById);

// Get all tracks (optional, could be paginated)
trackRoutes.get('/',trackController.getAllTracks);

// Update track details (requires authentication)
// trackRoutes.patch('/update-track/:Id', authenticate, trackController.updateTrack);

// Delete a track (requires authentication)
// trackRoutes.delete('/:trackId', authenticate, trackController.deleteTrack);

module.exports = trackRoutes;

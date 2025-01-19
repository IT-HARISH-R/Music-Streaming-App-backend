const express = require('express');
const commentRoutes = express.Router();
const { addCommentToTrack, getCommentsForTrack, updateComment, deleteComment } = require('../controllers/commentController');
const { authenticate } = require('../middleware/auth');

// Add a comment to a track (requires authentication)
commentRoutes.post('/track/:trackId', authenticate, addCommentToTrack);

// Get all comments for a specific track
commentRoutes.get('/track/:trackId', getCommentsForTrack);

// Update a comment on a track (requires authentication)
commentRoutes.put('/:commentId', authenticate, updateComment);

// Delete a comment (requires authentication)
commentRoutes.delete('/:commentId', authenticate, deleteComment);

module.exports = commentRoutes;

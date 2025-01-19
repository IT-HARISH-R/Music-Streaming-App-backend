const Comment = require('../models/Comment'); // Assuming Comment model is in '../models/Comment'
const Track = require('../models/trackModel'); // Assuming Track model is in '../models/Track'
const Playlist = require('../models/playlistModel'); // Assuming Playlist model is in '../models/Playlist'

// Comment Controller object
const commentController = {
  // Add a comment to a track
  addCommentToTrack: async (req, res) => {
    const { trackId } = req.params;
    const { userId, commentText } = req.body;

    try {
      // Find the track by ID
      const track = await Track.findById(trackId);
      if (!track) {
        return res.status(404).json({ msg: 'Track not found' });
      }

      // Create a new comment
      const newComment = new Comment({
        userId,
        trackId,
        commentText,
      });

      // Save the comment to the database
      await newComment.save();

      // Push the comment to the track's comments array
      track.comments.push(newComment._id);
      await track.save();

      res.status(201).json({ msg: 'Comment added successfully', comment: newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Add a comment to a playlist
  addCommentToPlaylist: async (req, res) => {
    const { playlistId } = req.params;
    const { userId, commentText } = req.body;

    try {
      // Find the playlist by ID
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ msg: 'Playlist not found' });
      }

      // Create a new comment
      const newComment = new Comment({
        userId,
        playlistId,
        commentText,
      });

      // Save the comment to the database
      await newComment.save();

      // Push the comment to the playlist's comments array
      playlist.comments.push(newComment._id);
      await playlist.save();

      res.status(201).json({ msg: 'Comment added to playlist successfully', comment: newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Get all comments for a specific track
  getCommentsForTrack: async (req, res) => {
    const { trackId } = req.params;

    try {
      // Find the track and populate comments
      const track = await Track.findById(trackId).populate('comments');
      if (!track) {
        return res.status(404).json({ msg: 'Track not found' });
      }

      res.status(200).json(track.comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Get all comments for a specific playlist
  getCommentsForPlaylist: async (req, res) => {
    const { playlistId } = req.params;

    try {
      // Find the playlist and populate comments
      const playlist = await Playlist.findById(playlistId).populate('comments');
      if (!playlist) {
        return res.status(404).json({ msg: 'Playlist not found' });
      }

      res.status(200).json(playlist.comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Delete a comment by ID
  deleteComment: async (req, res) => {
    const { commentId } = req.params;

    try {
      // Find the comment by ID
      const comment = await Comment.findByIdAndDelete(commentId);
      if (!comment) {
        return res.status(404).json({ msg: 'Comment not found' });
      }

      // Remove the comment reference from the track or playlist
      if (comment.trackId) {
        const track = await Track.findById(comment.trackId);
        if (track) {
          track.comments = track.comments.filter((id) => id.toString() !== commentId);
          await track.save();
        }
      } else if (comment.playlistId) {
        const playlist = await Playlist.findById(comment.playlistId);
        if (playlist) {
          playlist.comments = playlist.comments.filter((id) => id.toString() !== commentId);
          await playlist.save();
        }
      }

      res.status(200).json({ msg: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
};

module.exports = commentController;

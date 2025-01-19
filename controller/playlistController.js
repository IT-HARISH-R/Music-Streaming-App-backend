const Playlist = require('../models/playlistModel'); // Assuming Playlist model is in '../models/Playlist'
const Track = require('../models/trackModel'); // Assuming Track model is in '../models/Track'

// Playlist Controller object
const playlistController = {
  // Create a new playlist
  createPlaylist: async (req, res) => {
    const { name, description, userId } = req.body;

    try {
      // Create a new playlist
      const newPlaylist = new Playlist({
        name,
        description,
        userId,
        tracks: [] // Initially, the playlist will have no tracks
      });

      // Save the playlist to the database
      await newPlaylist.save();

      res.status(201).json({ msg: 'Playlist created successfully', playlist: newPlaylist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Get all playlists of a user
  getUserPlaylists: async (req, res) => {
    const { userId } = req.params;

    try {
      // Find playlists by user ID
      const playlists = await Playlist.find({ userId });
      if (!playlists) {
        return res.status(404).json({ msg: 'No playlists found for this user' });
      }

      res.status(200).json(playlists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Get playlist by ID
  getPlaylistById: async (req, res) => {
    const { playlistId } = req.params;

    try {
      const playlist = await Playlist.findById(playlistId).populate('tracks');
      if (!playlist) {
        return res.status(404).json({ msg: 'Playlist not found' });
      }

      res.status(200).json(playlist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Add a track to a playlist
  addTrackToPlaylist: async (req, res) => {
    const { playlistId, trackId } = req.params;

    try {
      // Find the playlist by ID
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ msg: 'Playlist not found' });
      }

      // Find the track by ID
      const track = await Track.findById(trackId);
      if (!track) {
        return res.status(404).json({ msg: 'Track not found' });
      }

      // Add track to playlist
      playlist.tracks.push(track._id);
      await playlist.save();

      res.status(200).json({ msg: 'Track added to playlist', playlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Remove a track from a playlist
  removeTrackFromPlaylist: async (req, res) => {
    const { playlistId, trackId } = req.params;

    try {
      // Find the playlist by ID
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ msg: 'Playlist not found' });
      }

      // Remove track from playlist
      playlist.tracks = playlist.tracks.filter(track => track.toString() !== trackId);
      await playlist.save();

      res.status(200).json({ msg: 'Track removed from playlist', playlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Update a playlist
  updatePlaylist: async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;

    try {
      // Find the playlist by ID
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ msg: 'Playlist not found' });
      }

      // Update playlist fields
      playlist.name = name || playlist.name;
      playlist.description = description || playlist.description;

      await playlist.save();

      res.status(200).json({ msg: 'Playlist updated successfully', playlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Delete a playlist
  deletePlaylist: async (req, res) => {
    const { playlistId } = req.params;

    try {
      // Find and delete the playlist by ID
      const playlist = await Playlist.findByIdAndDelete(playlistId);
      if (!playlist) {
        return res.status(404).json({ msg: 'Playlist not found' });
      }

      res.status(200).json({ msg: 'Playlist deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
};

module.exports = playlistController;

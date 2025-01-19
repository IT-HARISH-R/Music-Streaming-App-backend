const Track = require('../models/trackModel'); // Assuming Track model is in '../models/Track'

// Track Controller object
const trackController = {
  // Create a new track
  createTrack: async (req, res) => {
    const { title, artist, album, genre, url, duration } = req.body;

    try {
      // Create a new track
      const newTrack = new Track({
        title,
        artist,
        album,
        genre,
        url,
        duration
      });

      // Save the track to the database
      await newTrack.save();

      res.status(201).json({ msg: 'Track added successfully', track: newTrack });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Get all tracks
  getAllTracks: async (req, res) => {
    try {
      const tracks = await Track.find();
      res.status(200).json(tracks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Get track by ID
  getTrackById: async (req, res) => {
    const { trackId } = req.params;

    try {
      const track = await Track.findById(trackId);
      if (!track) {
        return res.status(404).json({ msg: 'Track not found' });
      }
      res.status(200).json(track);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Update track details
  updateTrack: async (req, res) => {
    const { trackId } = req.params;
    const { title, artist, album, genre, url, duration } = req.body;

    try {
      // Find track by ID and update it
      const track = await Track.findById(trackId);
      if (!track) {
        return res.status(404).json({ msg: 'Track not found' });
      }

      // Update track details
      track.title = title || track.title;
      track.artist = artist || track.artist;
      track.album = album || track.album;
      track.genre = genre || track.genre;
      track.url = url || track.url;
      track.duration = duration || track.duration;

      await track.save();

      res.status(200).json({ msg: 'Track updated successfully', track });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Delete track
  deleteTrack: async (req, res) => {
    const { trackId } = req.params;

    try {
      // Find and delete the track by ID
      const track = await Track.findByIdAndDelete(trackId);
      if (!track) {
        return res.status(404).json({ msg: 'Track not found' });
      }

      res.status(200).json({ msg: 'Track deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
};

module.exports = trackController;

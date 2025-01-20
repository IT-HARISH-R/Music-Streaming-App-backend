const Track = require('../models/trackModel'); // Import the Track model

const trackController = {
  // Create a new track
  createTrack: async (req, res) => {
    try {
      const { name, artist, album, genre, duration } = req.body;

      // Check if an audio file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'Audio file is required' });
      }

      // Create a new track document
      const newTrack = new Track({
        name,
        artist,
        album,
        genre,
        duration,
        audio: {
          data: req.file.path, // File path saved by multer
          // contentType: req.file.mimetype, // Optional: Save content type if needed
        },
      });

      await newTrack.save();
      res.status(201).json({ message: 'Track created successfully', track: newTrack });
    } catch (error) {
      res.status(500).json({ error: 'Error creating track', details: error.message });
    }
  },

  // Get a single track by ID
  getTrackById: async (req, res) => {
    try {
      const { trackId } = req.params;
      const track = await Track.findById(trackId);

      if (!track) {
        return res.status(404).json({ error: 'Track not found' });
      }

      res.status(200).json(track);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching track', details: error.message });
    }
  },

  // Get all tracks
  getAllTracks: async (req, res) => {
    try {
      const tracks = await Track.find();
      res.status(200).json(tracks);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tracks', details: error.message });
    }
  },

  // Update a track
  updateTrack: async (req, res) => {
    try {
      const { Id } = req.params;
      const updatedData = req.body;

      const updatedTrack = await Track.findByIdAndUpdate(Id, updatedData, {
        new: true, // Return the updated document
        runValidators: true, // Validate the updates
      });

      if (!updatedTrack) {
        return res.status(404).json({ error: 'Track not found' });
      }

      res.status(200).json({ message: 'Track updated successfully', track: updatedTrack });
    } catch (error) {
      res.status(500).json({ error: 'Error updating track', details: error.message });
    }
  },

  // Delete a track
  deleteTrack: async (req, res) => {
    try {
      const { trackId } = req.params;
      const deletedTrack = await Track.findByIdAndDelete(trackId);

      if (!deletedTrack) {
        return res.status(404).json({ error: 'Track not found' });
      }

      res.status(200).json({ message: 'Track deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting track', details: error.message });
    }
  },
};

module.exports = trackController;

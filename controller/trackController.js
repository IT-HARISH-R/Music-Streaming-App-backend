const Track = require('../models/Track');

exports.getTracks = async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tracks', error });
  }
};

exports.searchTracks = async (req, res) => {
  const { name, artist, album, genre } = req.query;
  try {
    const filters = {};
    if (name) filters.name = new RegExp(name, 'i');
    if (artist) filters.artist = new RegExp(artist, 'i');
    if (album) filters.album = new RegExp(album, 'i');
    if (genre) filters.genre = new RegExp(genre, 'i');

    const tracks = await Track.find(filters);
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ message: 'Error searching tracks', error });
  }
};

exports.addTrack = async (req, res) => {
  const { name, artist, album, genre, url } = req.body;
  try {
    const newTrack = new Track({ name, artist, album, genre, url });
    await newTrack.save();
    res.status(201).json(newTrack);
  } catch (error) {
    res.status(500).json({ message: 'Error adding track', error });
  }
};

exports.updateTrack = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedTrack = await Track.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedTrack);
  } catch (error) {
    res.status(500).json({ message: 'Error updating track', error });
  }
};

exports.deleteTrack = async (req, res) => {
  const { id } = req.params;
  try {
    await Track.findByIdAndDelete(id);
    res.status(200).json({ message: 'Track deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting track', error });
  }
};

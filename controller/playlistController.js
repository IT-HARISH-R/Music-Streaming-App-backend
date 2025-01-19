const Playlist = require('../models/Playlist');

exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching playlists', error });
  }
};

exports.getPlaylistById = async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching playlist', error });
  }
};

exports.addPlaylist = async (req, res) => {
  const { name, tracks } = req.body;
  try {
    const newPlaylist = new Playlist({ name, tracks });
    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ message: 'Error creating playlist', error });
  }
};

exports.updatePlaylist = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ message: 'Error updating playlist', error });
  }
};

exports.deletePlaylist = async (req, res) => {
  const { id } = req.params;
  try {
    await Playlist.findByIdAndDelete(id);
    res.status(200).json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting playlist', error });
  }
};
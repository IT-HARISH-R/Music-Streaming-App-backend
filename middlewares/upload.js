const multer = require('multer');
const path = require('path');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify where the uploaded files should be saved
    cb(null, 'uploads/audio');  // Store audio files in 'uploads/audio' folder
  },
  filename: function (req, file, cb) {
    // Set the filename to be unique
    cb(null, Date.now() + path.extname(file.originalname)); // Adding timestamp to file name
  }
});

// Filter to allow only audio files
const fileFilter = (req, file, cb) => {
  const mimetype = file.mimetype.startsWith('audio/');
  if (mimetype) {
    return cb(null, true); // Accept audio files
  } else {
    cb(new Error('Only audio files are allowed'), false); // Reject non-audio files
  }
};


// Create upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // Limit file size to 50MB
});

module.exports = upload;  
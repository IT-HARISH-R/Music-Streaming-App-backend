const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs'); // For password hashing
// const jwt = require('jsonwebtoken'); // For generating authentication tokens

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for security
    },
    profilePicture: {
      type: String,
      default: 'default-profile-pic.jpg', // Default profile picture
    },
    playlists: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlist',
    }],
    likedTracks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track',
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }],
    // Add any other necessary fields for user preferences or activities
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// // Hash the user's password before saving to the database
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// // Compare entered password with the stored hashed password
// userSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// // Generate a JWT token for authentication
// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
//     expiresIn: '1h', // Token expires in 1 hour
//   });
//   return token;
// };

// Export the User model
module.exports = mongoose.model('User', userSchema);

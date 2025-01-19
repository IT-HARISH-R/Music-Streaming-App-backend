const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { SECRET_KEY } = require('../utlis/config'); // Ensure SECRET_KEY is properly imported

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Get token from cookies
    console.log("Token from cookie:", token);

    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded Token:", decoded);

    // Find the user by ID
    const user = await User.findById(decoded.id); // Note: Use `id`, not `Id`
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    console.log("Authenticated User:", user);

    // Attach the user to the request object
    // req.user = user;
    req.userId = decoded.id;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

module.exports = { authenticate };

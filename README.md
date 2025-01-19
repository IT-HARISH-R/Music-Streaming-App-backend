/backend
|-- /controllers              # Handle business logic for routes
|   |-- userController.js     # Logic for user authentication, signup, login
|   |-- trackController.js    # Logic for music-related functionalities
|   |-- playlistController.js # Playlist CRUD operations
|   |-- commentController.js  # Logic for comments and likes
|-- /models                   # Mongoose models for MongoDB
|   |-- userModel.js          # User schema and model
|   |-- trackModel.js         # Track schema and model
|   |-- playlistModel.js      # Playlist schema and model
|   |-- commentModel.js       # Comment schema and model
|-- /routes                   # Express route definitions
|   |-- userRoutes.js         # User authentication routes
|   |-- trackRoutes.js        # Music search and streaming routes
|   |-- playlistRoutes.js     # Playlist management routes
|   |-- commentRoutes.js      # Routes for likes and comments
|-- /middleware               # Custom middleware for authentication, etc.
|   |-- authMiddleware.js     # Middleware for JWT-based auth
|-- /config                   # Configuration files
|   |-- db.js                 # Database connection setup
|   |-- config.js             # Environment variables and app configuration
|-- /uploads                  # Folder to store music files (if not streaming from an external service)
|-- server.js                 # Main server file

const express = require("express");
const logger = require("./utlis/logger");
const errorPage = require("./utlis/errorPage");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const userRoutes = require("./routers/userRoutes");
const playlistRoutes = require("./routers/playlistRoutes");
const trackRoutes = require("./routers/trackRoutes");

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    }
))
app.use(cookieParser())
app.use(logger) 
// app.use("/auth", authRouter);
// app.use('/api/playlists', playlistRoutes);
// app.use('/api', trackrouter);
app.use("/api/auth", userRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/track', trackRoutes);
app.use(errorPage);
module.exports = app; 



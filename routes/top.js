const express = require("express");
const router = express.Router();


const spotifyAuthMiddleware = require("../middleware/spotify-auth");
const userController = require('../controllers/UserController');



router.get("/artists", spotifyAuthMiddleware, userController.topArtists);

router.get("/tracks", spotifyAuthMiddleware, userController.topTracks);

module.exports = router;

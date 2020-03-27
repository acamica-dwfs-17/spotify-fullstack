var express = require('express');
var router = express.Router();

const authSpotifyMiddleware = require("../middleware/spotify-auth");
const authMiddleware = require("../middleware/auth");
const userController = require('../controllers/UserController');

router.get('/myprofile', authMiddleware, userController.myprofile);

module.exports = router;

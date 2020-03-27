const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', userController.getUserSpotifyFromCode);
router.get('/relation', userController.getUserSpotifyFromCodeRelation);

module.exports = router;

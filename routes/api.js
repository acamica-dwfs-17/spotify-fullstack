const router = require('express').Router();


const { authUrl } = require('../lib/spotify');
const UserController = require('../controllers/UserController');


router.post('/user', UserController.getUser);

module.exports = router;

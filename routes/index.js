const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const homeController = require('../controllers/HomeController');

router.get('/', authMiddleware, homeController.index);

module.exports = router;

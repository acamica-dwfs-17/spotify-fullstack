var express = require('express');
var router = express.Router();

const authSpotifyMiddleware = require("../middleware/spotify-auth");
const authMiddleware = require("../middleware/auth");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/:id/:sarasa', function(req, res, next) {
    res.send(req.params.id + ' ' + req.params.sarasa);
});

router.get('/myprofile', authMiddleware, function(req, res, next) {
    res.render('myprofile', {
        title: 'My profile',
        menu: [
            {
                title: 'Get My Top Artists',
                href: '/top/artists'
            },
            {
                title: 'Get My Top Tracks',
                href: '/top/tracks'
            }
        ],
    });
});

module.exports = router;

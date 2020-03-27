const ms = require('ms');

let { authUrl, getAuthUrl } = require('../lib/spotify');

const title = process.env.TITLE || 'Spotify App';

async function index(req, res) {
    if (req.userData) {

        res.cookie('userrelation', req.userData.id, {
            maxAge: ms('30m'),
            httpOnly: true
        })

        res.render('index', {
            authUrl: getAuthUrl(req.userData.id),
            title,
            user: req.userData,
            menu: [
                {
                    title: 'Get My Top Artists',
                    href: '/top/artists'
                },
                {
                    title: 'Get My Top Tracks',
                    href: '/top/tracks'
                }
            ]
        });
    } else {
        res.render('login', {
            title,
            menu: [],
            authUrl
        });
    }
}

module.exports = { index };

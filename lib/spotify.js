const Spotify = require('spotify-web-api-node');
const scopes = [
    'ugc-image-upload',
    'user-library-modify',
    'user-library-read',
    'app-remote-control',
    'streaming',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-follow-modify',
    'user-follow-read',
    'user-read-recently-played',
    'user-top-read',
    'user-read-private',
    'user-read-email',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-modify-playback-state'
];

let redirectUri = `http://localhost:${process.env.PORT}/callback`;

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
function createApiInstance() {
    return new Spotify({
        redirectUri: redirectUri,
        clientId: process.env.CLIENT,
        clientSecret: process.env.SECRET
    });
}

const authUrl = getAuthUrl();

function getAuthUrl(userid) {
  if (userid && !redirectUri.includes('relation'))
      redirectUri += '/relation';

    return createApiInstance().createAuthorizeURL(scopes)
}

module.exports = { createApiInstance, getAuthUrl, authUrl };

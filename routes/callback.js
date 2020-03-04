const express = require('express');
const ms = require('ms');
const router = express.Router();
const User = require('../models/User');

const { createApiInstance } = require('../lib/spotify');

/* GET home page. */
router.get('/', async (req, res) => {
    try {
        const { code } = req.query; // here we are getting the code parameter from the querystring
        const api = createApiInstance(); // this function creates an instance of the spotify api

        // this method sets the auth code
        // and gets the access token and refresh token
        const authorization = await api.authorizationCodeGrant(code);

        api.setAccessToken(authorization.body.access_token); // this one sets the access token on the api object

        const userData = await api.getMe(); // this one gets the user data
        const [FirstName, LastName = ''] = userData.body.display_name.split(' ');
        

        const user = new User({
            FirstName,
            LastName,
            UserName: userData.body.display_name,
            Mail: userData.body.email,
            Main: true,
            ProviderId: userData.body.id,
            ProviderType: 'spotify.com',
            LastLogin: Date.now(),
            Active: true
        });

        const saved = await user.save();

        res.cookie('token', authorization.body.access_token, {
            maxAge: ms('1h'),
            httpOnly: true
        }).redirect('/');
    } catch (e) {
        console.error(e);
        res.redirect('/500');
    }
});

module.exports = router;

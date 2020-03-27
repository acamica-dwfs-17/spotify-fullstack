const ms = require('ms');
const User = require('../models/User');
const UserRelation = require('../models/UserRelation');
const _ = require('lodash');
const { createApiInstance } = require('../lib/spotify');

const title = process.env.TITLE || 'Spotify App';

async function createUser(mail, user) {
    let userExists = await User.findOne({
        where: { Mail: mail }
    });

    if (userExists) {
        userExists.setDataValue('Token', user.Token);
        userExists.setDataValue('LastLogin',  Date.now());
        return await userExists.save();
    } else {
        return await user.save();
    }

    
}

async function getUser(req, res) {
    const { email, displayName, uid, providerId, token } = req.body;
    const [FirstName, LastName = ''] = displayName.split(' ');

    let user = new User({
        FirstName,
        LastName,
        UserName: displayName,
        Mail: email,
        Main: true,
        ProviderId: uid,
        ProviderType: providerId,
        LastLogin: Date.now(),
        Active: true,
        Token: token
    });

    let saved = await createUser(email, user);

    res.cookie('token', req.body.token, {
        maxAge: ms('1h'),
        httpOnly: true
    });

    res.json(saved);
}

function myprofile(req, res) {
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
        ]
    });
}

async function getTop(req, res, type) {
    let { limit = 10, range = 'short_term', page = 1 } = req.query;

    if (req.userData) {

        

        const total = 50;
        const pages = Math.ceil(total / limit);

        const offset = limit * (page - 1);

        let top = await req.authenticatedUser[`getMyTop${_.capitalize(type)}`]({
            limit: limit,
            time_range: range,
            offset
        });

        res.render(`top`, {
            _,
            type,
            title,
            user: req.userData,
            limit,
            range,
            pages,
            page,
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
            top: top.body.items
        });
    } else {
        res.redirect('/');
    }
}

async function topArtists(req, res) {
    await getTop(req, res, 'artists');
}

async function topTracks(req, res) {
    await getTop(req, res, 'tracks');
}

async function getUserSpotifyFromCode(req, res) {
    try {
        const { code, userid } = req.query; // here we are getting the code parameter from the querystring
        console.log(userid);
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
            Active: true,
            Token: authorization.body.access_token
        });

        let saved = await createUser(userData.body.email, user);

        res.cookie('token', authorization.body.access_token, {
            maxAge: ms('1h'),
            httpOnly: true
        }).redirect('/');
    } catch (e) {
        console.error(e);
        res.redirect('/500');
    }
}

async function getUserSpotifyFromCodeRelation(req, res) {
    try {
        const { code, userid } = req.query; // here we are getting the code parameter from the querystring
        console.log(userid);
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
            Active: true,
            Token: authorization.body.access_token
        });

        let saved = await createUser(userData.body.email, user);


        let userRelationId = req.cookies.userrelation

        // console.log(userRelationId)
        // console.log(saved.id)
        if(userRelationId)
        {
          
            const userRelation = new UserRelation({
                UserID_1: userRelationId, UserID_2: saved.id
            });
            userRelation.save();
            res.cookie('userrelation', '', {
                maxAge: ms('1s'),
                httpOnly: true
            });

        }

        res.redirect('/success');
    } catch (e) {
        console.error(e);
        res.redirect('/500');
    }
}

module.exports = { getUser, myprofile, topArtists, topTracks, getUserSpotifyFromCode, getUserSpotifyFromCodeRelation };

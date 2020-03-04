const router = require('express').Router();
const User = require('../models/User');
const ms = require('ms');
const { authUrl } = require('../lib/spotify');

router.post('/user',async function(req, res) {
    const { email, displayName, uid, providerId, token } = req.body;
    const [FirstName, LastName = ''] = displayName.split(' ');
    let saved

    let user = await User.findOne({
        where: {Mail: email},
        // include: [{model: Apikey}]
    });

    if(!user) {
        user = new User({
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
    } else {
        user.LastLogin = Date.now();
        user.Token = token;
    }

    saved = await user.save();

    

    res.cookie('token', req.body.token, {
        maxAge: ms('1h'),
        httpOnly: true
    });

    res.json(saved)
});

module.exports = router;

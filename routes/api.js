const router = require('express').Router();
const User = require('../models/User');
const { authUrl } = require('../lib/spotify');

router.post('/user',async function(req, res) {
    const [{ email, displayName, uid, providerId }] = req.body;

    const [FirstName, LastName = ''] = displayName.split(' ');

    const user = new User({
        FirstName,
        LastName,
        UserName: displayName,
        Mail: email,
        Main: true,
        ProviderId: uid,
        ProviderType: providerId,
        LastLogin: Date.now(),
        Active: true
    });

    const saved = await user.save()

    res.json(saved)
});

module.exports = router;

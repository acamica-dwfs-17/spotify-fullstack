const { createApiInstance } = require('../lib/spotify');
const User = require('../models/User');
const UserRelation = require('../models/UserRelation');

module.exports = async (req, res, next) => {
    let { token } = req.cookies;
    const api = createApiInstance();

    try {
        if (token) {
            let user = await User.findOne({
                where: { Token: token }
            });
            if (user) {
                if(user.ProviderType != 'spotify.com') {

                  let users = await User.findOne({ where: { id: user.id }, include: [UserRelation]})

                  req.userData = await User.findOne({ where: { id: users.UserRelations[0].UserID_2, ProviderType : 'spotify.com' }})
                  console.log(req.userData.Token)
                  token = req.userData.Token;

                }
            }

            api.setAccessToken(token);
            req.authenticatedUser = api;

            // const user = await api.getMe();
            // if (user.body.display_name) {
            //     
            //     req.userData = user.body;
            // }
        }

        next();
    } catch (e) {
        res.cookie('token', '').redirect('/500');
    }
};

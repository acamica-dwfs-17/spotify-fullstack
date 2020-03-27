const User = require('../models/User');

module.exports = async (req, res, next) => {
    const { token } = req.cookies;

    try {
        if (token) {
            let user = await User.findOne({
                where: { Token: token }
            });
            if (user) {
                req.userData = user;
            }
        }

        next();
    } catch (e) {
        console.log(e);
        res.cookie('token', '').redirect('/500');
    }
};

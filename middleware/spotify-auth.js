const { createApiInstance } = require("../lib/spotify");

module.exports = async (req, res, next) => {
  const { token } = req.cookies;
  const api = createApiInstance();

  try {
    if (token) {
      api.setAccessToken(token);
      const user = await api.getMe();
      if (user.body.display_name) {
        req.authenticatedUser = api;
        req.userData = user.body;
      }
    }

    next();
  } catch (e) {
    res.cookie("token", "").redirect("/500");
  }
};

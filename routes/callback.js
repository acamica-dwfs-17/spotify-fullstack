const express = require("express");
const ms = require("ms");
const router = express.Router();

const { createApiInstance } = require("../lib/spotify");

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const { code } = req.query; // here we are getting the code parameter from the querystring
    const api = createApiInstance(); // this function creates an instance of the spotify api

    // this method sets the auth code
    // and gets the access token and refresh token
    const authorization = await api.authorizationCodeGrant(code);

    api.setAccessToken(authorization.body.access_token); // this one sets the access token on the api object

    const userData = await api.getMe(); // this one gets the user data

    res
      .cookie("token", authorization.body.access_token, {
        maxAge: ms("1h"),
        httpOnly: true
      })
      .redirect("/");
  } catch (e) {
    console.error(e)
    res.redirect("/500");
  }
});

module.exports = router;

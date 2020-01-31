const express = require("express");
const router = express.Router();

const { authUrl } = require("../lib/spotify");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "Spotify App",
    username: "Leo",
    menu: [
      { href: "/", title: "Home" },
      { href: "/top", title: "Top" },
      { href: "#", title: "sarasa" }
    ],
    authUrl
  });
});

module.exports = router;

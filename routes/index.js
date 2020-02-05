const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/spotify-auth");

const { authUrl } = require("../lib/spotify");

const title = process.env.TITLE || "Spotify App";

router.get("/", authMiddleware, async (req, res) => {
  if (req.userData) {
    res.render("index", {
      title,
      user: req.userData,
      menu: [
        {
          title: "Get My Top Artists",
          href: "/top/artists"
        },
        {
          title: "Get My Top Tracks",
          href: "/top/tracks"
        }
      ]
    });
  } else {
    res.render("login", {
      title,
      menu: [],
      authUrl
    });
  }
});

module.exports = router;

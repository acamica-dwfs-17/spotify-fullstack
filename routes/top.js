const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/spotify-auth");

const { authUrl } = require("../lib/spotify");

const title = process.env.TITLE || "Spotify App";

router.get("/artists", authMiddleware, async (req, res) => {
  if (req.userData) {
    let top = await req.authenticatedUser.getMyTopArtists({
      limit: 100,
      time_range: "long_term"
    });
    res.render("top-artists", {
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
      ],
      top: top.body.items
    });
  } else {
    res.redirect("/");
  }
});

router.get("/tracks", authMiddleware, async (req, res) => {
  if (req.userData) {
    let top = await req.authenticatedUser.getMyTopTracks({
      limit: 100,
      time_range: "long_term"
    });
    res.render("top-tracks", {
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
      ],
      top: top.body.items
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const _ = require("lodash");

const authMiddleware = require("../middleware/spotify-auth");

const title = process.env.TITLE || "Spotify App";

function createTopHandler(type) {
  return async (req, res) => {
    let { limit = 10, range = "short_term", page = 1 } = req.query;

    if (req.userData) {
      const total = 50;
      const pages = Math.ceil(total / limit);

      const offset = limit * (page - 1);

      let top = await req.authenticatedUser[`getMyTop${_.capitalize(type)}`]({
        limit: limit,
        time_range: range,
        offset
      });

      console.log(pages);

      res.render(`top-${type}`, {
        title,
        user: req.userData,
        limit,
        range,
        pages,
        page,
        type,
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
  };
}

router.get("/artists", authMiddleware, createTopHandler("artists"));

router.get("/tracks", authMiddleware, createTopHandler("tracks"));

module.exports = router;

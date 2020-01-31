var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/:id/:sarasa", function(req, res, next) {
  res.send(req.params.id + " " + req.params.sarasa);
});

router.get("/leo", function(req, res, next) {
  res.send("hola");
});

module.exports = router;

const express = require("express");
const router = express.Router();

// Get all teams
router.get("/foo", (req, res, next) => {
  res.json(["Ziggy", "Lemmy"]);
});

module.exports = router;

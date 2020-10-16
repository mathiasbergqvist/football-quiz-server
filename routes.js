const express = require("express");
const router = express.Router();
const Score = require("./models/Score");

// Get all teams
router.get("/foo", (req, res, next) => {
  res.json(["Ziggy", "Lemmy"]);
});

// Get all scores
router.get("/scores", async (req, res) => {
  const scores = await Score.find();
  res.send(scores);
});

// Create new score entry
router.post("/scores", async (req, res) => {
  const score = new Score({
    name: req.body.name,
    score: req.body.score,
  });
  await score.save();
  res.send(score);
});

module.exports = router;

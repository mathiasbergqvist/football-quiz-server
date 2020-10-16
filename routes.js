const express = require("express");
const router = express.Router();
const Score = require("./models/Score");
const teams = require("./data/teams");

// Get all teams
router.get("/teams", (req, res, next) => {
  res.json(teams);
});

// Get team by id
router.get("/teams/:id", (req, res, next) => {
  console.log("req.params.id", req.params.id);
  const matchingTeam = teams.find(
    (team) => team.id === parseInt(req.params.id)
  );
  if (matchingTeam !== undefined) {
    res.json(matchingTeam);
  } else {
    res.sendStatus(404);
  }
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

const express = require("express");
const router = express.Router();
const Score = require("./models/Score");
const teams = require("./data/teams");
const { body, validationResult } = require("express-validator");

// Get all teams
router.get("/teams", (req, res, next) => {
  res.json(teams);
});

// Get team by id
router.get("/teams/:id", (req, res, next) => {
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
router.post(
  "/scores",
  [
    body("name").isLength({ min: 3 }).trim().escape(),
    body("score").isNumeric().trim().escape(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const score = new Score({
        name: req.body.name,
        score: req.body.score,
      });
      await score.save();
      res.send(score);
    }
  }
);

module.exports = router;

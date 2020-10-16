const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  score: Number,
});

module.exports = mongoose.model("Score", schema);

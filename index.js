const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
const routes = require("./routes");

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🔌 DB connected");

    const app = express();
    app.use(express.json()); // Handle request bodies in json format
    app.use("/api", routes); // Add routes
    app.listen(5050, () => {
      console.log("🚀 Server has started on port 5050.");
    });
  })
  .catch((err) => console.error(err));

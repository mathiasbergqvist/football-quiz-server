const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config({ path: "variables.env" });

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🔌 DB connected");

    const app = express();
    // Enable cors
    app.use(cors());
    // Handle request bodies in json format
    app.use(express.json());
    // Add morgan to log http requests
    app.use(morgan("combined"));
    // adding Helmet to enhance your API's security
    app.use(helmet());
    // Add routes
    app.use("/api", routes);
    app.listen(5050, () => {
      console.log("🚀 Server has started on port 5050.");
    });
  })
  .catch((err) => console.error(err));

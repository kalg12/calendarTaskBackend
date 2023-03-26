const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");
const port = process.env.PORT || 4000;

/* Allowing the server to receive and send data in JSON format. */
app.use(cors());
app.use(express.json());

/* Connecting to the database. */
dbConnection();

/* This is a route that is used to test if the server is running. */
app.get("/", (req, res) => {
  res.json({
    message: `Developed by ${process.env.AUTHOR}`,
  });
});

/* Importing the routes. */
app.use("/api/task", require("./routes/task.routes"));

/* Listening to the port that is defined in the .env file. */
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});

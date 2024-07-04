const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const port = 3001;
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  console.log("Root route hit");
  res.send("Hello, World!");
});

app.get("/data", (req, res) => {
    console.log("Sending Data");
    res.send("Data");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
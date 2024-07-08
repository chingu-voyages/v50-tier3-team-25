const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const port = 3001;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Root route hit");
  res.send("Hello, World!");
});

app.get("/data", (req, res) => {
  console.log("Sending Data");
  res.send("Data");
});

app.post("/createUser", async (req, res) => {
  const { username, email, password, mongodbPassword } = req.body;

  let connectionString = `mongodb+srv://ecohen1125:${mongodbPassword}@userdatabase.7uirz2l.mongodb.net/`;

  try {
    await mongoose.connect(connectionString);

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User Created Successfully." });
    } catch (err) {
      if (err.code === 11000) {
        if (err.keyPattern && err.keyPattern.username) {
          res.status(401).json({ error: "Username is already in use." });
        } else if (err.keyPattern && err.keyPattern.email) {
          res.status(401).json({ error: "Email is already in use." });
        } else {
          res.status(401).json({ error: "Duplicate key error." });
        }
      } else {
        res.status(500).json({ error: "Internal server error." });
      }
    }
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.get("/login", async (req, res) => {
  const { username, password, mongodbPassword } = req.body;

  let connectionString = `mongodb+srv://ecohen1125:${mongodbPassword}@userdatabase.7uirz2l.mongodb.net/`;

  try {
    await mongoose.connect(connectionString);

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful" });

  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

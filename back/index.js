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
  const { username, name, email, password, mongodbPassword } = req.body;

  let connectionString = `mongodb+srv://ecohen1125:${mongodbPassword}@userdatabase.7uirz2l.mongodb.net/`;

  try {
    await mongoose.connect(connectionString);

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        username: username,
        name: name,
        email: email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User Created Successfully." });
    } catch (err) {
      if (err.code === 11000) {
        if (err.keyPattern && err.keyPattern.username) {
          res.status(401).json({ error: "Username is Already in Use." });
        } else if (err.keyPattern && err.keyPattern.email) {
          res.status(401).json({ error: "Email is Already in Use." });
        } else {
          res.status(401).json({ error: "Duplicate Key Error." });
        }
      } else {
        res.status(500).json({ error: "Internal Server Error." });
      }
    }
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password, mongodbPassword } = req.body;

  let connectionString = `mongodb+srv://ecohen1125:${mongodbPassword}@userdatabase.7uirz2l.mongodb.net/`;

  try {
    await mongoose.connect(connectionString);

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }

    res.status(200).json({ message: "Login Successful" });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.post("/getUser", async (req, res) => {
  const { username, mongodbPassword } = req.body;

  let connectionString = `mongodb+srv://ecohen1125:${mongodbPassword}@userdatabase.7uirz2l.mongodb.net/`;

  try {
    await mongoose.connect(connectionString);

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ error: "User Does Not Exist" });
    }

    res.status(200).json({
      message: {
        username: user.username,
        name: user.name,
        email: user.email,
        credits: user.credits,
      },
    });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.put("/addCredits", async (req, res) => {
  const { username, credits, mongodbPassword } = req.body;

  let connectionString = `mongodb+srv://ecohen1125:${mongodbPassword}@userdatabase.7uirz2l.mongodb.net/`;

  try {
    await mongoose.connect(connectionString);

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ error: "User Does Not Exist" });
    }

    const updateUser = await User.updateOne(
      { username: username },
      { username: username, credits: user.credits + credits }
    );

    if (!updateUser) {
      return res.status(401).json({ error: "Error Adding Credits" });
    }

    res.status(201).json({ message: "Credits Successfully Added" });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.put("/useCredits", async (req, res) => {
  const { username, credits, mongodbPassword } = req.body;

  let connectionString = `mongodb+srv://ecohen1125:${mongodbPassword}@userdatabase.7uirz2l.mongodb.net/`;

  try {
    await mongoose.connect(connectionString);

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ error: "User Does Not Exist" });
    }

    if (user.credits < credits) {
      return res.status(401).json({ error: "Insufficient Credits" });
    } else {
      const updateUser = await User.updateOne(
        { username: username },
        { username: username, credits: user.credits - credits }
      );

      if (!updateUser) {
        return res.status(401).json({ error: "Error Using Credits" });
      }

      res.status(201).json({ message: "Credits Successfully Removed" });
    }
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

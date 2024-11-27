const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/insightvox", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });

  try {
    await user.save();
    const token = jwt.sign({ id: user._id }, "your_jwt_secret");
    res.status(201).json({ message: "Signup successful", token });
  } catch (err) {
    res.status(400).send("Registration failed.");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User does not exist" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Incorrect password");

  const token = jwt.sign({ id: user._id }, "your_jwt_secret");
  res.json({ message: "Login successful", token });
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, "your_jwt_secret");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

app.get("/home", verifyToken, (req, res) => {
  res.send("Welcome to the home page");
});

app.listen(5000, () => console.log("Server running on port 5000"));

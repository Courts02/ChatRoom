// server.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ChatMessage = require("./models/ChatMessage");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://Courts:OuS9AvLJ9RXEXavP@chatroom.nseggfz.mongodb.net/?retryWrites=true&w=majority&appName=ChatRoom", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// ✅ FIX: Define authenticateToken BEFORE it’s used

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
	const token = req.header("Authorization");
	if (!token) return res.status(401).json({ error: "Access denied" });

	jwt.verify(token, "your-secret-key", (err, user) => {
		if (err) return res.status(403).json({ error: "Invalid token" });
		req.user = user;
		next();
	});
};

// Routes
app.get("/messages", async (req, res) => {
	try {
		const messages = await ChatMessage.find();
		res.json(messages);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post("/messages", authenticateToken, async (req, res) => {
	try {
		const { message } = req.body;
		const user = await User.findById(req.user.userId);

		if (!message) {
			return res.status(400).json({ error: "Message is required" });
		}

		const chatMessage = new ChatMessage({
			user: user.username,
			message,
		});

		await chatMessage.save();

		res.status(201).json(chatMessage);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post("/api/signup", async (req, res) => {
	try {
		const { username, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ username, password: hashedPassword });
		await user.save();
		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		res.status(500).json({ error: "Error signing up" });
	}
});

app.post("/api/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid credentials" });
		}
		const token = jwt.sign({ userId: user._id }, "your-secret-key", {
			expiresIn: "1h",
		});
		res.json({ token });
	} catch (error) {
		res.status(500).json({ error: "Error logging in" });
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

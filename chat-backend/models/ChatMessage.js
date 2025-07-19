// Import the Mongoose library to interact with MongoDB.
const mongoose = require('mongoose');

// Define a new schema for chat messages.
// This sets the structure each document (message) will follow in the MongoDB collection.
const chatMessageSchema = new mongoose.Schema({
	// `user` field: Stores the username or user identifier.
	// Type: String. This field is required, so a message must have a user.
	user: { type: String, required: true },

	// `message` field: Stores the actual chat text.
	// Type: String. Required means you can't save a message without text.
	message: { type: String, required: true },

	// `timestamp` field: Stores when the message was sent.
	// Type: Date. If not provided, it defaults to the current date/time.
	timestamp: { type: Date, default: Date.now },
});

// Create a Mongoose model called 'ChatMessage' using the schema defined above.
// This model represents the 'chatmessages' collection in MongoDB (Mongoose pluralizes the name).
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// Export the model so it can be used in other files (e.g., for creating, reading, or deleting messages).
module.exports = ChatMessage;

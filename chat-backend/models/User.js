// Import the Mongoose library to define schemas and interact with MongoDB.
const mongoose = require('mongoose');

// Define a new schema for the User model.
// This sets up how each User document will look in the database.
const UserSchema = new mongoose.Schema({
  // `username` field: Stores the username for the user.
  // Type: String.
  // `required: true` means you can't create a user without a username.
  // `unique: true` ensures no two users can have the same username.
  username: { type: String, required: true, unique: true },

  // `password` field: Stores the user's hashed password.
  // Type: String.
  // `required: true` means a password must be provided to create a user.
  password: { type: String, required: true },
});

// Export the compiled model.
// This makes a `User` model based on the `UserSchema`.
// Mongoose automatically maps this to the `users` collection in MongoDB.
module.exports = mongoose.model('User', UserSchema);

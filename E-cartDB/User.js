const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isLoggedIn: Boolean,
});

module.exports = mongoose.model("UsersData", userSchema);
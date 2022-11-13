const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: [true, "Pole jest wymagane"],
  },
  encryptedPassword: {
    type: String,
    required: [true, "Pole jest wymagane"],
  },
});

module.exports = mongoose.model("User", userSchema);

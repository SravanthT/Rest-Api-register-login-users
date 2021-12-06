const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    requied: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("users", userSchema);

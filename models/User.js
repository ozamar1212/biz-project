// require packges ->
const mongoose = require("mongoose");

//mongoose Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 2,
  },
  email: {
    type: String,
    required: true,
    minlenght: 6,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
  },
  biz: {
    type: Boolean,
    required: true,
  },
});

//model
const User = mongoose.model("users", userSchema);

//export
module.exports = User;

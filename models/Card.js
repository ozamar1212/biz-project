// require packges ->
const mongoose = require("mongoose");

//mongoose Schema
const cardsSchema = new mongoose.Schema({
  bizName: {
    type: String,
    required: true,
    minlenght: 2,
  },

  bizDiscription: {
    type: String,
    required: true,
    minlenght: 10,
  },

  bizAdress: {
    type: String,
    required: true,
    minlenght: 5,
  },

  bizPhone: {
    type: String,
    required: true,
    minlenght: 8,
  },

  bizImage: {
    type: String,
    required: true,
  },
  bizNum: {
    type: Number,
    unique: true,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

//model
const Cards = mongoose.model("cards", cardsSchema);

//export
module.exports = Cards;

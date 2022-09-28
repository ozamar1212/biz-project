// require packges ->
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//app config ->
const app = express();
app.use(express.json());

//port ->
const port = 8000;

//routes->
const register = require("./routes/register");
const login = require("./routes/login");
const profile = require("./routes/profile");
const cards = require("./routes/cards");

// use methods ->
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/cards", cards);

//mongoose connection ->
mongoose
  .connect(process.env.dbString)
  .then(() => {
    console.log("MongoDB connected succesfully");
  })
  .catch((error) => {
    console.log(error);
  });

//app listen to port 8000 ->
app.listen(port, () => {
  console.log("server is running on port");
});

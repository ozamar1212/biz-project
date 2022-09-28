// require packges ->
const express = require("express");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//router var ->
const router = express.Router();

//joi login schema ->
const loginSchema = joi.object({
  email: joi.string().required().min(6).email(),
  password: joi.string().required().min(8),
});

// login POST endpoint ->
router.post("/", async (req, res) => {
  try {
    //joi validation ->
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    //check if user exsist in DB ->
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("wrong email or password");

    //check if the password compared ->
    let pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) res.status(400).send("wrong email or password");

    //create token ->
    const token = jwt.sign(
      { _id: user._id, biz: user.biz },
      process.env.secretKey
    );
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send("ERROR in login");
  }
});

//export ->
module.exports = router;

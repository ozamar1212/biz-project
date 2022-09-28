// require packges ->
const express = require("express");
const joi = require("joi");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//router var ->
const router = express.Router();

//joi RegisterSchema ->
const RegisterSchema = joi.object({
  name: joi.string().required().min(2),
  email: joi.string().required().min(6).email(),
  password: joi.string().required().min(8),
  biz: joi.boolean().required(),
});

//register post endpoint ->
router.post("/", async (req, res) => {
  try {
    //joi validation ->
    const { error } = RegisterSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    //check if user exsist ->
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user already exsist");

    //add new user to DB ->
    user = new User(req.body);

    //crypt the password using bcrypt ->
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    // create token
    const token = jwt.sign(
      { _id: user._id, biz: user.biz },
      process.env.secretKey
    );

    //save the user ->
    await user.save();
    return res.status(201).send({ token });
  } catch (error) {
    res.status(400).send("ERROR in register");
  }
});

//export ->
module.exports = router;

// require packges ->
const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const User = require("../models/User");

//router var ->
const router = express.Router();

//route ->
router.get("/", auth, async (req, res) => {
  try {
    // get user ditails->
    const user = await User.findById(req.payload._id);
    if (!user) res.status(404).send("user doesn't exist");
    return res.status(200).send(_.pick(user, ["name", "email", "biz"]));
  } catch (error) {
    res.status(400).send("ERROR in profile");
  }
});

//export ->
module.exports = router;

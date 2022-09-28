// require packges ->
const express = require("express");
const joi = require("joi");
const Cards = require("../models/Card");
const auth = require("../middleware/auth");
const _ = require("lodash");

//router var ->
const router = express.Router();

// cards Joi Schema ->
const cardsJoiSchema = joi.object({
  bizName: joi.string().required().min(2),
  bizDiscription: joi.string().required().min(10),
  bizAdress: joi.string().required().min(5),
  bizPhone: joi.string().required().min(8),
  bizImage: joi.string().required(),
});

// open new card using POST endpoint ->
router.post("/", auth, async (req, res) => {
  try {
    //joi validation ->
    const { error } = cardsJoiSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    //create card ->
    const card = new Cards(req.body);

    // create card random number ->
    let bizFlag = true;
    while (bizFlag) {
      let newBizNum = _.random(1, 900);

      //check in DB if number exist ->
      let checkNum = await Cards.findOne({ bizNum: newBizNum });
      if (!checkNum) bizFlag = false;
      card.bizNum = newBizNum;
      card.userId = req.payload._id;
    }
    //save card ->
    await card.save();
    return res.status(201).send("card created successfully");
  } catch (error) {
    res.status(400).send("ERROR in opennig card");
  }
});

// get all user cards searcing by user_id ->
router.get("/my-cards", auth, async (req, res) => {
  try {
    //Check if card exist ->
    const getCards = await Cards.find({ userId: req.payload._id });
    if (getCards.length == 0) res.status(404).send("card not found");
    return res.status(200).send(getCards);
  } catch (error) {
    res.status(400).send("ERROR in getting cards");
  }
});

// Get card id and return all card ditails using GET endpoint ->
router.get("/:id", auth, async (req, res) => {
  try {
    //Check if card exist ->
    const card = await Cards.findById(req.params.id);
    if (!card) res.status(404).send("Card not found");
    return res.status(200).send(card);
  } catch (error) {
    res.status(400).send("ERROR in getting card ditails");
  }
});

// edit card using PUT endpoint ->
router.put("/:id", auth, async (req, res) => {
  //Check if card exist ->
  try {
    const card = await Cards.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!card) res.status(404).send("card not found");
    return res.status(200).send(card);
  } catch (error) {
    res.status(400).send("ERROR in getting card ditails");
  }
});

// Delete card using DELETE endpoint ->
router.delete("/:id", auth, async (req, res) => {
  //Check if card exist ->
  try {
    const card = await Cards.findByIdAndDelete(req.params.id);
    if (!card) res.status(404).send("card not found");
    return res.status(200).send("Card deleted succesfully");
  } catch (error) {
    res.status(400).send("ERROR in delete card");
  }
});

// get all cards from DB ->
router.get("/", auth, async (req, res) => {
  //Check if card exist ->
  try {
    const getCards = await Cards.find();
    if (getCards.length == 0) res.status(404).send("ERROR in getting cards");
    return res.status(200).send(getCards);
  } catch (error) {
    res.status(400).send("ERROR in getting cards ditails ditails");
  }
});
//export ->
module.exports = router;

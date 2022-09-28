// require packges ->
const jwt = require("jsonwebtoken");

//export ->
module.exports = (req, res, next) => {
  try {
    //check if token exsist ->
    const token = req.header("Authorization");
    if (!token) return res.status(404).send("no token provided");

    // verify token using secretKey
    const payload = jwt.verify(token, process.env.secretKey);

    req.payload = payload;

    //starting next method
    next();
  } catch (error) {
    res.status(400).send("unAuthorization");
  }
};

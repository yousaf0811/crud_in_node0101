// require("dotenv").config();
const jwt = require("jsonwebtoken");

// const privateKey = process.env.JWT_PRIVATE_KEY;
const privateKey = "yousaf"

const generateAuthToken = ({ username, email }) =>
  jwt.sign({ username, email}, privateKey);

const verifyAuthToken = (token) => {
  console.log ('here token is ---------------',jwt.verify(token, privateKey))
  return jwt.verify(token, privateKey)
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
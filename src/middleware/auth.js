const { verifyAuthToken } = require("../utils/helpers");

const authHandler = (req, res, next) => {
  if (!req.headers.api) {
    console.log('-',req.headers.api)
    return res
      .status(400)
      .send({ message: "Access denied, Auth token is not provided" });
  }
  try {
    const token = req.headers.api;
    const isTokenValid = verifyAuthToken(token);      
    console.log("hello")
    if (isTokenValid) {
      next();
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
    next();
  }
};
module.exports = authHandler;
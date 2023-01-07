const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/router/studentsignup");
// const authHandler = require ('./src/middleware/auth')
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
// app.use(authHandler)
mongoose
  .connect("mongodb://0.0.0.0:27017/studentdata")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Couldn't connected to MongoDB, ${error}`));
  app.use("/",router) 
app.listen(8080, () => console.log("App is listening at port 5000"));
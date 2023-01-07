const express = require("express");
const studentdata = require("../model/users")
const router = express.Router();
const {generateAuthToken} = require('../utils/helpers')
const {FormatUserObj} = require('./userFormat')
const authHandler = require ('../middleware/auth');
const errorHandler = require("../middleware/error");
const {EmailVrification} = require('./email')
//Get All Users 
router.get("/users", async (req, res) => {
  if(req.headers.limit !== undefined){
    const limit = req.headers.limit;
    const skip = req.headers.skip;
    const students = await studentdata.find().
    limit(limit).skip(skip).sort({email: 1});
    res.status(200).send(students);    
  }
  else{
    const students = await studentdata.find();
    res.status(200).send(students);
  }
});
router.get(
  "/verifyUser", 
  errorHandler(async (req, res) => {
    const user = await studentdata.findOne({ token: req.params.token });
    await studentdata.findByIdAndUpdate({ _id: user._id}, {token : ""})
   
    res.status(200).send({
      status: true,
      message: "VERIFICATION COMPLETED",
    
    });
  })
);
//Get User By ID
router.get("/:userId", 
errorHandler(
  async (req, res) => {
    const user = await studentdata.findOne({ _id: req.params.userId });
    const userObj = FormatUserObj(user)
    res.status(200).send({
      status: true,
      message: "user found successfully",
      data: userObj,
    });
  }
));
//Login 
router.post("/login", async (req, res) => {
  const user = await studentdata.findOne({ email: req.body.email });
  const pass = await studentdata.findOne({password: req.body.password });
  if (!user) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }
  if (!pass) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }
  const token = generateAuthToken({
    username: user.username,
    email: user.email
  });

  const data = {
    username: user.username,
    email: user.email,
  }
  
  await studentdata.findOneAndUpdate({_id: user._id},{token : token})
  //console.log("this is your tokens",token)

  res.status(200).send({ message: "success", token, data });
});
//Get User by ID and Edit
router.put("/:userId/edit",authHandler,async (req,res)=>{
  console.log ('body', req.body ,req.params.userId)
    try {
        const user = await studentdata.findOneAndUpdate({_id: req.params.userId}, req.body);
        console.log('json',user)
        res.json({ data: user, status: "success" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});
//Delete User with ID
router.delete("/:userId/delete",authHandler,async (req,res)=>{

  try {
      const user = await studentdata.findByIdAndDelete(req.params.userId);
      res.json({ data: user, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.get(
    "/logout",
    authHandler,
    errorHandler(async (req, res) => {
      const user = await User.findOne({ token: req.headers.token });
      await User.findOneAndUpdate({ _id: user._id }, { token: "" });
      res.status(200).send({
        status: true,
        message: "Logout successfully",
      });
    })
  );
//Signup New User
router.post("/student_signup", async (req, res) => {
    const payload = req.body;
    let user = new studentdata(payload);
    user = await user.save();
    const token = generateAuthToken({
      username: user.firstName,
      email: user.email
    });
    EmailVrification()
    res.status(200).send({ user, token : token});
  });
  module.exports = router;
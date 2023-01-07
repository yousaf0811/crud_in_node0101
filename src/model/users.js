const mongoose = require("mongoose");
const studentsignupSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  token:String
});
const studentdata = mongoose.model("studentsignupdata", studentsignupSchema);
module.exports = studentdata;
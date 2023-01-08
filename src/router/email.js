const nodemailer = require('nodemailer');

// Create a transport object
async function EmailVrification(){
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yousaf0811@gmail.com',
    pass: 'qaeckudmykhwmzwx'
  }
});

// Define the email options
const mailOptions = {
  from: 'yousaf0811@gmail.com',
  to: 'yousafmramzan0811@gmail.com',
  subject: 'Email Verification',
  html:`<p>Thanks</p>`
        // <p>${code}</p>`
//   text: 'Please click the following link to verify your email: http://www.example.com/verify?token=12345'
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email sent: ${info.response}`);
  }
});
}
module.exports = {
    EmailVrification
};
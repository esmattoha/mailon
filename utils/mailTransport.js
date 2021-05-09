const nodemailer = require("nodemailer");

const mailOutput = `
<h3>Hey Dude, Welcome you, with a big Heart from Us.</h3>
<p>We'll send all the information on your email.</p>
`;

const passwordOutput = `
<h3>Password Reset!</h3>
<p>Make sure, you want to change your password?</p>
<a href="http://localhost:3000/checkemail/customer/reset/zxdcfvgh4567sedrft234">Click Here</a>
`;

let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "7d991d301fe4a3",
    pass: "011cc838b4044d",
  },
  tls: { rejectUnauthorized: true },
});

// send mail with defined transport object
const mailTransport = transporter.sendMail({
  from: '"node app " <mondaldipu904@gmail.com>',
  to: "jahidanower@email.com",
  subject: "Node app",
  text: "Hello world",
  html: mailOutput,
});

const passwordTransport = transporter.sendMail({
  from: '"node app " <mondaldipu904@gmail.com>',
  to: "jahidanower@email.com",
  subject: "Node app",
  text: "Hello world",
  html: passwordOutput,
});

module.exports ={ mailTransport, passwordTransport };
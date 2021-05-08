const nodemailer = require("nodemailer");

const output = `
<h3>Hey Dude, Welcome you, with a big Heart from Us.</h3>
<p>We'll send all the information on your email.</p>
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
transporter.sendMail({
  from: '"node app " <mondaldipu904@gmail.com>',
  to: "jahidanower@email.com",
  subject: "Node app",
  text: "Hello world",
  html: output,
});

module.exports = transporter ;
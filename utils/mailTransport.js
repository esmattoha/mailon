const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
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
const mailTransport = async (name, email) => {
  transporter.sendMail({
    from: '"node app " <mondaldipu904@gmail.com>',
    to: email,
    subject: "Node app",
    text: "Hello world",
    html: `
  <h3>Hey ${name}, Welcome you, with a big Heart from Us.</h3>
  <p>We'll send all the information on your email.</p>
  `,
  });
};

const passwordTransport = async (token, email) => {
  transporter.sendMail({
    from: '"node app " <mondaldipu904@gmail.com>',
    to: email,
    subject: "Node app",
    text: "Hello world",
    html: `
       <h3>Password Reset!</h3>
       <p>Make sure, you want to change your password?</p>
        <a href="http://localhost:3000/checkemail/customer/reset/${token}">Click Here</a>
         `,
  });
};

module.exports ={ mailTransport, passwordTransport};

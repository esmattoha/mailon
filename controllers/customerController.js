const Customer = require("../models/customerModel");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

exports.store = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);

    const output = `
    <h3>Hey ${name} , Welcome you, with a big Heart from Us.</h3>
    <p>We'll send all the information on your email.</p>
    `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port:2525,
      secure: false, 
      auth: {
        user: '7d991d301fe4a3', 
        pass: '011cc838b4044d',
      },
      tls:{rejectUnauthorized: true}
    });
  
    // send mail with defined transport object
     await transporter.sendMail({
      from: '"node app " <mondaldipu904@gmail.com>', 
      to: email, 
      subject: "Node app", 
      text: "Hello world", 
      html: output,
    });
  
    const customer = new Customer({ name, email, password: hash });
    const csm = await customer.save();
    res.status(201).json({ message: "Stored!", data: csm });
  } catch (error) {
    console.log(error);
  }
};

exports.index = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json({ data: customers });
  } catch (error) {
    console.log(error);
  }
};

exports.show = async (req, res) => {
    const csmId = req.params.csmId ;
    try {
      const customer = await Customer.findById(csmId);
      res.status(200).json({ data: customer});
    } catch (error) {
      console.log(error);
    }
  };
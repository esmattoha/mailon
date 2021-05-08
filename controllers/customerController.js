const Customer = require("../models/customerModel");
const bcrypt = require("bcrypt");
const transporter = require("../utils/mailTransport");
const token = require("../utils/jwtToken");

exports.store = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);

    await transporter;

    const customer = new Customer({ name, email, password: hash });
    const csm = await customer.save();
    const Token = await token;
    res.status(201).json({ message: "Stored!", data: csm, token: Token });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const customer = await Customer.findOne({ email: email });
  if (!customer) {
    res.status(404).json({ message: "Email doesn't exist!" });
  }
  const isMatch = await bcrypt.compare(password, customer.password);
  if (!isMatch) {
    res.status(422).json({
      message: "Invalid Email & Password!",
    });
  }
  const Token = await token;
  res.status(201).json(Token);
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
  const csmId = req.params.csmId;
  try {
    const customer = await Customer.findById(csmId);
    res.status(200).json({ data: customer });
  } catch (error) {
    console.log(error);
  }
};

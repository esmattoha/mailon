const Customer = require("../models/customerModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {mailTransport, passwordTransport} = require('../utils/mailTransport');
const token = require("../utils/jwtToken");

/*
 */
exports.store = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);

    await mailTransport(name, email);

    const customer = new Customer({ name, email, password: hash });
    const csm = await customer.save();
    const Token = await token(email, csm._id);
    console.log(Token);
    res.status(201).json({ message: "Stored!", data: csm, token: Token });
  } catch (error) {
    console.log(error);
  }
};

/*
 */
exports.login = async (req, res, next) => {
  const {email, password} = req.body

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
  const Token = await token(email, customer._id);
  res.status(200).json(Token);
};

/*
 */
exports.index = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json({ data: customers });
  } catch (error) {
    console.log(error);
  }
};

/*
 */
exports.show = async (req, res) => {
  const csmId = req.params.csmId;
  try {
    const customer = await Customer.findById(csmId);
    res.status(200).json({ data: customer });
  } catch (error) {
    console.log(error);
  }
};

/*
 */
exports.resetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const buffer = await crypto.randomBytes(32);
    if (!buffer) {
      console.log(err);
      res.status(403).json({ message: "token not generated!" });
    }
    const token = await buffer.toString("hex");
    const customer = await Customer.findOne({ email:email });
    if (!customer) {
      res.status(404).json({ message: "user not found!" });
    }
    customer.resetToken = token;
    customer.resertTokenExpiration = Date.now() + 3600000;
    await customer.save();
    await passwordTransport(token,email);
  } catch (error) {
    console.log(error);
  }
};

/*
 */
exports.updatePassword = async (req, res) => {
  const token = req.params.token;
  const password = req.body.password;
  const hash = await bcrypt.hash(password, 12);
  const customer = await Customer.findOne({
    resetToken: token,
    resertTokenExpiration: { $gt: Date.now() },
  });
  customer.password = hash;
  customer.resetToken = undefined;
  customer.resertTokenExpiration = undefined;
  await customer.save();
  res.status(200).json({ message: "Passwod updated!" });
};

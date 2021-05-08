const Customer = require("../models/customerModel");
const bcrypt = require("bcrypt");
const transporter = require('../utils/mailTransport');

exports.store = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);

    await transporter;

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
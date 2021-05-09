const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const token = jwt.sign(
    {
      email: 'mouduttacs@gmail.com',
      csmid: "609827cee218975160a6cf16",
    },
    process.env.JWT_KEY,
    {
      expiresIn: "10h",
    }
  );

module.exports = token ;

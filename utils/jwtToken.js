const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const token = async(email, csmId) => {
  return jwt.sign(
    {
      email:email,
      id: csmId,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "10h",
    }
  );
};
module.exports = token;

const  jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const token = jwt.sign(
    {
      email: this.email,
      userId: this._id,
    },
   process.env.JWT_KEY,
    {
      expiresIn: "10h",
    }
  );

  module.exports = token ;
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  let token = req.header("authorization");
  token = token.split(" ")[1];
  if (!token) {
    res.status(403).json({ message: "Unauthorized Request!" });
  }
  jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized!" });
    }
    req.userId = decodedToken.userId;
    next();
  });
};

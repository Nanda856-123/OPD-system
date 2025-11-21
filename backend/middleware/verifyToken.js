const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Invalid token format" });
    }

    const payload = jwt.verify(token, "opd_secret_key");
    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
}

module.exports = verifyToken;

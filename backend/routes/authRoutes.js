const express = require('express');
const router = express.Router();
const userModel = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    // 🔹 If password is NOT hashed (old users)
    if (typeof user.password === "string" && !user.password.startsWith("$2")) {
      // check plain text match
      if (user.password !== req.body.password) {
        return res.status(401).send({ message: "invalid credential" });
      }

      // hash and update DB
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      await user.save();
    }

    // 🔹 Normal bcrypt compare (for hashed passwords)
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "invalid credential" });
    }

    let payload = { email: user.email, role: user.role };
    const token = jwt.sign(payload, 'opd_secret_key');

    return res
      .status(200)
      .send({ message: "login successful", token: token, user: user });

  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
});

module.exports = router;

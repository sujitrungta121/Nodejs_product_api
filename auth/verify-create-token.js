const jwt = require("jsonwebtoken");
const express = require("express");
const next = express;
const generateToken = async (email, password, _id) => {
  const token = await jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: { email, password, _id },
    },
    process.env.JWT_SECRET
  );
  return token;
};

const verifyToken = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied!" });
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  console.log(payload, "payload");
  if (!payload) {
    return res.status(403).json({ message: "Authorization failed!" });
  }
  req.user = payload;
  next();
};

module.exports = { generateToken, verifyToken };

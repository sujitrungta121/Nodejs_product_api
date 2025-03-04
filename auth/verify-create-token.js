const jwt = require("jsonwebtoken");
const express = require("express");
const next = express;
const generateToken = (email, _id) => {
  const token =  jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: { email, _id },
    },
    process.env.JWT_SECRET
  );
  return token;
};


const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload, "payload");

    req.user = payload;
    next(); 
  } catch (error) {
    return res.status(403).json({ message: "Authorization failed!", error: error.message });
  }
};

module.exports = { generateToken, verifyToken };

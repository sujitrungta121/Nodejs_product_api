const User = require("../models/user");
const userAuth = require("../auth/verify-create-token");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(201).json({ message: "User already exist" });
    }

    await User.create({ name, email, password });
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const isUserExist = await User.findOne({ email,password });
    if (!isUserExist) {
      return res.status(201).json({ message: "User does not exist" });
    }

    const token = await userAuth.generateToken(
      isUserExist.email,
      isUserExist.password,
      isUserExist._id
    );

    return res.status(200).json({
      message: "User logged in successfully",
      user: isUserExist,
      token: token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

module.exports = { register, login };

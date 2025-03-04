const connectDb = () => {
  const mongoose = require("mongoose");
  const db = mongoose.connect(process.env.MONGO_URI);
  if (db) {
    console.log("Database connected successfully");
  }
  return db;
};
module.exports = { connectDb };

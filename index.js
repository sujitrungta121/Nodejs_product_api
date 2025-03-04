const express = require("express");
const app = express();
const http = require("http");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const { connectDb } = require("./config/connectDb");

const dotenv = require("dotenv");

dotenv.config();

http.createServer(app);
connectDb();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/auth", userRouter);
app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRouter = require("./Routes/user");
const authRouter = require("./Routes/authntication")
const productRouter = require("./Routes/product")
const cartRouter = require("./Routes/cart")
const orderRouter = require("./Routes/order")
const stripeRouter = require("./Routes/stripe")
const cors = require('cors')

mongoose
  .connect(process.env.URLLOCAL)
  // .connect('mongodb://127.0.0.1:27017')
  .then(() => console.log("MongoDB connected successfuly"))
  .catch((err) => console.log("Error connecting to mongoDB: ", err));

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/stripe", stripeRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Connected to the API")
});

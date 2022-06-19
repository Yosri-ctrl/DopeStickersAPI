const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRouter = require("./Routes/user");

mongoose
  .connect(process.env.URL)
  .then(() => console.log("MongoDB connected successfuly"))
  .catch((err) => console.log("Error connecting to mongoDB: ", err));

app.use(express.json())
app.use("/api/users", userRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Connected to the API")
});

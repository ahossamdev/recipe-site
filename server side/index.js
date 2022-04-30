const express = require("express");
const app = express();
const mongoose = require("mongoose");
const recipeRouter = require("./routes/recipes");

require("dotenv").config();
const cors = require("cors");
const corsOption = {
  origin: process.env.CORS_URL,
  optionsSuccessStatus: 200,
};

const url = process.env.URL;
mongoose
  .connect(url)
  .then(() => console.log("DB connected successfully"))
  .catch(() => console.log("failed to connect DB"));

app.use(express.json());
// app.use(cors(corsOption));
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/", recipeRouter);

app.use((err, res) => {
  res.status(500).json(err);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});

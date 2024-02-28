"use client";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const ProductRoutes = require("./api/routes/products");
const OrderRoutes = require("./api/routes/orders");
const UserRoutes = require("./api/routes/users");

// mongoose.connect(
//   "mongodb+srv://stsureotieno:" +
//     process.env.MONGO_ATLAS_PW +
//     "@cluster0.rkzbyw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// );
mongoose
  .connect("mongodb://localhost:27017/book-shop")
  .then(console.log("Server is listening on port 8080"));

//app.use(express.json);
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", ProductRoutes);
app.use("/orders", OrderRoutes);
app.use("/users", UserRoutes);

app.all("*", (req, res, next) => {
  const error = new Error("Not found");
  res.status(404).send(error.message);
  next();
});

module.exports = app;

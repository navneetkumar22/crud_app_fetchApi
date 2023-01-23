require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('../frontend'))
app.use("/", userRoutes);

connectToDB();

module.exports = app;
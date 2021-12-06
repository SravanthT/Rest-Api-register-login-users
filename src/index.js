const express = require("express");
const routes = require("../views/useRoutes");
const app = express();
const ejs = require("ejs");
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser());
app.use(routes);

mongoose
  .connect(
    "mongodb+srv://demo:Tagore007@tagores.frx9e.mongodb.net/LoginUser?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log(`server is running of Port ${port}`);
});

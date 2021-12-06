const express = require("express");
const router = express.Router();
const userSchema = require("../model/useModel");
const { body } = require("express-validator");
const checkandAdd = require("../controler/addUser");
const { verifyUser, verifyAdmin } = require("../controler/verifyLogin");

router.get("/", (req, res) => {
  res.send("this is home page");
});

router.get("/register", (req, res) => {
  res.render("registerUser");
});

router.post(
  "/register",
  body("email").isEmail(),
  body("name").isString(),
  (req, res) => {
    checkandAdd(req, res);
  }
);
router.get("/login", (req, res) => {
  res.render("userLogin");
});
router.post("/login", (req, res) => {
  verifyUser(req.body, res);
});
router.get("/users", (req, res) => {
  verifyAdmin(req, res);
});

router.get("*", (req, res) => {
  res.status(404).send("Page not Found");
});

module.exports = router;

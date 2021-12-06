const { validationResult } = require("express-validator");
const userSchema = require("../model/useModel");
const bcrypt = require("bcrypt");

const checkAndAdd = (req, res) => {
  if (req.body.password !== req.body.cfmPassword) {
    return res.status(417).send("Confirm Password is Incorrect");
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(409).json({ errors: errors.array() });
  }
  console.log(req.body.password);
  const hashPassword = bcrypt.hashSync(req.body.password, 9);
  req.body.password = hashPassword;
  const user = new userSchema(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(409).send(err);
    } else res.status(201).send("User Registered Successfully");
  });
};

module.exports = checkAndAdd;

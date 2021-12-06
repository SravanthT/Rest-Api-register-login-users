const userSchema = require("../model/useModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyUser = (data, res) => {
  let userMail = data.email;
  let userPwd = data.password;

  var generateToken = (user) => {
    console.log(user);
    var token = jwt.sign(
      { email: user[0].email, isAdmin: user[0].isAdmin },
      "india",
      { expiresIn: "300s" }
    );
    res
      .status(202)
      .header({ authorization: `${token}` })
      .json({ "Logged-In Successfull": token });
  };
  // This function gets when Userdata exists in db
  const verifyPassword = (dbPwd) => {
    const result = bcrypt.compareSync(`${userPwd}`, `${dbPwd[0].password}`);
    result
      ? generateToken(dbPwd)
      : res.status(406).send("Please Enter Valid Credentials");
  };

  //To find the User details
  userSchema.find({ email: userMail }, (err, user) => {
    if (err) {
      return res.send(err);
    } else {
      user.length === 0
        ? res.status(400).send("User Not Found")
        : verifyPassword(user);
    }
  });
};

//This is used in users Route to verify the user and is user Admin.
const verifyAdmin = (req, res) => {
  let token = req.headers.authorization;
  if (token == undefined) {
    return res.status(403).send("Loggin Required");
  } else {
    try {
      var decoded = jwt.verify(token, "india");
      decoded.isAdmin
        ? users()
        : res.status(401).send("You are not Authorised");
    } catch (err) {
      res.json(err);
    }
  }
  //In this Function we pass our query
  function users() {
    userSchema.find({}, (err, users) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.json(users);
      }
    });
  }
};

module.exports = { verifyUser, verifyAdmin };

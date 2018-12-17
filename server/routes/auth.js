const express = require("express");
const passport = require('passport');
const router = express.Router();
const transporter = require('../mail/transporter');
const uploadCloud = require('../config/cloudinary');
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return res.status(500).json({ message: "Error login" }) }
    if (!user) { return res.status(500).json({ message: "User no exists" }) }

    req.logIn(user, function (err) {
      if (err) { return res.status(500).json({ message: "Error login" }) }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.get("/confirm/:confirmCode", (req, res, next) => {
  User.findOneAndUpdate({ confirmationCode: req.params.confirmCode }, { $set: { status: "Active" } }, { new: true })
    .then(() => {
      res.status(200).json({ message: "Account activated" })
    })
    .catch(err => res.status(500).json({ message: "Something went wrong" }));
});

router.post("/signup", uploadCloud.single("image"), (req, res, next) => {

  const { username, password, password_confirm, email, location, hobbies} = req.body;
  const pictureUrl = req.file.url;
  


  if (username === "" || password === "" || email === "" || location === "" || hobbies.length <= 0) {
    res.status(500).json({ message: "Indicar todos los datos" });
    return;
  }

  if (password !== password_confirm) {
    res.status(500).json({ message: "The passwords not same" })
    return
  }



  User.findOne({ username }, "username", (err, user) => {
  
    if (user !== null) {
      res.status(500).json({ message: "The username already exists" })
      return;
    }

   

    User.findOne({ email }, "email", (err, email) => {
      if (email !== null) {
        res.status(500).json({ message: "The email already exists" })
        return;
      }
    });


    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email: email, 
      location: location,
      image: pictureUrl,
      hobbies: hobbies
    });



    newUser.save((err, user) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong" });
      } else {
        req.login(user, (err) => {

          if (err) {
              res.status(500).json({ message: 'Login after signup went bad.' });
              return;
          } 
          
          res.status(200).json({ message: 'SignUp succesfull' });
      });
      }
    });
  });
   
})

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Logout succesfull" });
});

router.get('/loggedin', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(403).json({ message: "U need login to access" });
  }
})

module.exports = router;

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

router.post("/signup", uploadCloud.single("photo"), (req, res, next) => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  const { username, password, confirmPass, email } = req.body;
  const image = req.body.image;

  if (username === "" || password === "") {
    res.status(500).json({ message: "Indicate username and password" });
    return;
  }

  if (confirmPass === "") {
    res.status(500).json({ message: "Confirm your password" })
  } else if (password !== confirmPass) {
    res.status(500).json({ message: "The passwords not same" })
  }

  if (email === "") {
    res.status(500).json({ message: "Indicate an email" });
    return;
  }

  if (image === "") {
    res.status(500).json({ message: "Provide a photo" });
    return;
  }

  const confirmationCode = token;

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(500).json({ message: "The username already exists" })
      return;
    }
  })
    .then(() => {
      User.findOne({ email }, "email", (err, user) => {
        if (user !== null) {
          res.status(500).json({ message: "The email already exists" })
          return;
        }
      })
        .then(() => {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);

          const newUser = new User({
            username,
            password: hashPass,
            email,
            image,
            confirmationCode
          });

          newUser.save()
            .then(() => {
              transporter.sendMail({
                from: '"WeeDo Corporation" <labsandtests@gmail.com>',
                to: email,
                subject: 'Confirmation Email',
                text: 'Welcome to WeeDo',
                html: `<p>Welcome to WeeDo</p>
      <p>Your username is: ${username}</p>
      <a href="http://localhost:5000/confirm/${confirmationCode}">Confirm your email here, for activate your account & can access in our WebSite!<a>
      `,
              })
                .then(() => res.status(200).json({ message: "Succefully registered, revise your email to activate the account" }))
                .catch(err => res.status(500).json({ message: "Error at signup" }));
            })
            .catch(err => {
              res.status(500).json({ message: "Something went wrong, try again or wait, thanks and sorry for issues" });
            })
        }).catch(err => res.status(500).json({ message: "Error at signup" }));
    })
    .catch(err => res.status(500).json({ message: "Error at signup" }));
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

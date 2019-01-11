const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.put("/editprofile", uploadCloud.single("image"), (req, res, next) => {
  const {
    username,
    password,
    password_confirm,
    email,
    location,
    hobbies
  } = req.body;
  const pictureUrl = req.file.url;

  userEdited = {};

  if (username === "") {
    userEdited.username = req.user.username;
  } else {
    userEdited.username = username;
  }

  if (password === "") {
    userEdited.password = req.user.password;
  } else {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    userEdited.password = hashPass;
  }

  if (password !== password_confirm) {
    res.status(500).json({ message: "The passwords not same" });
    return;
  }

  if (email === "") {
    userEdited.email = req.user.email;
  } else {
    userEdited.email = email;
  }

  if (pictureUrl === "") {
    userEdited.image = req.user.image;
  } else {
    userEdited.image = pictureUrl;
  }

  if (location === "") {
    userEdited.location = req.user.location;
  } else {
    userEdited.location = location;
  }

  if (hobbies === "") {
    userEdited.hobbies = req.user.hobbies;
  } else {
    userEdited.hobbies = hobbies;
  }

 

  User.findOne( {username} , "username", (err, user) => {
    
    if (user !== null) {
      res.status(500).json({ message: "The username already exists" });
      return;
    }



    User.findOne({ email }, "email").distinct(req.user._id, (err, email) => {
      if (email !== null) {
        res.status(500).json({ message: "The email already exists" });
        return;
      }

      User.findByIdAndUpdate(req.user._id, userEdited, { new: true })
        .then(userupdated => {
          res.status(200).json({ userupdated, message: "User edited!" });
        })
        .catch(err =>
          res.status(500).json({ message: "Error to edit user " + err })
        );
    });
  });
});

router.put('/saveBasicData',(req,res,next)=>{
  updateUser = req.body

  User.findOneAndUpdate({username: updateUser.username},updateUser, {new:true})
   .then(updateUser => {
        res.status(200).json({message: "User edited!" });
   }).catch(err => console.log(err))
})

router.put('/saveHobbies',(req,res,next) =>{
 
  updateUser = req.body
  console.log(updateUser)
  User.findOneAndUpdate({username: updateUser.username}, updateUser, {new:true})
    .then(updateUser => {
      res.status(200).json({message: "User edited!" });
    }).catch(err => console.log(err))

})

router.get("/profile/:_id", (req, res, next) => {
  User.findById(req.params._id)
    .then(user => res.status(200).json({ user }))
    .catch(err =>
      res.status(500).json({ message: "Error to show the user profile " + err })
    );
});

router.get("/getuser", (req, res, next) => {
  User.findById(req.user._id)
    .populate("plans")
    .then(user => res.status(200).json({ user }))
    .catch(err =>
      res.status(500).json({ message: "Error to get user " + err })
    );
});

module.exports = router;

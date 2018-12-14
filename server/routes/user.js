const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

router.put('/editprofile/:_id', (req, res, next) => {
    const { username, password, confirmPassword, email, image, location, hobbies } = req.body;

    userEdited = {}

    if (username === "") {
        userEdited.username = req.user.username
    } else {
        userEdited.username = username
    }

    if (password === "") {
        userEdited.password = req.user.password
    } else {
        userEdited.password = password
    }

    if (confirmPassword !== password) {
        res.status(500).json({ message: "Confirm password" })
        return
    }

    if (email === "") {
        userEdited.email = req.user.email
    } else {
        userEdited.email = email
    }

    if (image === "") {
        userEdited.image = req.user.image
    } else {
        userEdited.image = image
    }

    if (location === "") {
        userEdited.location = req.user.location
    } else {
        userEdited.location = location
    }

    if (hobbies === "") {
        userEdited.hobbies = req.user.hobbies
    } else {
        userEdited.hobbies = hobbies
    }

    User.findByIdAndUpdate(req.params._id, userEdited, { new: true })
        .then((userupdated) => {
            res.status(200).json({ userupdated, message: "User edited!" })
        })
        .catch(err => res.status(500).json({ message: "Error to edit user " + err }))
})

router.get('/profile/:_id', (req, res, next) => {

    User.findById(req.params._id)
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(500).json({ message: "Error to show the user profile " + err }))
})

router.get("/getuser", (req, res, next) => {

    User.findById(req.user._id).populate('plans')
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(500).json({ message: "Error to get user " + err }))
})


module.exports = router;
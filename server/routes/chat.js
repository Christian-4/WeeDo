const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat")
const User = require("../models/User")


router.get("/getchat/:_id", (req, res, next) => {
  Chat.findById(req.params._id).populate("users").populate('plan')
    .then(chat => {
      res.status(200).json({ chat, user: req.user.username })
    })
    .catch(err => console.log(err))
});

router.post("/addmessage/:_id", (req, res, next) => {
  Chat.findByIdAndUpdate(req.params._id, { $addToSet: { messages: { name: req.user.username, message: req.body.message } } }, { new: true })
    .then(chat => {
      res.status(200)
    })
    .catch(err => console.log(err))
});

router.get("/getchats", (req, res, next) => {
  User.findById(req.user._id).populate("friendchats").populate("planchats")
    .then(user => {
      Chat.find({ _id: { $in: user.friendchats } }).populate("users")
        .then(friendchats => {
          Chat.find({ _id: { $in: user.planchats } }).populate("plan")
            .then(planchats => res.status(200).json({ friendchats, planchats, user: req.user }))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router;
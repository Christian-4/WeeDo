const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat")


router.get("/getchat/:_id", (req, res, next) => {
  Chat.findById(req.params._id).populate("users")
  .then(chat => {
    res.status(200).json({chat, user: req.user.username})
  }).catch(err=>console.log(err))
});

router.post("/addmessage/:_id", (req, res, next) => {
  Chat.findByIdAndUpdate(req.params._id, { $addToSet: { messages: {name: req.user.username, message: req.body.message} } }, { new: true })
  .then(chat => {
    res.status(200)
  })
  .catch(err=>console.log(err))
});
  

  module.exports = router;
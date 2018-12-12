const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const FriendConfirmation = require("../models/FriendConfirmation");
const Chat = require("../models/Chat");

router.post("/addfriend/:_id", function (req, res, next) {
    user = req.user

    User.findById(req.params._id)
        .then((userfounded) => {
            const newFriendConfirmation = new FriendConfirmation({
                originUser: user._id,
                finalUser: req.params._id
            });
            userfounded.confirmations.push(newFriendConfirmation._id)
            res.status(200).json({ message: "Friend request send!" })
        })
        .catch(err => res.status(500).json({ message: "Error to send friend request! " + err }))
});

router.post("/deletefriend/:_id", function (req, res, next) {
    user = req.user

    User.findById(user)
        .then((originUser) => {
            originUser.friends.splice(indexOf(req.params._id), 1)
            res.status(200).json({ message: "The friend was deleted! " + err })

            User.findById(req.params._id)
                .then((finalUser) => {
                    finalUser.friends.splice(indexOf(user), 1)

                    Chat.findById(finalUser.chats)
                })
        })
        .catch(err => res.status(500).json({ message: "Error to delete the friend " + err }))

});

module.exports = router;
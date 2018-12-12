const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const FriendConfirmation = require("../models/FriendConfirmation");

router.post("/addfriend/:_id", function (req, res, next) {

    User.findById(req.params._id)
        .then((userFounded) => {
            const newFriendConfirmation = new FriendConfirmation({
                originUser: req.user._id,
                finalUser: req.params._id
            });
            newFriendConfirmation.save()
                .then((confirmation) => {
                    User.findByIdAndUpdate(userFounded._id, { $push: { confirmations: newFriendConfirmation._id } })
                        .then(() => {
                            res.status(200).json({ message: "Friend request send!" })
                        })
                        .catch(err => {
                            FriendConfirmation.findByIdAndDelete(confirmation._id)
                                .then(() => res.status(500).json({ message: "Error to send friend request! " + err }))
                        })
                })
                .catch(err => res.status(500).json({ message: "Error to send friend request! " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error to send friend request! " + err }))
});

router.delete("/deletefriend/:_id", function (req, res, next) {

    User.findByIdAndUpdate(req.user._id, { $pull: { friends: req.params._id } })
        .then(() => {
            User.findByIdAndUpdate(req.params._id, { $pull: { friends: req.user._id } })
                .then(() => res.status(200).json({ message: "The friend was deleted!", friends: req.user.friends }))
                .catch(err => {
                    User.findByIdAndUpdate(req.user._id, { $push: { friends: req.params._id } })
                        .then(() => res.status(500).json({ message: "Error to delete the friend " + err }))
                })
        })
        .catch(err => res.status(500).json({ message: "Error to delete the friend " + err }))
});

router.post("/acceptfriend/:_id", function (req, res, next) {

    FriendConfirmation.findById(req.params._id)
        .then((confirmationFounded) => {
            User.findByIdAndUpdate(req.user._id, { $push: { friends: confirmationFounded.originUser }, $pull: { confirmations: req.params._id } })
                .then(() => {
                    User.findByIdAndUpdate(confirmationFounded.originUser, { $push: { friends: req.user._id } })
                        .then(() => {
                            FriendConfirmation.findByIdAndDelete(req.params._id)
                                .then(() => res.status(200).json({ message: "Friend accepted!", friends: req.user.friends }))
                                .catch(err => {
                                    User.findByIdAndUpdate(req.user._id, { $pull: { friends: confirmationFounded.originUser }, $push: { confirmations: req.params._id } })
                                        .then(() => {
                                            User.findByIdAndUpdate(confirmationFounded.originUser, { $pull: { friends: req.user._id } })
                                                .then(() => res.status(500).json({ message: "Error to accept the friend " + err }))
                                        })
                                        .catch(() => res.status(500).json({ message: "Error to accept the friend " + err }))
                                })
                        })
                        .catch(err => {
                            User.findByIdAndUpdate(req.user._id, { $pull: { friends: confirmationFounded.originUser }, $push: { confirmations: req.params._id } })
                                .then(() => res.status(500).json({ message: "Error to accept the friend " + err }))
                        })
                })
                .catch(err => res.status(500).json({ message: "Error to accept the friend " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error to accept the friend " + err }))
})

router.post("/declinefriend/:_id", function (req, res, next) {

    FriendConfirmation.findById(req.params._id)
        .then(() => {
            User.findByIdAndUpdate(req.user._id, { $pull: { confirmations: req.params._id } })
                .then(() => {
                    FriendConfirmation.findByIdAndDelete(req.params._id)
                        .then(() => res.status(200).json({ message: "Friend declined!" }))
                        .catch(err => res.status(500).json({ message: "Error to decline the friend " + err }))
                })
                .catch(err => res.status(500).json({ message: "Error to decline the friend " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error to decline the friend " + err }))
})

module.exports = router;
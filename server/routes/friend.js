const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const FriendConfirmation = require("../models/FriendConfirmation");
const Chat = require("../models/Chat");


router.post("/addfriend/:_id", function (req, res, next) {

    User.findById(req.params._id)
        .then((userFounded) => {
            const newFriendConfirmation = new FriendConfirmation({
                originUser: req.user._id,
                finalUser: req.params._id
            });
            newFriendConfirmation.save()
                .then((confirmation) => {
                    User.findByIdAndUpdate(userFounded._id, { $addToSet: { confirmations: newFriendConfirmation._id } }, { new: true })
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

    User.findByIdAndUpdate(req.user._id, { $pull: { friends: req.params._id } }, { new: true })
        .then(user1 => {
            User.findByIdAndUpdate(req.params._id, { $pull: { friends: req.user._id } }, { new: true })
                .then(user2 => {
                    let idChat = []
                    user1.friendchats.forEach(id_chat1 => {
                        user2.friendchats.forEach(id_chat2 => {

                            if (id_chat1.toString() === id_chat2.toString()) {
                                idChat.push(id_chat1)
                            }
                        })
                    })

                    Chat.findByIdAndDelete(idChat[0])
                        .then(chat => {
                            console.log(chat)
                            User.findByIdAndUpdate(req.user._id, { $pull: { friendchats: chat._id } }, { new: true })
                                .then(() => {
                                    User.findByIdAndUpdate(req.params._id, { $pull: { friendchats: chat._id } }, { new: true })
                                        .then(() => {
                                            res.status(200).json({ message: "The friend was deleted!", friends: req.user.friends })
                                        })
                                        .catch(err => res.status(500).json({ message: "Error to delete the friend " + err }))
                                })
                                .catch(err => res.status(500).json({ message: "Error to delete the friend " + err }))
                        })
                        .catch(err => res.status(500).json({ message: "Error to delete the friend " + err }))
                })
                .catch(err => {
                    User.findByIdAndUpdate(req.user._id, { $addToSet: { friends: req.params._id } }, { new: true })
                        .then(() => res.status(500).json({ message: "Error to delete the friend " + err }))
                })
        })
        .catch(err => res.status(500).json({ message: "Error to delete the friend " + err }))
});

router.post("/acceptfriend/:_id", function (req, res, next) {

    FriendConfirmation.findById(req.params._id)
        .then((confirmationFounded) => {
            User.findByIdAndUpdate(req.user._id, { $addToSet: { friends: confirmationFounded.originUser }, $pull: { confirmations: req.params._id } }, { new: true })
                .then(() => {
                    User.findByIdAndUpdate(confirmationFounded.originUser, { $addToSet: { friends: req.user._id } }, { new: true })
                        .then(() => {
                            FriendConfirmation.findByIdAndDelete(req.params._id)
                                .then(() => {
                                    const newChat = new Chat({
                                        users: [confirmationFounded.originUser, req.user._id],
                                        type: "Friend"
                                    })

                                    newChat.save()
                                        .then(chat => {
                                            User.findByIdAndUpdate(req.user._id, { $addToSet: { friendchats: chat._id } }, { new: true })
                                                .then(() => {
                                                    User.findByIdAndUpdate(confirmationFounded.originUser, { $addToSet: { friendchats: chat._id } }, { new: true })
                                                        .then(() => {
                                                            res.status(200).json({ message: "User accepted as friend!", friends: req.user.friends })
                                                        })
                                                        .catch(err => res.status(500).json({ message: "Error to accept the user as friend " + err }))
                                                })
                                                .catch(err => res.status(500).json({ message: "Error to accept the user as friend " + err }))
                                        })
                                        .catch(err => res.status(500).json({ message: "Error to accept the user as friend " + err }))
                                })
                                .catch(err => {
                                    User.findByIdAndUpdate(req.user._id, { $pull: { friends: confirmationFounded.originUser }, $addToSet: { confirmations: req.params._id } }, { new: true })
                                        .then(() => {
                                            User.findByIdAndUpdate(confirmationFounded.originUser, { $pull: { friends: req.user._id } })
                                                .then(() => res.status(500).json({ message: "Error to accept the user as friend " + err }))
                                        })
                                        .catch(() => res.status(500).json({ message: "Error to accept the user as friend " + err }))
                                })
                        })
                        .catch(err => {
                            User.findByIdAndUpdate(req.user._id, { $pull: { friends: confirmationFounded.originUser }, $addToSet: { confirmations: req.params._id } }, { new: true })
                                .then(() => res.status(500).json({ message: "Error to accept the user as friend " + err }))
                        })
                })
                .catch(err => res.status(500).json({ message: "Error to accept the user as friend " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error to accept the user as friend " + err }))
})

router.post("/declinefriend/:_id", function (req, res, next) {

    FriendConfirmation.findById(req.params._id)
        .then(() => {
            User.findByIdAndUpdate(req.user._id, { $pull: { confirmations: req.params._id } })
                .then(() => {
                    FriendConfirmation.findByIdAndDelete(req.params._id)
                        .then(() => res.status(200).json({ message: "User declined as friend!" }))
                        .catch(err => res.status(500).json({ message: "Error to decline the user as friend " + err }))
                })
                .catch(err => res.status(500).json({ message: "Error to decline the user as friend " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error to decline the user as friend " + err }))
})

router.get("/allusers", function (req, res, next) {

    User.find()
        .then(users => res.status(200).json({ users }))
        .catch(err => res.status(500).json({ message: "Error to show users " + err }))
})

router.get("/friends", function (req, res, next) {

    User.findById(req.user._id)
        .then(user => res.status(200).json({ friends: user.friends }))
        .catch(err => res.status(500).json({ message: "Error to show friends " + err }))
})

module.exports = router;
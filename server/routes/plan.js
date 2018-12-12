const express = require("express");
const passport = require('passport');
const router = express.Router();
const Plan = require("../models/Plan");
const Chat = require("../models/Chat");
const User = require("../models/User");

router.post("/newplan", function (req, res, next) {
    const { title, description, location, date, limit, hobby } = req.body;

    if (title === "") {
        res.status(500).json({ message: "Provide a title" })
        return
    }

    if (description === "") {
        res.status(500).json({ message: "Provide a description" })
        return
    }

    if (location === "") {
        res.status(500).json({ message: "Provide a location" })
        return
    }

    if (date === "") {
        res.status(500).json({ message: "Provide a date" })
        return
    }

    if (hobby === "") {
        res.status(500).json({ message: "Provide a hobby" })
        return
    }

    const newChat = new Chat({
        users: [req.user._id],
        messages: []
    })

    newChat.save()
        .then((chat) => {
            const newPlan = new Plan({
                owner: req.user._id,
                chat: chat._id,
                users: [req.user._id],
                title,
                description,
                location,
                date,
                limit,
                hobby,
                confirmations: []
            });


            User.findByIdAndUpdate(req.user._id, { $push: { planchats: chat._id } })
                .then(userfound => {
                    newPlan.save()
                        .then((plan) => {
                            User.findByIdAndUpdate(req.user._id, { $push: { plans: plan._id } })
                                .then(() => {
                                    res.status(200).json({ plan, message: "Plan create!" })
                                })
                                .catch(err => {
                                    Chat.findByIdAndDelete(chat._id)
                                        .then(() => {
                                            Plan.findByIdAndDelete(plan._id)
                                                .then(() => res.status(500).json({ message: "Error to create plan " + err })
                                                )
                                        })
                                })
                        })
                        .catch(err => {
                            Chat.findByIdAndDelete(chat._id)
                                .then(() => {
                                    User.findByIdAndUpdate(req.user._id, { $pull: { planchats: chat._id } })
                                        .then(() => {
                                            res.status(500).json({ message: "Error to create plan " + err })
                                        })
                                })
                        })
                })
                .catch(err => res.status(500).json({ message: "Error to create plan " + err }))
        })
        .catch(err => {
            Chat.findByIdAndDelete(chat._id)
                .then(() => res.status(500).json({ message: "Error to create plan " + err }))
        })
});

router.put('/editplan/:_id', (req, res, next) => {
    const { title, description, location, date, limit, hobby } = req.body;

    Plan.findById(req.params._id)
        .then((plan) => {

            planEdited = {}

            if (title === "") {
                planEdited.title = plan.title
            } else {
                planEdited.title = title
            }

            if (description === "") {
                planEdited.description = plan.description
            } else {
                planEdited.description = description
            }

            if (location === "") {
                planEdited.location = plan.location
            } else {
                planEdited.location = location
            }

            if (date === "") {
                planEdited.date = plan.date
            } else {
                planEdited.date = date
            }

            if (limit === "") {
                planEdited.limit = plan.limit
            } else {
                planEdited.limit = limit
            }

            if (hobby === "") {
                planEdited.hobby = plan.hobby
            } else {
                planEdited.hobby = hobby
            }

            Plan.findByIdAndUpdate(req.params._id, planEdited, { new: true })
                .then((planupdated) => {
                    res.status(200).json({ planupdated, message: "Plan edited!" })
                })
                .catch(err => res.status(500).json({ message: "Error to edit plan " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error to edit plan " + err }))
})

router.delete("/deleteplan/:_id", function (req, res, next) {
    Plan.findByIdAndDelete(req.params._id)
        .then((plan) => {
            Chat.findByIdAndDelete(plan.chat)
                .then((chat) => {
                    User.find()
                        .then(users => {
                            users.forEach(user => {
                                User.findByIdAndUpdate(user._id, { $pull: { planchats: chat._id } })
                                    .then(() => {
                                        User.findByIdAndUpdate(user._id, { $pull: { plans: plan._id } })
                                            .then(() => res.status(200).json({ message: "Plan deleted!" }))
                                    })
                            })
                        })
                })
        })
        .catch(err => res.status(500).json({ message: "Error to delete plan " + err }))
});

module.exports = router;

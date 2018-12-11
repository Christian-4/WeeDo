const express = require("express");
const passport = require('passport');
const router = express.Router();
const Plan = require("../models/Plan");
const Chat = require("../models/Chat");

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
        users: []
    })

    newChat.save()
        .then(() => {
            const newPlan = new Plan({
                // owner: req.user._id,
                owner: "5c0feba519ee7b1ea5d63046",
                chat: newChat._id,
                // users: [req.user._id],
                users: ["5c0feba519ee7b1ea5d63046"],
                title,
                description,
                location,
                date,
                limit,
                hobby,
                confirmations: []
            });

            newPlan.save()
                .then((plan) => {
                    res.status(200).json({ plan, message: "Plan create!" })
                })
                .catch(err => {
                    Chat.findByIdAndDelete(newChat.id)
                        .then(() => res.status(500).json({ message: "Error to create plan " + err }))
                })
        })
        .catch(err => {
            Chat.findByIdAndDelete(newChat.id)
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
                .catch(err => res.status(500).json({ message: "Error to edit plan" }))
        })
        .catch(err => res.status(500).json({ message: "Error to edit plan" }))
})

router.delete("/deleteplan/:_id", function (req, res, next) {
    Plan.findByIdAndDelete(req.params._id)
        .then(() => {
            res.status(200).json({ message: "Plan deleted!" })
        })
        .catch(err => res.status(500).json({ message: "Error to delete plan" }))
});

module.exports = router;

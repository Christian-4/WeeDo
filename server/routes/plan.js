const express = require("express");
const passport = require('passport');
const router = express.Router();
const Plan = require("../models/Plan");
const Chat = require("../models/Chat");
const User = require("../models/User");
const PlanConfirmation = require("../models/PlanConfirmation");

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
        type: "Plan"
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


            User.findByIdAndUpdate(req.user._id, { $addToSet: { planchats: chat._id } }, { new: true })
                .then(() => {
                    newPlan.save()
                        .then((plan) => {
                            User.findByIdAndUpdate(req.user._id, { $addToSet: { plans: plan._id } }, { new: true })
                                .then(() => {
                                    res.status(200).json({ plan, message: "Plan create!" })
                                })
                                .catch(err => {
                                    Chat.findByIdAndDelete(chat._id)
                                        .then(() => {
                                            User.findByIdAndUpdate(req.user._id, { $pull: { planchats: chat._id } }, { new: true })
                                                .then(() => {
                                                    Plan.findByIdAndDelete(plan._id)
                                                        .then(() => res.status(500).json({ message: "Error to create plan " + err }))
                                                })
                                        })
                                })
                        })
                        .catch(err => {
                            Chat.findByIdAndDelete(chat._id)
                                .then(() => {
                                    User.findByIdAndUpdate(req.user._id, { $pull: { planchats: chat._id } }, { new: true })
                                        .then(() => {
                                            res.status(500).json({ message: "Error to create plan " + err })
                                        })
                                })
                        })
                })
                .catch(err => {
                    Chat.findByIdAndDelete(chat._id)
                        .then(() => res.status(500).json({ message: "Error to create plan " + err }))
                })
        })
        .catch(err => {
            res.status(500).json({ message: "Error to create plan " + err })
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
                            let promises = [];
                            users.forEach(user => {
                                promises.push(User.findByIdAndUpdate(user._id, { $pull: { planchats: chat._id, plans: req.params._id } }, { new: true }))
                            })
                            Promise.all(promises)
                                .then(() => {
                                    PlanConfirmation.find({ plan: req.params._id })
                                        .then(foundplanconfirmations => {
                                            let promisesConfirmation = [];
                                            foundplanconfirmations.forEach(confirmation => {
                                                promisesConfirmation.push(PlanConfirmation.findByIdAndDelete(confirmation._id))
                                            })
                                            Promise.all(promisesConfirmation)
                                                .then(() => res.status(200).json({ message: "Plan deleted!" }))
                                                .catch(err => res.status(500).json({ message: "Error to delete plan " + err }))
                                        })
                                        .catch(err => res.status(500).json({ message: "Error to delete plan " + err }))

                                })
                        })
                        .catch(err => res.status(500).json({ message: "Error to delete plan " + err }))
                })
                .catch(err => res.status(500).json({ message: "Error to delete plan " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error to delete plan " + err }))
});

router.post("/planrequest/:_id", function (req, res, next) {

    Plan.findById(req.params._id)
        .then((planFounded) => {
            const newPlanConfirmation = new PlanConfirmation({
                plan: req.params._id,
                user: req.user._id
            });
            newPlanConfirmation.save()
                .then((confirmation) => {
                    Plan.findByIdAndUpdate(planFounded._id, { $addToSet: { confirmations: newPlanConfirmation._id } }, { new: true })
                        .then(() => {
                            res.status(200).json({ message: "Plan request send!" })
                        })
                        .catch(err => {
                            PlanConfirmation.findByIdAndDelete(confirmation._id)
                                .then(() => res.status(500).json({ message: "Error to send Plan request! " + err }))
                        })
                })
                .catch(err => res.status(500).json({ message: "Error to send Plan request! " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error to send Plan request! " + err }))
})

router.post("/acceptplan/:_id", function (req, res, next) {

    PlanConfirmation.findById(req.params._id)
        .then((confirmationFounded) => {
            Plan.findByIdAndUpdate(confirmationFounded.plan, { $addToSet: { users: confirmationFounded.user }, $pull: { confirmations: req.params._id } }, { new: true })
                .then((plan) => {
                    Chat.findByIdAndUpdate(plan.chat, { $addToSet: { users: confirmationFounded.user } }, { new: true })
                        .then((chat) => {
                            User.findByIdAndUpdate(confirmationFounded.user, { $addToSet: { plans: plan._id, planchats: chat._id } }, { new: true })
                                .then(() => {
                                    PlanConfirmation.findByIdAndDelete(req.params._id)
                                        .then(() => res.status(200).json({ message: "User accepted in your plan!" }))
                                        .catch(err => res.status(500).json({ message: "Error to accept the user in your plan " + err }))
                                })
                                .catch(err => res.status(500).json({ message: "Error to accept the user in your plan " + err }))
                        })
                        .catch(err => res.status(500).json({ message: "Error to accept the user in your plan " + err }))
                })
                .catch(err => res.status(500).json({ message: "Error to accept the user in your plan " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error to accept the user in your plan " + err }))
})

router.post("/declineplan/:_id", function (req, res, next) {

    PlanConfirmation.findById(req.params._id)
        .then((confirmationFounded) => {
            Plan.findByIdAndUpdate(confirmationFounded.plan, { $pull: { confirmations: req.params._id } }, { new: true })
                .then(() => {
                    PlanConfirmation.findByIdAndDelete(req.params._id)
                        .then(() => res.status(200).json({ message: "User declined in your plan" }))
                })
                .catch(err => res.status(500).json({ message: "Error to declined the user in your plan " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error to declined the user in your plan " + err }))
})

router.post("/addfriendtoplan", function (req, res, next) {
    const { planId, userId } = req.body

    Plan.findByIdAndUpdate(planId, { $addToSet: { users: userId } }, { new: true })
        .then(plan => {
            Chat.findByIdAndUpdate(plan.chat, { $addToSet: { users: userId } }, { new: true })
                .then(chat => {
                    User.findByIdAndUpdate(userId, { $addToSet: { plans: plan._id, planchats: chat._id } }, { new: true })
                        .then(() => res.status(200).json({ message: "Your friend was added to plan!" }))
                        .catch(err => res.status(500).json({ message: "Error to add your friend at plan " + err }))
                })
                .catch(err => res.status(500).json({ message: "Error to add your friend at plan " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error to add your friend at plan " + err }))
})

router.post("/leaveplan/:_id", function (req, res, next) {

    Plan.findByIdAndUpdate(req.params._id, { $pull: { users: req.user._id } }, { new: true })
        .then(plan => {
            Chat.findByIdAndUpdate(plan.chat, { $pull: { users: req.user._id } }, { new: true })
                .then(chat => {
                    User.findByIdAndUpdate(req.user._id, { $pull: { plans: plan._id, planchats: chat._id } }, { new: true })
                        .then(() => res.status(200).json({ message: "You left the plan!" }))
                        .catch(err => res.status(500).json({ message: "Error at leave the plan " + err }))
                })
                .catch(err => res.status(500).json({ message: "Error at leave the plan " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error at leave the plan " + err }))
})

router.post("/kickuserofplan", function (req, res, next) {
    const { planId, userId } = req.body

    Plan.findByIdAndUpdate(planId, { $pull: { users: userId } }, { new: true })
        .then(plan => {
            Chat.findByIdAndUpdate(plan.chat, { $pull: { users: userId } }, { new: true })
                .then(chat => {
                    User.findByIdAndUpdate(userId, { $pull: { plans: plan._id, planchats: chat._id } }, { new: true })
                        .then(() => res.status(200).json({ message: "The user was kicked of the plan!" }))
                        .catch(err => res.status(500).json({ message: "Error to kick the user " + err }))
                })
                .catch(err => res.status(500).json({ message: "Error to kick the user " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error to kick the user " + err }))
})

router.post("/addplanfav/:_id", function (req, res, next) {

    Plan.findById(req.params._id)
        .then(plan => {
            User.findByIdAndUpdate(req.user._id, { $addToSet: { favourites: plan._id } }, { new: true })
                .then(() => res.status(200).json({ message: "Plan added to favourites!" }))
                .catch(err => res.status(500).json({ message: "Error add plan to favourites " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error add plan to favourites " + err }))
})

router.delete("/delplanfav/:_id", function (req, res, next) {

    Plan.findById(req.params._id)
        .then(plan => {
            User.findByIdAndUpdate(req.user._id, { $pull: { favourites: plan._id } }, { new: true })
                .then(() => res.status(200).json({ message: "Plan delete to favourites!" }))
                .catch(err => res.status(500).json({ message: "Error delete plan to favourites " + err }))
        })
        .catch(err => res.status(500).json({ message: "Error delete plan to favourites " + err }))
})

router.get("/allplans", function (req, res, next) {

    Plan.find()
        .then(plans => res.status(200).json({ plans }))
        .catch(err => res.status(500).json({ message: "Error to show plans " + err }))
})

router.get("/plan/:_id", function (req, res, next) {

    Plan.findById(req.params._id)
        .then(plan => res.status(200).json({ plan }))
        .catch(err => res.status(500).json({ message: "Error to show the plan " + err }))
})

router.get("/planstogo", function (req, res, next) {

    User.findById(req.user._id)
        .then(user => res.status(200).json({ planstogo: user.plans }))
        .catch(err => res.status(500).json({ message: "Error to show plans " + err }))
})

router.get("/favouriteplans", function (req, res, next) {

    User.findById(req.user._id)
        .then(user => res.status(200).json({ favouriteplans: user.favourites }))
        .catch(err => res.status(500).json({ message: "Error to show plans " + err }))
})

router.get("/userplans", function (req, res, next) {

    Plan.find({ owner: req.user._id })
        .then(plans => res.status(200).json({ plans }))
        .catch(err => res.status(500).json({ message: "Error to show plans " + err }))
})



module.exports = router;

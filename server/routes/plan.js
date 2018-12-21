const express = require("express");
const passport = require("passport");
const router = express.Router();
const Plan = require("../models/Plan");
const Chat = require("../models/Chat");
const User = require("../models/User");
const PlanConfirmation = require("../models/PlanConfirmation");
const unsplash = require("unsplash-api");
const Twitter = require("twitter");
require("dotenv").config();
var clientId = process.env.UNPLASH_KEY;
unsplash.init(
  "f486d89baf41aa7c050f122f9472f3ddd0b391fbe026928e3f03d60db9562307"
);

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.post('statuses/update', { status: 'Nuevo plan creado!!' })
  .then(function (tweet) {
    console.log(tweet);
  })
  .catch(function (error) {
    throw error;
  })

router.get("/favicon.ico", (req, res, next) => {
  res.status(204).json({ message: "favicon not found" });
  return;
});

router.post("/newplan", function (req, res, next) {
  const { title, description, location, date, limit, hobby } = req.body;

  if (title === "") {
    res.status(500).json({ message: "Provide a title" });
    return;
  }

  if (description === "") {
    res.status(500).json({ message: "Provide a description" });
    return;
  }

  if (location === "") {
    res.status(500).json({ message: "Provide a location" });
    return;
  }

  if (date === "") {
    res.status(500).json({ message: "Provide a date" });
    return;
  }

  if (hobby === "") {
    res.status(500).json({ message: "Provide a hobby" });
    return;
  }

  const newChat = new Chat({
    users: [req.user._id],
    type: "Plan"
  });

  newChat
    .save()
    .then(chat => {
      let newPlan;
      console.log(hobby);
      unsplash.searchPhotos(hobby, [1, 2, 3], 2, 50, function (
        error,
        photos,
        link
      ) {
        let image_new = photos[0];
        if (image_new === undefined || image_new === null) {
          image_new = "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
        } else {
          image_new = photos[0].links.download
        }
        newPlan = new Plan({
          owner: req.user._id,
          chat: chat._id,
          users: [req.user._id],
          title,
          description,
          location,
          date,
          limit,
          hobby,
          image: image_new,
          confirmations: []
        });

        User.findByIdAndUpdate(
          req.user._id,
          { $addToSet: { planchats: chat._id } },
          { new: true }
        )
          .then(() => {
            newPlan
              .save()
              .then(plan => {
                Chat.findByIdAndUpdate(
                  chat._id,
                  { plan: plan._id },
                  { new: true }
                ).then(() => {
                  User.findByIdAndUpdate(
                    req.user._id,
                    { $addToSet: { plans: plan._id } },
                    { new: true }
                  )
                    .then(() => {
                      res.status(200).json({ plan, message: "Plan create!" });
                    })
                    .catch(err => {
                      Chat.findByIdAndDelete(chat._id).then(() => {
                        User.findByIdAndUpdate(
                          req.user._id,
                          { $pull: { planchats: chat._id } },
                          { new: true }
                        ).then(() => {
                          Plan.findByIdAndDelete(plan._id).then(() =>
                            res
                              .status(500)
                              .json({ message: "Error to create plan " + err })
                          );
                        });
                      });
                    });
                });
              })
              .catch(err => {
                Chat.findByIdAndDelete(chat._id).then(() => {
                  User.findByIdAndUpdate(
                    req.user._id,
                    { $pull: { planchats: chat._id } },
                    { new: true }
                  ).then(() => {
                    res
                      .status(500)
                      .json({ message: "Error to create plan " + err });
                  });
                });
              });
          })
          .catch(err => {
            Chat.findByIdAndDelete(chat._id).then(() =>
              res.status(500).json({ message: "Error to create plan " + err })
            );
          });
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Error to create plan " + err });
    });
});

router.put("/editplan/:_id", (req, res, next) => {
  const { title, description, location, date, limit, hobby } = req.body;

  Plan.findById(req.params._id)
    .then(plan => {
      planEdited = {};

      if (title === "") {
        planEdited.title = plan.title;
      } else {
        planEdited.title = title;
      }

      if (description === "") {
        planEdited.description = plan.description;
      } else {
        planEdited.description = description;
      }

      if (location === "") {
        planEdited.location = plan.location;
      } else {
        planEdited.location = location;
      }

      if (date === "") {
        planEdited.date = plan.date;
      } else {
        planEdited.date = date;
      }

      if (limit === "") {
        planEdited.limit = plan.limit;
      } else {
        planEdited.limit = limit;
      }

      if (hobby === "") {
        planEdited.hobby = plan.hobby;
      } else {
        planEdited.hobby = hobby;
      }

      Plan.findByIdAndUpdate(req.params._id, planEdited, { new: true })
        .then(planupdated => {
          res.status(200).json({ planupdated, message: "Plan edited!" });
        })
        .catch(err =>
          res.status(500).json({ message: "Error to edit plan " + err })
        );
    })
    .catch(err =>
      res.status(500).json({ message: "Error to edit plan " + err })
    );
});

router.delete("/deleteplan/:_id", function (req, res, next) {
  Plan.findByIdAndDelete(req.params._id)
    .then(plan => {
      Chat.findByIdAndDelete(plan.chat)
        .then(chat => {
          User.find()
            .then(users => {
              let promises = [];
              users.forEach(user => {
                promises.push(
                  User.findByIdAndUpdate(
                    user._id,
                    {
                      $pull: {
                        planchats: chat._id,
                        plans: req.params._id,
                        favourites: req.params._id
                      }
                    },
                    { new: true }
                  )
                );
              });
              Promise.all(promises).then(() => {
                PlanConfirmation.find({ plan: req.params._id })
                  .then(foundplanconfirmations => {
                    let promisesConfirmation = [];
                    foundplanconfirmations.forEach(confirmation => {
                      promisesConfirmation.push(
                        PlanConfirmation.findByIdAndDelete(confirmation._id)
                      );
                    });
                    Promise.all(promisesConfirmation)
                      .then(() =>
                        res.status(200).json({ message: "Plan deleted!" })
                      )
                      .catch(err =>
                        res
                          .status(500)
                          .json({ message: "Error to delete plan " + err })
                      );
                  })
                  .catch(err =>
                    res
                      .status(500)
                      .json({ message: "Error to delete plan " + err })
                  );
              });
            })
            .catch(err =>
              res.status(500).json({ message: "Error to delete plan " + err })
            );
        })
        .catch(err =>
          res.status(500).json({ message: "Error to delete plan " + err })
        );
    })
    .catch(err =>
      res.status(500).json({ message: "Error to delete plan " + err })
    );
});

router.post("/planrequest/:_id", function (req, res, next) {
  Plan.findById(req.params._id)
    .then(planFounded => {
      const newPlanConfirmation = new PlanConfirmation({
        plan: req.params._id,
        user: req.user._id
      });
      newPlanConfirmation
        .save()
        .then(confirmation => {
          Plan.findByIdAndUpdate(
            planFounded._id,
            { $addToSet: { confirmations: newPlanConfirmation._id } },
            { new: true }
          )
            .then(() => {
              res.status(200).json({ message: "Plan request send!" });
            })
            .catch(err => {
              PlanConfirmation.findByIdAndDelete(confirmation._id).then(() =>
                res
                  .status(500)
                  .json({ message: "Error to send Plan request! " + err })
              );
            });
        })
        .catch(err =>
          res
            .status(500)
            .json({ message: "Error to send Plan request! " + err })
        );
    })
    .catch(err =>
      res.status(500).json({ message: "Error to send Plan request! " + err })
    );
});

router.post("/acceptplan/:_id", function (req, res, next) {
  PlanConfirmation.findById(req.params._id)
    .then(confirmationFounded => {
      Plan.findByIdAndUpdate(
        confirmationFounded.plan,
        {
          $addToSet: { users: confirmationFounded.user },
          $pull: { confirmations: req.params._id }
        },
        { new: true }
      )
        .then(plan => {
          Chat.findByIdAndUpdate(
            plan.chat,
            { $addToSet: { users: confirmationFounded.user } },
            { new: true }
          )
            .then(chat => {
              User.findByIdAndUpdate(
                confirmationFounded.user,
                { $addToSet: { plans: plan._id, planchats: chat._id } },
                { new: true }
              )
                .then(() => {
                  PlanConfirmation.findByIdAndDelete(req.params._id)
                    .then(() =>
                      res
                        .status(200)
                        .json({ message: "User accepted in your plan!" })
                    )
                    .catch(err =>
                      res
                        .status(500)
                        .json({
                          message:
                            "Error to accept the user in your plan " + err
                        })
                    );
                })
                .catch(err =>
                  res
                    .status(500)
                    .json({
                      message: "Error to accept the user in your plan " + err
                    })
                );
            })
            .catch(err =>
              res
                .status(500)
                .json({
                  message: "Error to accept the user in your plan " + err
                })
            );
        })
        .catch(err =>
          res
            .status(500)
            .json({ message: "Error to accept the user in your plan " + err })
        );
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Error to accept the user in your plan " + err })
    );
});

router.post("/declineplan/:_id", function (req, res, next) {
  PlanConfirmation.findById(req.params._id)
    .then(confirmationFounded => {
      Plan.findByIdAndUpdate(
        confirmationFounded.plan,
        { $pull: { confirmations: req.params._id } },
        { new: true }
      )
        .then(() => {
          PlanConfirmation.findByIdAndDelete(req.params._id).then(() =>
            res.status(200).json({ message: "User declined in your plan" })
          );
        })
        .catch(err =>
          res
            .status(500)
            .json({ message: "Error to declined the user in your plan " + err })
        );
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Error to declined the user in your plan " + err })
    );
});

router.post("/addfriendtoplan", function (req, res, next) {
  const { planId, userId } = req.body;

  Plan.findByIdAndUpdate(
    planId,
    { $addToSet: { users: userId } },
    { new: true }
  )
    .then(plan => {
      Chat.findByIdAndUpdate(
        plan.chat,
        { $addToSet: { users: userId } },
        { new: true }
      )
        .then(chat => {
          User.findByIdAndUpdate(
            userId,
            { $addToSet: { plans: plan._id, planchats: chat._id } },
            { new: true }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: "Your friend was added to plan!" })
            )
            .catch(err =>
              res
                .status(500)
                .json({ message: "Error to add your friend at plan " + err })
            );
        })
        .catch(err =>
          res
            .status(500)
            .json({ message: "Error to add your friend at plan " + err })
        );
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Error to add your friend at plan " + err })
    );
});

router.post("/leaveplan/:_id", function (req, res, next) {
  Plan.findByIdAndUpdate(
    req.params._id,
    { $pull: { users: req.user._id } },
    { new: true }
  )
    .then(plan => {
      Chat.findByIdAndUpdate(
        plan.chat,
        { $pull: { users: req.user._id } },
        { new: true }
      )
        .then(chat => {
          User.findByIdAndUpdate(
            req.user._id,
            { $pull: { plans: plan._id, planchats: chat._id } },
            { new: true }
          )
            .then(() => res.status(200).json({ message: "You left the plan!" }))
            .catch(err =>
              res
                .status(500)
                .json({ message: "Error at leave the plan " + err })
            );
        })
        .catch(err =>
          res.status(500).json({ message: "Error at leave the plan " + err })
        );
    })
    .catch(err =>
      res.status(500).json({ message: "Error at leave the plan " + err })
    );
});

router.post("/kickuserofplan", function (req, res, next) {
  const { planId, userId } = req.body;

  Plan.findByIdAndUpdate(planId, { $pull: { users: userId } }, { new: true })
    .then(plan => {
      Chat.findByIdAndUpdate(
        plan.chat,
        { $pull: { users: userId } },
        { new: true }
      )
        .then(chat => {
          User.findByIdAndUpdate(
            userId,
            { $pull: { plans: plan._id, planchats: chat._id } },
            { new: true }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: "The user was kicked of the plan!" })
            )
            .catch(err =>
              res.status(500).json({ message: "Error to kick the user " + err })
            );
        })
        .catch(err =>
          res.status(500).json({ message: "Error to kick the user " + err })
        );
    })
    .catch(err =>
      res.status(500).json({ message: "Error to kick the user " + err })
    );
});

router.post("/addplanfav/:_id", function (req, res, next) {
  Plan.findById(req.params._id)
    .then(plan => {
      User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { favourites: plan._id } },
        { new: true }
      )
        .then(() =>
          res.status(200).json({ message: "Plan added to favourites!" })
        )
        .catch(err =>
          res
            .status(500)
            .json({ message: "Error add plan to favourites " + err })
        );
    })
    .catch(err =>
      res.status(500).json({ message: "Error add plan to favourites " + err })
    );
});

router.delete("/delplanfav/:_id", function (req, res, next) {
  Plan.findById(req.params._id)
    .then(plan => {
      User.findByIdAndUpdate(
        req.user._id,
        { $pull: { favourites: plan._id } },
        { new: true }
      )
        .then(() =>
          res.status(200).json({ message: "Plan delete to favourites!" })
        )
        .catch(err =>
          res
            .status(500)
            .json({ message: "Error delete plan to favourites " + err })
        );
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Error delete plan to favourites " + err })
    );
});

router.get("/allplans", function (req, res, next) {
  Plan.find()
    .sort("date")
    .populate("users")
    .populate("owner")
    .then(plans => res.status(200).json({ plans }))
    .catch(err =>
      res.status(500).json({ message: "Error to show plans " + err })
    );
});

router.get("/friendplans", function (req, res, next) {
  User.findById(req.user._id)
    .then(user => {
      let promises = [];
      user.friends.forEach(friend => {
        promises.push(
          Plan.find({ owner: friend._id })
            .populate("users")
            .populate("owner")
        );
      });
      Promise.all(promises).then(plans => {
        let newPlans = [];
        plans.forEach(plan => {
          plan.forEach(plan2 => {
            newPlans.push(plan2);
          });
        });
        console.log();
        res.status(200).json({ plans: newPlans });
      });
    })
    .catch(err =>
      res.status(500).json({ message: "Error to show plans " + err })
    );
});

router.get("/plan/:_id", function (req, res, next) {
  Plan.findById(req.params._id)
    .populate("users")
    .populate("owner")
    .then(plan => res.status(200).json({ plan }))
    .catch(err =>
      res.status(500).json({ message: "Error to show the plan " + err })
    );
});

router.get("/planstogo", function (req, res, next) {
  User.findById(req.user._id).then(user => {
    Plan.find({ users: { $in: [user._id] } })
      .sort("date")
      .populate("users")
      .populate("owner")
      .then(plans => res.status(200).json({ planstogo: plans }))
      .catch(err =>
        res.status(500).json({ message: "Error to show plans " + err })
      );
  });
});

router.get("/favouriteplans", function (req, res, next) {
  let promises = [];
  User.findById(req.user._id)
    .then(user => {
      user.favourites.forEach(function (plan) {
        promises.push(
          Plan.findById(plan._id)
            .populate("users")
            .populate("owner")
        );
      });
      Promise.all(promises).then(plans => {
        res.status(200).json({ favouriteplans: plans });
      });
    })
    .catch(err =>
      res.status(500).json({ message: "Error to show plans " + err })
    );
});

router.get("/userplans", function (req, res, next) {
  Plan.find({ owner: req.user._id })
    .sort("date")
    .populate("users")
    .then(plans => res.status(200).json({ plans }))
    .catch(err =>
      res.status(500).json({ message: "Error to show plans " + err })
    );
});

router.get("/plannotifications/:_id", function (req, res, next) {
  PlanConfirmation.find({ plan: req.params._id })
    .populate("user")
    .then(confirmations => res.status(200).json({ confirmations }))
    .catch(err =>
      res.status(500).json({ message: "Error to show confirmations " + err })
    );
});

// router.get("/plannotifications", function (req, res, next) {

//     Plan.find({ owner: req.user._id })
//         .then(plans => {
//             let promises = []
//             plans.forEach(plan => {
//                 promises.push(PlanConfirmation.find({ plan }).populate("user").populate("plan"))
//             })
//             Promise.all(promises)
//                 .then(confirmations => res.status(200).json({ confirmations }))
//         })
//     PlanConfirmation.find
//         .catch(err => res.status(500).json({ message: "Error to show confirmations " + err }))
// })

module.exports = router;

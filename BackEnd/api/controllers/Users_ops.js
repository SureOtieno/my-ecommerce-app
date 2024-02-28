const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const User = require("../models/user");

exports.user_signup = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      //console.log(user);
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email already exists.",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                // res.json({
                //   message: "User created",
                //   user: result,
                // });
                res.sendFile(path.join(__dirname, "index.html"));
              })
              .catch((err) => {
                res.json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res) => {
  User.find({ email: req.body.email, username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "User doesn't exist",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            res.status(401).json({
              message: "Authentication failed.",
            });
          } else if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
              },
              "process.env.JWT_KEYS",
              {
                expiresIn: "1h",
              }
            );
            return res.json({
              message: "Authentication successful.",
              token: token,
            });
          }
        });
      }
    });
};

exports.user_delete = (req, res) => {
  User.findByIdAndDelete({ _id: req.params.userId })
    .exec()
    .then((result) => {
      if (result) {
        res.json({
          message: "User deleted",
          result,
        });
      } else {
        res.json({
          message: "UserId does not exist.",
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Invalid User ID",
        error: err,
      });
    });
};

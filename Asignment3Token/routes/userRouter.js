const express = require("express");
const userController = require("../controller/userController");
const userRouter = express.Router();
const bodyParser = require("body-parser");
const { notAuthenticated } = require("../config/notAuth");
var { ensureAuthenticated } = require("../config/auth");
var { cookieNotAuthenticated } = require("../config/notAuthenticated");
var { cookieAuthenticated } = require("../config/authenticated");

userRouter
  .route("/")
  .get(cookieNotAuthenticated, userController.login)
  .post(cookieNotAuthenticated, userController.signIn);

// userRouter
//   .route("/")
//   .get(notAuthenticated, userController.login)
//   .post(passport.authenticate("local"), (req, res) => {
//     var token = authenticate.getToken({ _id: req.user._id });
//     console.log(token);
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "application/json");
//     res.json({
//       success: true,
//       token: token,
//       status: "You are successfully logged in!",
//     });
//   });

userRouter.route("/logout").get(cookieAuthenticated, userController.signOut);

userRouter
  .route("/register")
  .get(cookieNotAuthenticated, userController.index)
  .post(cookieNotAuthenticated, userController.register);

userRouter.route("/account").get(cookieAuthenticated, userController.account);

userRouter
  .route("/account/edit/:accountID")
  .get(cookieAuthenticated, userController.editAccount)
  .post(cookieAuthenticated, userController.updateAccount);

userRouter
  .route("/account/listUser")
  .get(cookieAuthenticated, userController.listUser);

module.exports = userRouter;
// router.use(bodyParser.json());

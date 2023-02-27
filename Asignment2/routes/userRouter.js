const express = require("express");
const userController = require("../controller/userController");
const userRouter = express.Router();
const bodyParser = require("body-parser");
const { notAuthenticated } = require("../config/notAuth");
var { ensureAuthenticated } = require("../config/auth");
const passport = require("passport");

userRouter
  .route("/")
  .get(notAuthenticated, userController.login)
  .post(notAuthenticated, userController.signIn);

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

userRouter.route("/logout").get(userController.signOut);

userRouter
  .route("/register")
  .get(notAuthenticated, userController.index)
  .post(notAuthenticated, userController.register);

userRouter.route("/account").get(ensureAuthenticated, userController.account);

userRouter
  .route("/account/edit/:accountID")
  .get(ensureAuthenticated, userController.editAccount)
  .post(ensureAuthenticated, userController.updateAccount);

userRouter
  .route("/account/listUser")
  .get(ensureAuthenticated, userController.listUser);

module.exports = userRouter;
// router.use(bodyParser.json());

const express = require("express");
const playerRouter = express.Router();
const playerController = require("../controller/playerController");
const { ensureAuthenticated } = require("../config/auth");

playerRouter
  .route("/")
  .get(playerController.index)
  .post(ensureAuthenticated, playerController.create);

playerRouter
  .route("/edit/:playerID")
  .get(ensureAuthenticated, playerController.edit)
  .post(ensureAuthenticated, playerController.update);

playerRouter
  .route("/delete/:playerID")
  .get(ensureAuthenticated, playerController.delete);

playerRouter.route("/details/:playerID").get(playerController.details);

module.exports = playerRouter;

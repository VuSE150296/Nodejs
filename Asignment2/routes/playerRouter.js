const express = require("express");
const playerRouter = express.Router();
const playerController = require("../controller/playerController");

playerRouter
  .route("/")
  .get(playerController.index)
  .post(playerController.create);

playerRouter
  .route("/edit/:playerID")
  .get(playerController.edit)
  .post(playerController.update);

playerRouter.route("/delete/:playerID").get(playerController.delete);

playerRouter.route("/details/:playerID").get(playerController.details);

module.exports = playerRouter;

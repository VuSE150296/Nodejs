const express = require("express");
const playerRouter = express.Router();
const playerController = require("../controllers/playerController");

playerRouter
  .route("/")
  .get(playerController.index)
  .post(playerController.create);

module.exports = playerRouter;

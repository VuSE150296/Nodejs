const express = require("express");
const nationRouter = express.Router();
const nationController = require("../controller/nationController");
const { ensureAuthenticated } = require("../config/auth");

nationRouter
  .route("/")
  .get(nationController.index)
  .post(ensureAuthenticated, nationController.create);

nationRouter
  .route("/edit/:nationID")
  .get(ensureAuthenticated, nationController.edit)
  .post(ensureAuthenticated, nationController.update);

nationRouter
  .route("/delete/:nationID")
  .get(ensureAuthenticated, nationController.delete);

module.exports = nationRouter;

const express = require("express");
const nationRouter = express.Router();
const nationController = require("../controller/nationController");

nationRouter
  .route("/")
  .get(nationController.index)
  .post(nationController.create);

nationRouter
  .route("/edit/:nationID")
  .get(nationController.edit)
  .post(nationController.update);

nationRouter.route("/delete/:nationID").get(nationController.delete);

module.exports = nationRouter;

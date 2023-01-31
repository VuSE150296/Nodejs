const express = require("express");
const bodyParser = require("body-parser");

const playerRouter = express.Router();
playerRouter.use(bodyParser.json());

playerRouter
  .route("/")
  .all((req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/pain" });
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all players to you!");
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not support on /nations");
  })
  .put((req, res, next) => {
    res.write("Updating the nation: " + req.params.nationId + "\n");
    res.statusCode = 403;
    res.end("PUT operation not support on /nations");
  })
  .delete((req, res, next) => {
    res.end("Deleting all players: ");
  });

playerRouter
  .route("/:playerId")
  .all((req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/pain" });
    next();
  })
  .get((req, res, next) => {
    res.end(
      "Will send details of the players: " + req.params.playerId + " to you!"
    );
  })
  .post((req, res, next) => {
    res.end(
      "Will add the player: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.write("Updating the nation: " + req.params.playerId + "\n");
    res.end(
      "Will update the player: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .delete((req, res, next) => {
    res.end("Deleting player: " + req.params.playerId);
  });

module.exports = playerRouter;

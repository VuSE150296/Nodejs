const Player = require("../models/player");
const Nation = require("../models/nation");

var jwt = require("jsonwebtoken");
const config = require("../config/config");

let clubData = [
  { id: "1", name: "Arsenal" },
  { id: "2", name: "Manchester United" },
  { id: "3", name: "Chelsea" },
  { id: "4", name: "Manchester City" },
  { id: "5", name: "PSG" },
  { id: "6", name: "Inter Milan" },
  { id: "7", name: "Real Madrid" },
  { id: "8", name: "Barcelona" },
];

let isCaptain = [
  { id: "1", name: "Captain" },
  { id: "2", name: "Not Captain" },
];

let positionList = [
  { id: "1", name: "GK" },
  { id: "2", name: "RB" },
  { id: "3", name: "CB" },
  { id: "4", name: "LB" },
  { id: "5", name: "CDM" },
  { id: "6", name: "CM" },
  { id: "7", name: "CAM" },
  { id: "8", name: "RW" },
  { id: "9", name: "LW" },
  { id: "10", name: "ST" },
];

let nations = [];
function getNation() {
  Nation.find().then((nation) => {
    return nations.push(nation);
  });
}

const errMessage = "Player name already exist!";
const authMessage = "Only Admin can do this action!";

class playerController {
  index(req, res, next) {
    let nations;
    Nation.find().then((nation) => {
      return (nations = nation);
    });
    var token = req.cookies.accessToken;
    if (token) {
      var data = jwt.verify(req.cookies.accessToken, config.secretKey);
      if (data.user.isAdmin) {
        Player.find({})
          .then((player) => {
            res.render("player", {
              title: "The list of Players",
              player: player,
              clubList: clubData,
              isCaptainList: isCaptain,
              message: "",
              checkAdmin: true,
              nations: nations,
              positions: positionList,
            });
          })
          .catch(next);
      }
    }
    Player.find({})
      .then((player) => {
        res.render("player", {
          title: "The list of Players",
          player: player,
          clubList: clubData,
          isCaptainList: isCaptain,
          message: "",
          checkAdmin: false,
          nations: nations,
          positions: positionList,
        });
      })
      .catch(next);
  }

  create(req, res, next) {
    const newPlayer = new Player(req.body);
    var data = jwt.verify(req.cookies.accessToken, config.secretKey);
    if (data.user.isAdmin) {
      getNation();
      newPlayer
        .save()
        .then(() => {
          res.redirect("/players");
        })
        .catch(() => {
          Player.find({})
            .then((player) => {
              res.render("player", {
                title: "The list of Players",
                player: player,
                clubList: clubData,
                isCaptainList: isCaptain,
                error: "Name already exist!",
                checkAdmin: true,
                nations: nations,
                positions: positionList,
              });
            })
            .catch(next);
        });
    }
  }

  edit(req, res, next) {
    var data = jwt.verify(req.cookies.accessToken, config.secretKey);
    if (data.user.isAdmin) {
      getNation();
      const playerID = req.params.playerID;
      Player.findById(playerID)
        .then((player) => {
          res.render("editPlayer", {
            title: "The detail of Player",
            player: player,
            clubList: clubData,
            isCaptainList: isCaptain,
            message: "",
            nations: nations,
            positions: positionList,
          });
        })
        .catch(next);
    } else {
      req.flash("error_msg", authMessage);
      res.redirect("/players");
    }
  }
  update(req, res, next) {
    var data = jwt.verify(req.cookies.accessToken, config.secretKey);
    if (data.user.isAdmin) {
      getNation();
      const playerID = req.params.playerID;
      Player.updateOne({ _id: playerID }, req.body)
        .then(() => {
          res.redirect("/players");
        })
        .catch(() =>
          Player.findById(playerID).then((player) => {
            res.render("editPlayer", {
              title: "The detail of Player",
              player: player,
              clubList: clubData,
              isCaptainList: isCaptain,
              message: errMessage,
              nations: nations,
              positions: positionList,
            });
          })
        );
    } else {
      req.flash("error_msg", authMessage);
      res.redirect("/players");
    }
  }

  delete(req, res, next) {
    var data = jwt.verify(req.cookies.accessToken, config.secretKey);
    if (data.user.isAdmin) {
      const playerID = req.params.playerID;
      Player.findByIdAndDelete({ _id: playerID })
        .then(() => {
          res.redirect("/players");
        })
        .catch(next);
    } else {
      req.flash("error_msg", authMessage);
      res.redirect("/players");
    }
  }

  details(req, res, next) {
    const playerID = req.params.playerID;
    Player.findById(playerID)
      .then((player) => {
        res.render("detailOfPlayer", {
          title: `Details of ${player.name}`,
          player: player,
        });
      })
      .catch(next);
  }
}

module.exports = new playerController();

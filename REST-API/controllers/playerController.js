const Players = require("../models/player");

class playerController {
  index(req, res, next) {
    Players.find({})
      .then((players) => {
        res.render("player", {
          title: "The list of Players",
          players: players,
        });
      })
      .catch(next);
    console.log(req.body);
  }
  create(req, res, next) {
    const player = new Players(req.body);
    player
      .save()
      .then(() => res.redirect("/players"))
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = new playerController();

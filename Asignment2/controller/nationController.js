const Nation = require("../models/nation");

const errMessage = "Name already exist!";

class nationController {
  index(req, res, next) {
    Nation.find({})
      .then((nation) => {
        res.render("nation", {
          title: "The list of Nations",
          nation: nation,
          message: "",
        });
      })
      .catch(next);
  }
  create(req, res, next) {
    const nation = new Nation(req.body);
    const nationName = req.body.name;
    nation
      .save()
      .then(() => {
        res.redirect("/nations");
      })
      .catch(() => {
        Nation.find({ name: nationName }).then((nation) => {
          res.render("nation", {
            title: "The list of Nations",
            nation: nation,
            message: errMessage,
          });
        });
      });
  }

  edit(req, res, next) {
    const nationID = req.params.nationID;
    Nation.findById(nationID)
      .then((nation) => {
        res.render("editNation", {
          title: "The list of Nations",
          nation: nation,
          message: "",
        });
      })
      .catch(next);
  }
  update(req, res, next) {
    const nationID = req.params.nationID;
    Nation.updateOne({ _id: nationID }, req.body)
      .then(() => {
        res.redirect("/nations");
      })
      .catch(() => {
        Nation.findById(nationID).then((nation) => {
          res.render("editNation", {
            title: "The list of Nations",
            nation: nation,
            message: errMessage,
          });
        });
      });
  }

  delete(req, res, next) {
    const nationID = req.params.nationID;
    Nation.findByIdAndDelete({ _id: nationID })
      .then(() => {
        res.redirect("/nations");
      })
      .catch(next);
  }
}

module.exports = new nationController();

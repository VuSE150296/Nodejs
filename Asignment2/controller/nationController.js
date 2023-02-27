const Nation = require("../models/nation");
var checkIsAdmin = require("../config/checkIsAdmin");

const errMessage = "Nation already exist!";
const authMessage = "Only Admin can do this action!";

class nationController {
  index(req, res, next) {
    Nation.find({})
      .then((nation) => {
        res.render("nation", {
          title: "The list of Nations",
          nation: nation,
          message: "",
          authMessage: "",
        });
      })
      .catch(next);
  }
  create(req, res, next) {
    const nation = new Nation(req.body);
    const nationName = req.body.name;
    if (checkIsAdmin(req.user.isAdmin)) {
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
    } else {
      req.flash("error_msg", authMessage);
      res.redirect("/nations");
    }
  }

  edit(req, res, next) {
    if (checkIsAdmin(req.user.isAdmin)) {
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
    } else {
      req.flash("error_msg", authMessage);
      res.redirect("/nations");
    }
  }
  update(req, res, next) {
    if (checkIsAdmin(req.user.isAdmin)) {
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
    } else {
      req.flash("error_msg", authMessage);
      res.redirect("/nations");
    }
  }

  delete(req, res, next) {
    if (checkIsAdmin(req.user.isAdmin)) {
      const nationID = req.params.nationID;
      Nation.findByIdAndDelete({ _id: nationID })
        .then(() => {
          res.redirect("/nations");
        })
        .catch(next);
    } else {
      req.flash("error_msg", authMessage);
      res.redirect("/nations");
    }
  }
}

module.exports = new nationController();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var FileStore = require("session-file-store")(session);
const passport = require("passport");
const flash = require("connect-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRouter");
var playerRouter = require("./routes/playerRouter");
var errorRouter = require("./routes/error");
const { default: mongoose } = require("mongoose");
const nationRouter = require("./routes/nationRouter");

const url = "mongodb://localhost:27017/worldcup2022";
const connect = mongoose.connect(url);

var app = express();
//get function from ./config/passport
require("./config/passport")(passport);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser("12345-67890"));
app.use(
  session({
    name: "session-id",
    secret: "12345-67890-09876-54321",
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

// function auth(req, res, next) {
//   if (!req.signedCookies.user) {
//     var authHeader = req.headers.authorization;
//     if (!authHeader) {
//       var err = new Error("You are not authenticated!");
//       res.setHeader("WWW-Authenticate", "Basic");
//       // res.render("login");
//       err.status = 401;
//       next(err);
//       return;
//     }
//     var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
//       .toString()
//       .split(":");
//     var user = auth[0];
//     var pass = auth[1];
//     if (user == "admin" && pass == "password") {
//       res.cookie("user", "admin", { signed: true });
//       next();
//     } else {
//       var err = new Error("You are not authenticated!");
//       res.setHeader("WWW-Authenticate", "Basic");
//       err.status = 401;
//       next(err);
//     }
//   } else {
//     if (req.signedCookies.user == "admin") {
//       next();
//     } else {
//       var err = new Error("You are not authenticated!");
//       err.status = 401;
//       next(err);
//     }
//   }
// }
// app.use(auth);

app.use("/", indexRouter);
app.use("/players", playerRouter);
app.use("/nations", nationRouter);
app.use("/error", errorRouter);
app.use("/auth", usersRouter);

connect.then(
  (db) => {
    console.log("Connected correctly to server!");
  },
  (err) => {
    console.log(err);
  }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;

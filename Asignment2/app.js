var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var playerRouter = require("./routes/playerRouter");
var errorRouter = require("./routes/error");
const { default: mongoose } = require("mongoose");
const nationRouter = require("./routes/nationRouter");

const url = "mongodb://localhost:27017/worldcup2022";
const connect = mongoose.connect(url);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/players", playerRouter);
app.use("/nations", nationRouter);
app.use("/error", errorRouter);

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
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const nationRouter = require("./router/nationRouter");
const playerRouter = require("./router/playersRouter");

const hostname = "localhost";
const port = 5000;

const app = express();
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use("/nations", nationRouter);
app.use("/players", playerRouter);

// app.all("/nations", (req, res, next) => {
//   res.writeHead(200, { "Content-Type": "text/pain" });
//   next();
// });
// app.get("/nations", (req, res, next) => {
//   res.end("Will send all the nations to you!");
// });
// app.post("/nations", (req, res, next) => {
//   res.end(
//     "Will add the nation: " +
//       req.body.name +.
//       " with details: " +
//       req.body.description
//   );
// });
// app.put("/nations", (req, res, next) => {
//   res.statusCode = 403;
//   res.end("PUT operation not support on /nations");
// });
// app.delete("/nations", (req, res, next) => {
//   res.end("Deleting all nations");
// });
// app.get("/nations/:nationId", (req, res, next) => {
//   res.end(
//     "Will send details of the nation: " + req.params.nationId + " to you!"
//   );
// });
// app.put("/nations/:nationId", (req, res, next) => {
//   res.write("Updating the nation: " + req.params.nationId + "\n");
//   res.end(
//     "Will update the nation: " +
//       req.body.name +
//       " with details: " +
//       req.body.description
//   );
// });
// app.delete("/nations/:nationId", (req, res, next) => {
//   res.end("Deleting nation: " + req.body.nationId);
// });

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const express = require("express");
const scraper = require("./scraper");
const app = express();
const process = require("process");

function stop() {
  console.log("gracefully shutting down the server...");
  process.exit();
}

process.on("SIGINT", stop); // Ctrl+C
process.on("SIGTERM", stop); // docker stop

//Home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//API route
app.get("/api/search", (req, res) => {
  scraper
    .youtube(req.query.q, req.query.key, req.query.pageToken)
    .then((x) => res.json(x))
    .catch((e) => res.send(e));
});

app.listen(process.env.PORT || 8080, function () {
  console.log("Listening on port 8080");
});

module.exports = app;

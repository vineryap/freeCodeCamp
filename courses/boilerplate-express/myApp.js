const bodyParser = require("body-parser");
var express = require("express");
const {
  logger,
  getTime,
  echoHandler,
  nameQueryHandler,
  namePostHandler,
} = require("./middlewares");
var app = express();

// task 1
// console.log('Hello World');

// task 2
// app.get("/", function(req, res) {
//   res.send('Hello Express');
// });

// task 11
app.use(bodyParser.urlencoded({ extended: true }));

// task 7
app.use(logger);

// task 4
app.use("/public", express.static(__dirname + "/public"));

// task 3
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// task 5
app.get("/json", function (req, res) {
  // const resJson = { "message": "Hello json" }

  // task 6
  const { MESSAGE_STYLE } = process.env;
  const resJson =
    MESSAGE_STYLE === "uppercase"
      ? { message: "HELLO JSON" }
      : { message: "Hello json" };

  res.json(resJson);
});

// task 8
app.get("/now", getTime, (req, res) => {
  res.json({ time: req.time });
});

// task 9
app.get("/:word/echo", echoHandler);

// task 10
app.get("/name", nameQueryHandler);

// task 12
app.post("/name", namePostHandler);

module.exports = app;

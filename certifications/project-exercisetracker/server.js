const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { makeRandomId, isValidDateFormat } = require("./utils");

const app = express();
require("dotenv").config();

const users = [];
const logs = [];
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/users/", (req, res) => {
  res.json(users);
});

app.get("/api/users/:_id/:from?/:to?/:limit?/logs", (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;
  const user = users.find((user) => user._id === _id);

  if (user) {
    const fromDate =
      from && isValidDateFormat(from) ? new Date(from).getTime() : null;
    const toDate = to ** isValidDateFormat(to) ? new Date(to).getTime() : null;
    let userLog = logs.find((log) => log.id === _id).logs;

    if (fromDate || toDate) {
      userLog = userLog.filter((log) => {
        const logDate = new Date(log.date).getTime();
        if (from && to) {
          if (logDate >= fromDate && logDate <= toDate) return log;
        }

        if (from) {
          if (logDate >= fromDate) return log;
        }

        if (to) {
          if (logDate <= toDate) return log;
        }

        return log;
      });
    }

    if (limit && userLog.length > parseInt(limit)) {
      userLog = userLog.slice(0, parseInt(limit));
    }

    const data = {
      ...user,
      count: userLog.length,
      log: userLog,
    };
    return res.json(data);
  }
  res.json({ error: "Not found." });
});

app.post("/api/users", urlencodedParser, (req, res) => {
  const { username } = req.body;

  let id = makeRandomId(20);

  while (users.find((user) => user._id === id)) {
    id = makeRandomId(20);
  }

  const newUser = {
    username,
    _id: id,
  };

  logs.push({ id, logs: [] });

  users.push(newUser);
  res.json(newUser);
});

app.post("/api/users/:_id/exercises", urlencodedParser, (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  const user = users.find((user) => user._id === _id);

  if (user) {
    const newLog = {
      description,
      duration: parseInt(duration),
      date: date
        ? new Date(date).toDateString()
        : new Date(Date.now()).toDateString(),
    };

    const userLog = logs.find((log) => log.id === _id);

    userLog.logs.push(newLog);

    const data = {
      username: user.username,
      description,
      ...newLog,
      _id,
    };
    return res.json(data);
  }
  res.json({ error: "Not found." });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

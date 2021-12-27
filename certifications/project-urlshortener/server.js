require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dns = require("dns");
const app = express();
const { makeRandomId, isValidURL } = require("./utils");

const urlencodedParser = bodyParser.urlencoded({ extended: true });

let uids = {};

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/shorturl/:uid", (req, res) => {
  const { uid } = req.params;
  console.log(uids);
  if (uid in uids) res.status(301).redirect(uids[uid].url);
  res.status(400).send("Bad Request");
});

app.post("/api/shorturl", urlencodedParser, (req, res) => {
  const { url } = req.body;
  if (!isValidURL(url)) res.json({ error: "invalid url" });

  let uid = makeRandomId(5);

  while (!uid in uids) {
    uid = makeRandomId(5);
  }

  uids[uid] = { url };
  res.json({
    original_url: url,
    short_url: uid,
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

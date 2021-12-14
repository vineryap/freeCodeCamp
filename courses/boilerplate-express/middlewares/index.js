const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);

  if (Object.keys(req.body).length) {
    console.log(`Body: ${JSON.stringify(req.body)}`);
  }

  if (Object.keys(req.params).length) {
    console.log(`Params: ${JSON.stringify(req.params)}`);
  }

  if (Object.keys(req.query).length) {
    console.log(`Query: ${JSON.stringify(req.query)}`);
  }

  next();
};

const getTime = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

const echoHandler = (req, res, next) => {
  const { word } = req.params;
  res.json({ echo: word });
};

const nameQueryHandler = (req, res, next) => {
  const { first, last } = req.query;
  const name = `${first ? first : ""} ${last ? last : ""}`;
  res.json({ name });
};

const namePostHandler = (req, res, next) => {
  const { first, last } = req.body;
  const name = `${first} ${last}`;
  res.json({ name });
};

module.exports = {
  logger,
  getTime,
  echoHandler,
  nameQueryHandler,
  namePostHandler,
};

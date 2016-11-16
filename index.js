const path = require('path');
const ip = require('ip');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.disable('x-powered-by');

require('./schema')(app);

const host = ip.address();
const port = process.env.PORT || 8888;

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.info(`==> 🌎  Listening at http://${host}:${port}`);
});
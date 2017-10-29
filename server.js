const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

const port = 5000;
let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.options('*', cors());

app.use('/status', (req, res) => {
  res.send('ok');
});

app.listen(port, () => {
  console.log(`running on port: ${port}`);
});

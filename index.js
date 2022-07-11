const express = require('express')
const cors = require('cors')
const https = require('https');
const fs = require('fs')
let history = require('connect-history-api-fallback');
const path = require('path')

const app = express()
app.use(cors())

const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
};

app.use(history({ index: '/' }))

app.use('/public', express.static(path.join(__dirname, "/public/")));

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '/public/') });
});

https.createServer(options, app).listen(3333);
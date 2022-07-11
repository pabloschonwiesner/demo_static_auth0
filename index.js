const express = require('express')
const cors = require('cors')
const https = require('https');
const fs = require('fs')
let history = require('connect-history-api-fallback');
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
app.use(cors())

const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
};

app.use(history({ index: '/' }))
app.set('port', process.env.PORT)

app.use('/public', express.static(path.join(__dirname, "/public/")));

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '/public/') });
});

https.createServer(options, app).listen(process.env.PORT);
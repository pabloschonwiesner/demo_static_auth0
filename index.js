const express = require('express')
const cors = require('cors')
let history = require('connect-history-api-fallback');
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
app.use(cors())

app.use(history({ index: '/' }))
app.set('port', process.env.PORT)

app.use('/public', express.static(path.join(__dirname, "/public/")));

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '/public/') });
});

app.listen(process.env.PORT);
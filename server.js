const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser  = require('cookie-parser');

const app = express();

require("./mongo");
require('./model/slots');
require('./model/appointments');


let appointment = require('./routes/supportapi');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Welcome To Book Appointments')
})

app.use("/api", appointment);

const server = app.listen(port, function (err) {
  if(!err) {
    console.log('✓ server running on port:'+ port);
    console.log('x Press CTRL-C to stop\n');
  }
});

module.exports = app;

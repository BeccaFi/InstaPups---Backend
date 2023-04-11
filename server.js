const express = require('express');
const server = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')

const { AuthenticationRoute } = require('./Routes/Authenticationroutes');

server.use('/auth', AuthenticationRoute);


server.listen(5050);

exports.server = server;
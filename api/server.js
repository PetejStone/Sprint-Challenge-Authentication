const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dadJokes = require('../config/routes.js')
const configureRoutes = require('../config/routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/jokes', dadJokes)
configureRoutes(server);

module.exports = server;

'use strict'

require('dotenv').config();

const Hapi = require('@hapi/hapi');
const config = require('config')

const routes = require('./routes')

const server = Hapi.server({
  port: config.get('app.port'),
  host: 'localhost',
  routes: { cors:
    {
      origin: ["*"]
    }
}
});

// attach routes here
server.route(routes)

// export modules
module.exports = server

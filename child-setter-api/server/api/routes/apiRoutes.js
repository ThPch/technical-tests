'use strict'

const apiCtrl = require('../controllers/apiCtrl')

const API_PATH = '/api'

const routes = []

// POST /child-setter
routes.push({
  path: API_PATH + '/child-setter',
  method: 'POST',
  handler: apiCtrl.childSetterCtrl
})


// GET /getReposByTagCtrl
routes.push({
  path: API_PATH + '/',
  method: 'GET',
  handler: apiCtrl.getReposByTagCtrl,
  config: {
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
    }
  }
})

module.exports = routes

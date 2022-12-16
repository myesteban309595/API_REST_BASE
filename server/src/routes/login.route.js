const express = require('express');
const route = express.Router();

const {login} = require('../controllers/login.controller');

route.post('/', login);

module.exports = route;
const express = require('express');
const app = express();

const cep = require('./routes/cepRoute');

app.use('/', cep);

module.exports = app;
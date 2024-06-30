// backend/app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', menuRoutes);
app.use('/api', orderRoutes);

module.exports = app;

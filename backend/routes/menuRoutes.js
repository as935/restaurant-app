// backend/routes/menuRoutes.js

const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/menu', menuController.getMenuItems);

module.exports = router;

// backend/models/menuItem.js

const {getUserByEmail, connection} = require('../config/db');

const MenuItem = {
  getAll: (callback) => {
    connection.query('SELECT * FROM menu_items', callback);
  },
};

module.exports = MenuItem;

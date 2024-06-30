// backend/controllers/menuController.js

const menuItemModel = require('../models/menuItem');

const getMenuItems = (req, res) => {
  menuItemModel.getAll((err, menuItems) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(menuItems);
  });
};

module.exports = {
  getMenuItems,
};

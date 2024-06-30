// backend/controllers/orderController.js

const { json } = require('body-parser');
const Order = require('../models/order');

const createOrder = (req, res) => {
  const orderData = req.body;
  Order.create(orderData, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(json.toString('Order created successfully.'));
  });
};

const getOrders = (req, res) => {
  Order.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

module.exports = {
  createOrder,
  getOrders,
};

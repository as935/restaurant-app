// backend/models/order.js

const {getUserByEmail, connection} = require('../config/db');

const Order = {
  create: (orderData, callback) => {
    const { tableNumber, items, total } = orderData;
    // Start a transaction
    connection.beginTransaction(err => {
      if (err) return callback(err);

      // Insert into orders table
      connection.query('INSERT INTO orders (table_number, total) VALUES (?, ?)', [tableNumber, total], (err, results) => {
        if (err) {
          return connection.rollback(() => {
            callback(err);
          });
        }

        const orderId = results.insertId;
        const orderItems = items.map(item => [orderId, item.id, item.quantity, item.price]);

        // Insert into order_items table
        connection.query('INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES ?', [orderItems], (err, results) => {
          if (err) {
            return connection.rollback(() => {
              callback(err);
            });
          }

          // Commit the transaction
          connection.commit(err => {
            if (err) {
              return connection.rollback(() => {
                callback(err);
              });
            }
            callback(null, { orderId, ...orderData });
          });
        });
      });
    });
  },

  getAll: (callback) => {
    const query = `
      SELECT 
        orders.id AS order_id, 
        orders.table_number, 
        orders.total, 
        order_items.menu_item_id, 
        order_items.quantity, 
        order_items.price, 
        menu_items.name 
      FROM orders 
      JOIN order_items ON orders.id = order_items.order_id 
      JOIN menu_items ON order_items.menu_item_id = menu_items.id
    `;

    connection.query(query, (err, results) => {
      if (err) return callback(err);

      const ordersMap = {};

      results.forEach(row => {
        if (!ordersMap[row.order_id]) {
          ordersMap[row.order_id] = {
            orderId: row.order_id,
            tableNumber: row.table_number,
            total: row.total,
            items: [],
          };
        }
        ordersMap[row.order_id].items.push({
          menuItemId: row.menu_item_id,
          quantity: row.quantity,
          price: row.price,
          name: row.name,
        });
      });

      const orders = Object.values(ordersMap);
      callback(null, orders);
    });
  },
};

module.exports = Order;

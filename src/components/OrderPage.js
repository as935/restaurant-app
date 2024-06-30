// src/components/OrdersPage.js

import React, { useEffect, useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('No access token found, redirecting to login.');
        // Handle redirection to login or display an error message
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
        // Handle error (e.g., display error message)
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h2>Orders</h2>
      <div className="order-page">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <div className="details">
              <h3>Order {order.id}</h3>
              <p>Table: {order.tableNumber}</p>
              <p>Total: ${order.total}</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;



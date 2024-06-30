// src/components/MenuPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const {addToCart} = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch menu items from the backend API
    fetch('http://localhost:5000/api/menu')
      .then((response) => response.json())
      .then((data) => setMenuItems(data));
  }, []);


  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <div className='container'>
      <h2>Menu</h2>
      <div>
        {menuItems.map((item) => (
          <div key={item.id} className='menu-item'>
            <div className='details'>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            </div>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <button onClick={handleViewCart}>View Cart</button>
    </div>
  );
}

export default MenuPage;

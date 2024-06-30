// CartPage.js
import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart, updateCartItemQuantity, tableNumber, setTable, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const orderData = {
      tableNumber,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found, redirecting to login.');
      navigate('/login');
      return;
    }
    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
      body: JSON.stringify(orderData)
    })
      .then(response => response.json())
      .then(data => {
        alert('Order placed!');
        clearCart(); // Clear cart after placing order
        navigate('/menu');
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className='container'>
      <h2>Cart</h2>
      <div>
        <label>Table Number: </label>
        <div className='menu-item'>
        <input
          type="number"
          value={tableNumber}
          onChange={(e) => setTable(e.target.value)}
          required
        />
        </div>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                min="1"
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;

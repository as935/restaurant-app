// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './components/LoginPage';
import MenuPage from './components/MenuPage';
import CartPage from './components/CartPage';
import OrderPage from './components/OrderPage';
import { CartProvider } from './components/CartContext';
import './App.css';

function App() {
  return (
    <Router>
      <CartProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderPage />} />
        
      </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;



// backend/controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUserByEmail, connection } = require('../config/db');

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

const register = (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  getUserByEmail(email, async (err, user) => {
    if (err) return res.status(500).json({ error: 'Internal Server Error' });
    if (user) return res.status(409).json({ error: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, hashedPassword, role], (err, results) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });

      const newUser = { id: results.insertId, email, role };
      const accessToken = generateAccessToken(newUser);
      res.json({ accessToken });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  getUserByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ error: 'Internal Server Error' });
    if (!user) return res.status(404).json({ error: 'User not found' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
      res.json({ accessToken });
    });
  });
};

module.exports = {
  register,
  login,
};

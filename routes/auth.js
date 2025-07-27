const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { name, lastname, username, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, lastname, username, email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'Usuario creado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
    const { identifier, password } = req.body; // "identifier" puede ser email o username
  
    try {
      const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });
  
      if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ error: 'Credenciales inválidas' });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

// Route imports
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Sample routes to test all HTTP methods

// GET
app.get('/api/data', (req, res) => {
  res.json({ message: 'GET request received successfully' });
});

// POST
app.post('/api/data', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email required' });
  }

  console.log(`POST data received: Name = ${name}, Email = ${email}`);
  res.json({ message: 'POST request received', data: { name, email } });
});

// PUT
app.put('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email required for update' });
  }

  console.log(`PUT data for ID ${id}: Name = ${name}, Email = ${email}`);
  res.json({ message: `PUT request received for ID ${id}`, data: { name, email } });
});

// DELETE
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;

  console.log(`DELETE request received for ID: ${id}`);
  res.json({ message: `DELETE request received for ID ${id}` });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

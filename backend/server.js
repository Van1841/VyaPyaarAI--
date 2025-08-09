const express = require('express');
const cors = require('cors');
// to interact with mongoDB
const mongoose = require('mongoose');
// bcrypt: to hash passwords
const bcrypt = require('bcrypt');
const { scrape_meesho_prices } = require('./scraper');
const User = require('./userModel');

const app = express();

// Middleware (before routes)
app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://sakshx:test1234@vyapyaar-cluster.k3c5gvz.mongodb.net/vyapyaarDB?retryWrites=true&w=majority")
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes

app.get('/', (req, res) => {
  res.send('VyapyaarAI backend is running');
});


// mongo db mei login credentials save krta hai yeh !

app.post('/api/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or email already exists.' });
    }

    // Hash the password before saving for safety
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    res.json({ success: true, message: 'Registration successful!', user: { username, email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// official login route for vyapyaarAI
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password required.' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid username or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: 'Invalid username or password.' });
    }

    res.json({ success: true, message: 'Login successful!', user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Scrape prices from Meesho based on product name
// This endpoint will be called by the frontend to get prices
app.post('/api/scrape-prices', async (req, res) => {
  try {
    const { productName } = req.body;
    console.log(`Scraping prices for: ${productName}`);
    const prices = await scrape_meesho_prices(productName);
    res.json(prices);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Playwright scraper ready');
});



// 🔐 1. User Authentication (Signup/Login)
// Lets new users register with a username, email, and password.

// Encrypts passwords using bcrypt before saving to the database.

// Lets users log in, verifies password securely, and sends back basic user info.

// This helps in managing access to features like scraping or tracking.

// 🌐 2. Connects to MongoDB (Cloud Database)
// Uses Mongoose to connect to your MongoDB Atlas database.

// Stores user data like usernames, hashed passwords, and emails.

// Think of this as your app's memory—where all user info is saved safely.

// 📦 3. Enables API Calls from Frontend (CORS + JSON)
// Allows frontend (like React) to make requests to this server using CORS.

// Parses incoming JSON data from the frontend automatically.

// Smooth data exchange between frontend ↔ backend.

// 🛒 4. Product Price Scraper (Meesho)
// Provides an endpoint to scrape real-time prices from Meesho using your scraper.js.

// Takes a product name as input, scrapes its price, and returns the data.

// Core Vyapyaar AI functionality—"Get price from Meesho live!" ✅

// 🚀 5. Starts Your Server on Port 5000
// Keeps your backend running and listening for requests from the frontend or postman.

// Outputs logs so you know if it’s working.
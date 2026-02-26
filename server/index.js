const dotenv = require('dotenv');
dotenv.config();

const memoriesRoutes = require('./routes/memories');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use('/auth', authRoutes);
app.use('/memories', memoriesRoutes);

app.get('/', (req, res) => {
  res.send('Email Memories server is running!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

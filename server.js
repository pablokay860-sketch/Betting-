const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for registered users
const registeredUsers = new Set();

// Sample data: betting odds with match times
const matches = {
  live: [
    { id: 1, event: "Man City vs Arsenal", home: 2.4, draw: 3.2, away: 2.85, time: "LIVE", league: "Premier League" },
    { id: 2, event: "Liverpool vs Chelsea", home: 2.1, draw: 3.0, away: 3.5, time: "LIVE", league: "Premier League" }
  ],
  today: [
    { id: 3, event: "Manchester United vs Tottenham", home: 2.5, draw: 3.1, away: 2.9, time: "15:00", league: "Premier League" },
    { id: 4, event: "Real Madrid vs Barcelona", home: 2.2, draw: 3.3, away: 3.2, time: "20:00", league: "La Liga" },
    { id: 5, event: "Lakers vs Heat", home: 1.75, draw: 0, away: 2.1, time: "19:30", league: "NBA" }
  ],
  future: [
    { id: 6, event: "PSG vs Bayern Munich", home: 2.6, draw: 3.0, away: 2.7, date: "2026-06-07", time: "20:00", league: "Champions League" },
    { id: 7, event: "Alcaraz vs Sinner", home: 2.0, draw: 0, away: 1.85, date: "2026-06-08", time: "14:00", league: "Tennis" },
    { id: 8, event: "Juventus vs AC Milan", home: 2.3, draw: 3.2, away: 2.95, date: "2026-06-09", time: "18:00", league: "Serie A" },
    { id: 9, event: "England vs France", home: 2.4, draw: 3.4, away: 2.8, date: "2026-06-10", time: "20:00", league: "International" }
  ]
};

// User registration endpoint
app.post('/api/register', (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: "Username and email are required" });
  }

  const userKey = `${username}:${email}`;

  if (registeredUsers.has(userKey)) {
    return res.status(200).json({ 
      message: "User already registered", 
      isNewUser: false,
      username: username
    });
  }

  registeredUsers.add(userKey);
  return res.status(201).json({ 
    message: "User registered successfully", 
    isNewUser: true,
    username: username
  });
});

// Get all registered users count
app.get('/api/users/count', (req, res) => {
  res.json({ totalUsers: registeredUsers.size });
});

// Get matches by category
app.get('/api/matches/:category', (req, res) => {
  const category = req.params.category; // live, today, or future
  
  if (!matches[category]) {
    return res.status(404).json({ error: "Category not found. Use: live, today, or future" });
  }

  res.json(matches[category]);
});

// Get all matches
app.get('/api/matches', (req, res) => {
  res.json(matches);
});

// Legacy endpoint for backward compatibility
app.get('/api/bets', (req, res) => {
  res.json(matches.today);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running on port ${port}`);
});

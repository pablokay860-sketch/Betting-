const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sample data: betting odds
const bets = [
  { event: "Man City vs Arsenal", home: 2.4, draw: 3.2, away: 2.85 },
  { event: "Lakers vs Heat", home: 1.75, draw: 0, away: 2.1 },
  { event: "Alcaraz vs Sinner", home: 2.0, draw: 0, away: 1.85 }
];

// API endpoint
app.get('/api/bets', (req, res) => {
  res.json(bets);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running on port ${port}`);
});

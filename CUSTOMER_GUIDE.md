# 🎯 Betting App - Live Access

Welcome to the Betting App! Here's everything you need to know to get started.

## 🚀 Live App URL
Your app will be live on Railway at a URL like:
```
https://your-app-name.railway.app
```

Once deployed, you'll receive the exact link from Railway.

---

## 📱 Features

### 1. **Register as a User**
- Enter your username and email to register
- One-click registration to start betting

### 2. **Live Matches**
- View real-time sports events and odds
- Football, Basketball, Tennis, and more
- Updated odds for informed betting decisions

### 3. **Browse Categories**
- **Live** - Watch live events happening now
- **Today** - Upcoming matches today
- **Future** - Upcoming matches in the coming days

### 4. **Available Sports**
- ⚽ Football (Premier League, La Liga, Serie A, Champions League)
- 🏀 Basketball (NBA)
- 🎾 Tennis
- 🏴 International Matches

---

## 🔗 API Endpoints

If you're building a frontend or mobile app, here are the API endpoints:

### User Registration
```
POST /api/register
Body: { "username": "your_name", "email": "your@email.com" }
```

### Get Matches by Category
```
GET /api/matches/live
GET /api/matches/today
GET /api/matches/future
```

### Get All Matches
```
GET /api/matches
```

### User Count
```
GET /api/users/count
```

---

## 🎮 How to Use

1. **Visit the Live URL** (from Railway)
2. **Register with your details**
3. **Browse available matches**
4. **Check odds for each event**
5. **Place your bets**

---

## ❓ Support

If you encounter any issues:
- Check your internet connection
- Try refreshing the page
- Contact support through GitHub

---

## 📊 Betting Odds Format

Odds are displayed in decimal format:
- **Home** - Odds for home team/player to win
- **Draw** - Odds for a draw (if applicable)
- **Away** - Odds for away team/player to win

**Example:** Home: 2.4 means for every $1 bet, you win $2.40 (plus your original bet)

---

## ⚠️ Disclaimer

This is a demo betting application. Please ensure you comply with all local regulations regarding online betting in your jurisdiction.

---

**Ready to bet? Visit the live app now!** 🎲✨

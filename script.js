let currentUser = localStorage.getItem('betPlatformUser');

// Backend URL detection
const getBackendUrl = () => {
  return window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : window.location.origin;
};

const backendUrl = getBackendUrl();

// ============ Registration ============
const registrationForm = document.getElementById('registration-form');
const statusMessage = document.getElementById('status-message');
const registerBtn = document.getElementById('register-btn');

registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!username || !email) {
    showStatus('Please fill in all fields', 'error');
    return;
  }

  registerBtn.disabled = true;
  registerBtn.textContent = 'Processing...';

  try {
    const response = await fetch(`${backendUrl}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email })
    });

    const data = await response.json();

    if (response.ok) {
      // Save user to localStorage
      localStorage.setItem('betPlatformUser', JSON.stringify({ username, email }));
      currentUser = { username, email };

      if (data.isNewUser) {
        showStatus(`✅ Welcome ${username}! Registration successful!`, 'success');
      } else {
        showStatus(`👋 Welcome back ${username}!`, 'info');
      }

      // Hide registration section after 2 seconds
      setTimeout(() => {
        document.getElementById('registration-section').style.display = 'none';
        updateUserDisplay();
        loadMatches();
      }, 1500);
    } else {
      showStatus(data.error || 'Registration failed', 'error');
    }
  } catch (error) {
    console.error('Registration error:', error);
    showStatus('Failed to connect to server', 'error');
  } finally {
    registerBtn.disabled = false;
    registerBtn.textContent = 'Register / Login';
  }
});

// Show status message
function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
  if (type !== 'error') {
    setTimeout(() => {
      statusMessage.className = 'status-message';
    }, 4000);
  }
}

// Update user display
function updateUserDisplay() {
  const userDisplay = document.getElementById('user-display');
  const registrationSection = document.getElementById('registration-section');

  if (currentUser) {
    userDisplay.textContent = `👤 ${currentUser.username}`;
    registrationSection.style.display = 'none';
  } else {
    userDisplay.textContent = 'Not logged in';
    registrationSection.style.display = 'block';
  }

  fetchUserCount();
}

// Fetch user count
async function fetchUserCount() {
  try {
    const response = await fetch(`${backendUrl}/api/users/count`);
    const data = await response.json();
    document.getElementById('user-count').textContent = data.totalUsers;
  } catch (error) {
    console.error('Error fetching user count:', error);
  }
}

// ============ Matches Loading ============
async function loadMatches() {
  try {
    const response = await fetch(`${backendUrl}/api/matches`);
    const matchesData = await response.json();

    renderMatches('live', matchesData.live);
    renderMatches('today', matchesData.today);
    renderMatches('future', matchesData.future);
  } catch (error) {
    console.error('Error loading matches:', error);
    document.getElementById('live-container').innerHTML = '<div class="no-matches">Failed to load matches</div>';
    document.getElementById('today-container').innerHTML = '<div class="no-matches">Failed to load matches</div>';
    document.getElementById('future-container').innerHTML = '<div class="no-matches">Failed to load matches</div>';
  }
}

// Render matches
function renderMatches(category, matches) {
  const container = document.getElementById(`${category}-container`);

  if (!matches || matches.length === 0) {
    container.innerHTML = '<div class="no-matches">No matches available</div>';
    return;
  }

  container.innerHTML = matches.map(match => createMatchCard(match, category)).join('');
}

// Create match card
function createMatchCard(match, category) {
  const isLive = match.time === 'LIVE';
  const timeDisplay = isLive ? '🔴 LIVE' : match.time || match.date;
  const timeClass = isLive ? 'match-time live' : 'match-time';

  let matchContent = `
    <div class="match-card">
      <div class="match-header">
        <div class="match-league">${match.league}</div>
        <div class="${timeClass}">${timeDisplay}</div>
      </div>
      <div class="match-event">${match.event}</div>
      <div class="odds-section">
        <div class="odd" onclick="placeBet('${match.event}', '${match.home}')">
          <div class="odd-label">Home</div>
          <div class="odd-value">${match.home}</div>
        </div>
  `;

  if (match.draw > 0) {
    matchContent += `
        <div class="odd" onclick="placeBet('${match.event}', '${match.draw}')">
          <div class="odd-label">Draw</div>
          <div class="odd-value">${match.draw}</div>
        </div>
    `;
  } else {
    matchContent += `
        <div class="odd" style="opacity: 0.5; cursor: not-allowed;">
          <div class="odd-label">Draw</div>
          <div class="odd-value">N/A</div>
        </div>
    `;
  }

  matchContent += `
        <div class="odd" onclick="placeBet('${match.event}', '${match.away}')">
          <div class="odd-label">Away</div>
          <div class="odd-value">${match.away}</div>
        </div>
      </div>
  `;

  if (category === 'future' && match.date) {
    matchContent += `<div class="match-date">📆 ${match.date}</div>`;
  }

  matchContent += `</div>`;

  return matchContent;
}

// Place bet
function placeBet(event, odds) {
  if (!currentUser) {
    showStatus('Please register first to place bets', 'error');
    return;
  }
  alert(`Bet placed on "${event}" at odds ${odds}!\n\nUser: ${currentUser.username}`);
}

// ============ Tab Switching ============
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.dataset.tab;

    // Update active tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Update active content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
  });
});

// ============ Initialize ============
document.addEventListener('DOMContentLoaded', () => {
  updateUserDisplay();
  loadMatches();

  // Refresh user count every 10 seconds
  setInterval(fetchUserCount, 10000);
});

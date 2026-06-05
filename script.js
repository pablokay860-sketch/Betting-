async function loadBets() {
  const container = document.getElementById('bets-container');
  try {
    const backendUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:3000' 
      : `${window.location.protocol}//${window.location.host}`;
    
    const res = await fetch(`${backendUrl}/api/bets`);
    const bets = await res.json();

    container.innerHTML = bets.map(bet => `
      <div class="bet">
        <strong>${bet.event}</strong><br>
        Home: ${bet.home} | Draw: ${bet.draw} | Away: ${bet.away}
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = 'Failed to load bets.';
    console.error(err);
  }
}

loadBets();

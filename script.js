async function loadBets() {
  const container = document.getElementById('bets-container');
  try {
    const res = await fetch('http://localhost:3000/api/bets');
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
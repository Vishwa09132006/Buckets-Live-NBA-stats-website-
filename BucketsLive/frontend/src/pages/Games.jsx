import React from 'react';

function Games() {
  // Mock data for now - we'll replace with real API later
  const mockGames = [
    {
      id: 1,
      homeTeam: 'Lakers',
      awayTeam: 'Warriors',
      homeScore: 108,
      awayScore: 112,
      status: 'Final',
      date: 'Today, 7:30 PM'
    },
    {
      id: 2,
      homeTeam: 'Celtics',
      awayTeam: 'Heat',
      homeScore: 95,
      awayScore: 98,
      status: 'Final',
      date: 'Today, 8:00 PM'
    },
    {
      id: 3,
      homeTeam: 'Bucks',
      awayTeam: 'Nets',
      homeScore: 0,
      awayScore: 0,
      status: 'Upcoming',
      date: 'Tomorrow, 7:00 PM'
    }
  ];

  return (
    <div style={{ padding: '40px 20px', color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🏀 NBA Games</h1>
      <p style={{ opacity: 0.7, marginBottom: '40px' }}>Today's schedule and recent results</p>

      <div style={{ display: 'grid', gap: '20px' }}>
        {mockGames.map(game => (
          <div 
            key={game.id}
            style={{ 
              backgroundColor: 'rgb(29, 29, 29)', 
              padding: '30px', 
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div style={{ flex: '1', minWidth: '150px' }}>
              <h3 style={{ marginBottom: '5px' }}>{game.awayTeam}</h3>
              <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Away</p>
            </div>

            <div style={{ textAlign: 'center', minWidth: '100px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'rgb(0, 168, 255)' }}>
                {game.status === 'Upcoming' ? 'VS' : `${game.awayScore} - ${game.homeScore}`}
              </div>
              <p style={{ 
                fontSize: '0.8rem', 
                marginTop: '5px',
                color: game.status === 'Final' ? '#4ade80' : '#fbbf24'
              }}>
                {game.status}
              </p>
            </div>

            <div style={{ flex: '1', minWidth: '150px', textAlign: 'right' }}>
              <h3 style={{ marginBottom: '5px' }}>{game.homeTeam}</h3>
              <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Home</p>
            </div>

            <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', marginTop: '10px' }}>
              <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>{game.date}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '40px',
        padding: '20px',
        backgroundColor: 'rgba(0, 168, 255, 0.1)',
        borderRadius: '10px',
        border: '1px solid rgb(0, 168, 255)'
      }}>
        <p style={{ opacity: 0.8 }}>
          📊 <strong>Coming Soon:</strong> Live scores, detailed box scores, and real-time updates from NBA API
        </p>
      </div>
    </div>
  );
}

export default Games;
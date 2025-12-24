import React from 'react';
import { mockGames } from '../data/mockGames';
import GameCard from '../components/GameCard/GameCard';

function Scores() {
  const completedGames = mockGames.filter(game => game.status === 'Final');
  const liveGames = mockGames.filter(game => game.status === 'Live');

  return (
    <div style={{ padding: '40px 20px', color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📊 Live Scores</h1>
      <p style={{ opacity: 0.7, marginBottom: '40px' }}>Real-time NBA game scores and updates</p>

      {/* Live Games */}
      {liveGames.length > 0 && (
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>●</span>
            Live Now
          </h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {liveGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      {/* Final Scores */}
      <section>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>✅ Final Scores</h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          {completedGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {completedGames.length === 0 && liveGames.length === 0 && (
        <div style={{ 
          backgroundColor: 'rgb(29, 29, 29)', 
          padding: '60px', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏀</div>
          <h2 style={{ marginBottom: '10px' }}>No Games Today</h2>
          <p style={{ opacity: 0.8 }}>Check back later for live scores!</p>
        </div>
      )}
    </div>
  );
}

export default Scores;
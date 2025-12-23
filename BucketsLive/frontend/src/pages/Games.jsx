import React from 'react';
import { mockGames } from '../data/mockGames';
import GameCard from '../components/GameCard/GameCard';

function Games() {
  const games = mockGames;

  return (
    <div style={{ padding: '40px 20px', color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🏀 NBA Games</h1>
        <p style={{ opacity: 0.7 }}>Today's schedule and recent results</p>
      </div>

      {/* Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <button style={{
          padding: '10px 20px',
          backgroundColor: 'rgb(0, 168, 255)',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          All Games
        </button>
        <button style={{
          padding: '10px 20px',
          backgroundColor: 'rgb(29, 29, 29)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer'
        }}>
          Live
        </button>
        <button style={{
          padding: '10px 20px',
          backgroundColor: 'rgb(29, 29, 29)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer'
        }}>
          Upcoming
        </button>
        <button style={{
          padding: '10px 20px',
          backgroundColor: 'rgb(29, 29, 29)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer'
        }}>
          Completed
        </button>
      </div>

      {/* Games Grid - Using GameCard Component! */}
      <div style={{ display: 'grid', gap: '20px' }}>
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Coming Soon Notice */}
      <div style={{ 
        marginTop: '40px',
        padding: '25px',
        backgroundColor: 'rgba(0, 168, 255, 0.1)',
        borderRadius: '10px',
        border: '1px solid rgb(0, 168, 255)',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '10px', color: 'rgb(0, 168, 255)' }}>🚀 Coming Soon</h3>
        <p style={{ opacity: 0.9 }}>
          Live score updates, real-time stats, play-by-play commentary, and AI-powered game predictions!
        </p>
      </div>
    </div>
  );
}

export default Games;
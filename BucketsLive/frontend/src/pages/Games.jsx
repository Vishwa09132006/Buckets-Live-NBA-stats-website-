import React, { useState } from 'react';

function Games() {
  // Enhanced mock data with realistic NBA teams
  const [games] = useState([
    {
      id: 1,
      homeTeam: 'Lakers',
      homeLogo: '🏀',
      awayTeam: 'Warriors',
      awayLogo: '🏀',
      homeScore: 112,
      awayScore: 108,
      status: 'Final',
      quarter: 'Q4',
      date: 'Today, 7:30 PM EST',
      venue: 'Crypto.com Arena'
    },
    {
      id: 2,
      homeTeam: 'Celtics',
      homeLogo: '🏀',
      awayTeam: 'Heat',
      awayLogo: '🏀',
      homeScore: 95,
      awayScore: 98,
      status: 'Final',
      quarter: 'Q4',
      date: 'Today, 8:00 PM EST',
      venue: 'TD Garden'
    },
    {
      id: 3,
      homeTeam: 'Bucks',
      homeLogo: '🏀',
      awayTeam: 'Nets',
      awayLogo: '🏀',
      homeScore: 87,
      awayScore: 92,
      status: 'Live',
      quarter: 'Q3 - 5:23',
      date: 'Today, 8:30 PM EST',
      venue: 'Fiserv Forum'
    },
    {
      id: 4,
      homeTeam: 'Mavericks',
      homeLogo: '🏀',
      awayTeam: 'Suns',
      awayLogo: '🏀',
      homeScore: 0,
      awayScore: 0,
      status: 'Upcoming',
      quarter: 'Scheduled',
      date: 'Tomorrow, 7:00 PM EST',
      venue: 'American Airlines Center'
    },
    {
      id: 5,
      homeTeam: 'Nuggets',
      homeLogo: '🏀',
      awayTeam: 'Clippers',
      awayLogo: '🏀',
      homeScore: 0,
      awayScore: 0,
      status: 'Upcoming',
      quarter: 'Scheduled',
      date: 'Tomorrow, 9:00 PM EST',
      venue: 'Ball Arena'
    },
    {
      id: 6,
      homeTeam: '76ers',
      homeLogo: '🏀',
      awayTeam: 'Knicks',
      awayLogo: '🏀',
      homeScore: 0,
      awayScore: 0,
      status: 'Upcoming',
      quarter: 'Scheduled',
      date: 'Tomorrow, 7:30 PM EST',
      venue: 'Wells Fargo Center'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Live': return '#ef4444'; // Red
      case 'Final': return '#22c55e'; // Green
      case 'Upcoming': return '#fbbf24'; // Yellow
      default: return '#6b7280'; // Gray
    }
  };

  return (
    <div style={{ padding: '40px 20px', color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
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

      {/* Games Grid */}
      <div style={{ display: 'grid', gap: '20px' }}>
        {games.map(game => (
          <div 
            key={game.id}
            style={{ 
              backgroundColor: 'rgb(29, 29, 29)', 
              padding: '25px', 
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              border: game.status === 'Live' ? '2px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
            }}
          >
            {/* Status Badge */}
            <div style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 12px',
              backgroundColor: getStatusColor(game.status),
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>
              {game.status === 'Live' && <span style={{ fontSize: '8px' }}>●</span>}
              {game.status} {game.status === 'Live' && `• ${game.quarter}`}
            </div>

            {/* Teams and Scores */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '15px'
            }}>
              {/* Away Team */}
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>
                  {game.awayLogo} {game.awayTeam}
                </div>
                {game.status !== 'Upcoming' && (
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold',
                    color: game.awayScore > game.homeScore ? 'rgb(0, 168, 255)' : 'white'
                  }}>
                    {game.awayScore}
                  </div>
                )}
              </div>

              {/* VS or Score Separator */}
              <div style={{ 
                fontSize: '1.5rem', 
                opacity: 0.5,
                fontWeight: 'bold'
              }}>
                {game.status === 'Upcoming' ? 'VS' : '@'}
              </div>

              {/* Home Team */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>
                  {game.homeTeam} {game.homeLogo}
                </div>
                {game.status !== 'Upcoming' && (
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold',
                    color: game.homeScore > game.awayScore ? 'rgb(0, 168, 255)' : 'white'
                  }}>
                    {game.homeScore}
                  </div>
                )}
              </div>
            </div>

            {/* Game Info */}
            <div style={{ 
              borderTop: '1px solid rgba(255,255,255,0.1)', 
              paddingTop: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.9rem',
              opacity: 0.7
            }}>
              <span>📍 {game.venue}</span>
              <span>🕐 {game.date}</span>
            </div>

            {/* Action Buttons */}
            {game.status !== 'Upcoming' && (
              <div style={{ 
                borderTop: '1px solid rgba(255,255,255,0.1)', 
                paddingTop: '15px',
                marginTop: '15px',
                display: 'flex',
                gap: '10px'
              }}>
                <button style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor: 'rgba(0, 168, 255, 0.1)',
                  border: '1px solid rgb(0, 168, 255)',
                  borderRadius: '6px',
                  color: 'rgb(0, 168, 255)',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}>
                  Box Score
                </button>
                <button style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor: 'rgba(0, 168, 255, 0.1)',
                  border: '1px solid rgb(0, 168, 255)',
                  borderRadius: '6px',
                  color: 'rgb(0, 168, 255)',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}>
                  Highlights
                </button>
              </div>
            )}
          </div>
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
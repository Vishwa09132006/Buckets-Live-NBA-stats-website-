import React from 'react';
import './GameCard.css';

function GameCard({ game }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Live': return '#ef4444';
      case 'Final': return '#22c55e';
      case 'Upcoming': return '#fbbf24';
      default: return '#6b7280';
    }
  };

  return (
    <div className="game-card">
      {/* Status Badge */}
      <div 
        className="status-badge"
        style={{ backgroundColor: getStatusColor(game.status) }}
      >
        {game.status === 'Live' && <span className="live-dot">●</span>}
        {game.status}
        {game.status === 'Live' && ` • ${game.quarter}`}
      </div>

      {/* Teams and Scores */}
      <div className="game-matchup">
        {/* Away Team */}
        <div className="team away-team">
          <div className="team-name">
            <span className="team-logo">{game.awayLogo}</span>
            {game.awayTeam}
          </div>
          {game.status !== 'Upcoming' && (
            <div 
              className="team-score"
              style={{ 
                color: game.awayScore > game.homeScore ? 'rgb(0, 168, 255)' : 'white' 
              }}
            >
              {game.awayScore}
            </div>
          )}
        </div>

        {/* VS or @ Separator */}
        <div className="vs-separator">
          {game.status === 'Upcoming' ? 'VS' : '@'}
        </div>

        {/* Home Team */}
        <div className="team home-team">
          <div className="team-name">
            {game.homeTeam}
            <span className="team-logo">{game.homeLogo}</span>
          </div>
          {game.status !== 'Upcoming' && (
            <div 
              className="team-score"
              style={{ 
                color: game.homeScore > game.awayScore ? 'rgb(0, 168, 255)' : 'white' 
              }}
            >
              {game.homeScore}
            </div>
          )}
        </div>
      </div>

      {/* Game Info */}
      <div className="game-info">
        <span>📍 {game.venue}</span>
        <span>🕐 {game.date}</span>
      </div>

      {/* Action Buttons - Only for completed/live games */}
      {game.status !== 'Upcoming' && (
        <div className="game-actions">
          <button className="action-btn">Box Score</button>
          <button className="action-btn">Highlights</button>
        </div>
      )}
    </div>
  );
}

export default GameCard;
import React from 'react';
import './StandingsCard.css';

function StandingsCard() {
  const standings = [
    { team: 'Celtics', logo: '🍀', wins: 32, losses: 10, pct: '.762', streak: 'W3' },
    { team: 'Nuggets', logo: '⛰️', wins: 30, losses: 12, pct: '.714', streak: 'W5' },
    { team: 'Bucks', logo: '🦌', wins: 28, losses: 14, pct: '.667', streak: 'L1' },
    { team: '76ers', logo: '🔔', wins: 27, losses: 15, pct: '.643', streak: 'W2' },
    { team: 'Suns', logo: '☀️', wins: 26, losses: 16, pct: '.619', streak: 'W1' },
  ];

  return (
    <div className="standings-card">
      <div className="card-header">
        <h3>
          <span className="material-symbols-outlined">emoji_events</span>
          League Leaders
        </h3>
      </div>
      
      <div className="standings-table">
        <div className="table-header">
          <span className="col-team">Team</span>
          <span className="col-stat">W</span>
          <span className="col-stat">L</span>
          <span className="col-stat">PCT</span>
          <span className="col-streak">Streak</span>
        </div>
        
        {standings.map((team, index) => (
          <div className="table-row" key={index}>
            <span className="col-team">
              <span className="rank">#{index + 1}</span>
              <span className="team-logo-small">{team.logo}</span>
              {team.team}
            </span>
            <span className="col-stat">{team.wins}</span>
            <span className="col-stat">{team.losses}</span>
            <span className="col-stat">{team.pct}</span>
            <span className={`col-streak ${team.streak.startsWith('W') ? 'winning' : 'losing'}`}>
              {team.streak}
            </span>
          </div>
        ))}
      </div>
      
      <div className="card-footer">
        <button className="view-all-btn">View Full Standings →</button>
      </div>
    </div>
  );
}

export default StandingsCard;
import React, { useState } from 'react';
import { mockPlayers } from '../data/mockPlayers';

function Players() {
  const [players, setPlayers] = useState(mockPlayers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('ppg');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter players based on search
  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort players
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div style={{ padding: '40px 20px', color: 'white', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👥 NBA Players</h1>
        <p style={{ opacity: 0.7 }}>Comprehensive player statistics and analytics</p>
      </div>

      {/* Search and Filter Controls */}
      <div style={{ 
        backgroundColor: 'rgb(29, 29, 29)',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '30px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ flex: '1', minWidth: '250px' }}>
            <input
              type="text"
              placeholder="🔍 Search by name, team, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 15px',
                backgroundColor: 'rgb(20, 20, 20)',
                border: '2px solid rgba(0, 168, 255, 0.3)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border 0.3s'
              }}
              onFocus={(e) => e.target.style.border = '2px solid rgb(0, 168, 255)'}
              onBlur={(e) => e.target.style.border = '2px solid rgba(0, 168, 255, 0.3)'}
            />
          </div>

          {/* Stats Info */}
          <div style={{ 
            display: 'flex', 
            gap: '20px',
            opacity: 0.8,
            fontSize: '0.95rem'
          }}>
            <span>📊 {sortedPlayers.length} Players</span>
            <span>🏀 {new Set(sortedPlayers.map(p => p.team)).size} Teams</span>
          </div>
        </div>
      </div>

      {/* Top 3 Players Spotlight */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>🌟 Top Performers</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {sortedPlayers.slice(0, 3).map((player, index) => (
            <div
              key={player.id}
              style={{
                backgroundColor: 'rgb(29, 29, 29)',
                padding: '25px',
                borderRadius: '12px',
                border: index === 0 ? '2px solid gold' : '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {index === 0 && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '2rem'
                }}>👑</div>
              )}
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: index === 0 ? 'gold' : index === 1 ? 'silver' : '#cd7f32',
                marginBottom: '10px'
              }}>
                #{index + 1}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{player.name}</h3>
              <p style={{ opacity: 0.7, marginBottom: '15px' }}>
                {player.team} • {player.position} • #{player.number}
              </p>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '15px',
                marginTop: '15px',
                paddingTop: '15px',
                borderTop: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'rgb(0, 168, 255)' }}>
                    {player.ppg}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>PPG</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'rgb(0, 168, 255)' }}>
                    {player.rpg}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>RPG</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'rgb(0, 168, 255)' }}>
                    {player.apg}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>APG</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Table */}
      <div style={{ 
        backgroundColor: 'rgb(29, 29, 29)',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ 
          padding: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.5rem' }}>📈 Player Statistics</h2>
          <span style={{ opacity: 0.7, fontSize: '0.9rem' }}>
            Click column headers to sort
          </span>
        </div>

        {/* Table - Desktop */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '800px'
          }}>
            <thead>
              <tr style={{ backgroundColor: 'rgb(20, 20, 20)' }}>
                <th style={tableHeaderStyle} onClick={() => handleSort('name')}>
                  Player {getSortIcon('name')}
                </th>
                <th style={tableHeaderStyle} onClick={() => handleSort('team')}>
                  Team {getSortIcon('team')}
                </th>
                <th style={tableHeaderStyle} onClick={() => handleSort('position')}>
                  Pos {getSortIcon('position')}
                </th>
                <th style={tableHeaderStyle} onClick={() => handleSort('ppg')}>
                  PPG {getSortIcon('ppg')}
                </th>
                <th style={tableHeaderStyle} onClick={() => handleSort('rpg')}>
                  RPG {getSortIcon('rpg')}
                </th>
                <th style={tableHeaderStyle} onClick={() => handleSort('apg')}>
                  APG {getSortIcon('apg')}
                </th>
                <th style={tableHeaderStyle} onClick={() => handleSort('fgPercentage')}>
                  FG% {getSortIcon('fgPercentage')}
                </th>
                <th style={tableHeaderStyle}>Details</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player, index) => (
                <tr 
                  key={player.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'rgb(29, 29, 29)' : 'rgb(25, 25, 25)',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 168, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'rgb(29, 29, 29)' : 'rgb(25, 25, 25)'}
                >
                  <td style={tableCellStyle}>
                    <div style={{ fontWeight: 'bold' }}>{player.name}</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                      #{player.number} • {player.height} • {player.age}y
                    </div>
                  </td>
                  <td style={tableCellStyle}>{player.team}</td>
                  <td style={tableCellStyle}>
                    <span style={{
                      backgroundColor: 'rgba(0, 168, 255, 0.2)',
                      color: 'rgb(0, 168, 255)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold'
                    }}>
                      {player.position}
                    </span>
                  </td>
                  <td style={{...tableCellStyle, fontWeight: 'bold', color: 'rgb(0, 168, 255)'}}>
                    {player.ppg}
                  </td>
                  <td style={tableCellStyle}>{player.rpg}</td>
                  <td style={tableCellStyle}>{player.apg}</td>
                  <td style={tableCellStyle}>{player.fgPercentage}%</td>
                  <td style={tableCellStyle}>
                    <button style={{
                      padding: '6px 12px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgb(0, 168, 255)',
                      borderRadius: '6px',
                      color: 'rgb(0, 168, 255)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgb(0, 168, 255)';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = 'rgb(0, 168, 255)';
                    }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedPlayers.length === 0 && (
          <div style={{ 
            padding: '60px 20px',
            textAlign: 'center',
            opacity: 0.6
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔍</div>
            <p>No players found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Coming Soon Section */}
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
          Player comparison tools, advanced analytics, shot charts, and historical performance tracking!
        </p>
      </div>
    </div>
  );
}

// Reusable styles
const tableHeaderStyle = {
  padding: '15px',
  textAlign: 'left',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background-color 0.2s',
  fontWeight: 'bold',
  fontSize: '0.95rem'
};

const tableCellStyle = {
  padding: '15px',
  borderBottom: '1px solid rgba(255,255,255,0.05)'
};

export default Players;
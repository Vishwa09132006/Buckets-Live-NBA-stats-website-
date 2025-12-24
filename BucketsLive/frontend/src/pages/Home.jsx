import React from 'react';
import { Link } from 'react-router-dom';
import { getLiveGames, getTodaysGames } from '../data/mockGames';
import { getTopScorers } from '../data/mockPlayers';
import { getRecentNews } from '../data/mockNews';
import GameCard from '../components/GameCard/GameCard';

function Home() {
  const liveGames = getLiveGames();
  const todaysGames = getTodaysGames().slice(0, 3);
  const topScorers = getTopScorers(5);
  const recentNews = getRecentNews(3);

  return (
    <div style={{ color: 'white' }}>
      {/* Hero Section */}
      <div style={{ 
        padding: '60px 20px',
        background: 'linear-gradient(135deg, rgb(29, 29, 29) 0%, rgb(20, 20, 20) 100%)',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          marginBottom: '20px',
          background: 'linear-gradient(135deg, white, rgb(0, 168, 255))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🏀 Welcome to BucketsLive
        </h1>
        <p style={{ 
          fontSize: '1.3rem', 
          marginBottom: '30px', 
          opacity: 0.9,
          maxWidth: '700px',
          margin: '0 auto 30px'
        }}>
          Your ultimate NBA stats tracker with real-time scores, AI predictions, and comprehensive analytics
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/games" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '15px 30px',
              backgroundColor: 'rgb(0, 168, 255)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 16px rgba(0, 168, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              View Games
            </button>
          </Link>
          <Link to="/players" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '15px 30px',
              backgroundColor: 'transparent',
              border: '2px solid rgb(0, 168, 255)',
              borderRadius: '8px',
              color: 'rgb(0, 168, 255)',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
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
              Explore Players
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Live Games Section */}
        {liveGames.length > 0 && (
          <section style={{ marginBottom: '60px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#ef4444', animation: 'pulse 1.5s infinite' }}>●</span>
                Live Now
              </h2>
              <Link to="/games" style={{ color: 'rgb(0, 168, 255)', fontSize: '1rem' }}>
                View All →
              </Link>
            </div>
            <div style={{ display: 'grid', gap: '20px' }}>
              {liveGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}

        {/* Today's Games */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ fontSize: '2rem' }}>📅 Today's Games</h2>
            <Link to="/games" style={{ color: 'rgb(0, 168, 255)', fontSize: '1rem' }}>
              View All →
            </Link>
          </div>
          <div style={{ display: 'grid', gap: '20px' }}>
            {todaysGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Top Scorers */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ fontSize: '2rem' }}>🔥 Top Scorers</h2>
            <Link to="/players" style={{ color: 'rgb(0, 168, 255)', fontSize: '1rem' }}>
              View All →
            </Link>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            {topScorers.map((player, index) => (
              <div 
                key={player.id}
                style={{
                  backgroundColor: 'rgb(29, 29, 29)',
                  padding: '20px',
                  borderRadius: '10px',
                  border: index === 0 ? '2px solid gold' : '1px solid rgba(255,255,255,0.1)',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <span style={{ 
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: index === 0 ? 'gold' : 'rgb(0, 168, 255)'
                  }}>
                    #{index + 1}
                  </span>
                  {index === 0 && <span style={{ fontSize: '1.5rem' }}>👑</span>}
                </div>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  marginBottom: '5px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {player.name}
                </h3>
                <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '10px' }}>
                  {player.team}
                </p>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold',
                  color: 'rgb(0, 168, 255)'
                }}>
                  {player.ppg} <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>PPG</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest News */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ fontSize: '2rem' }}>📰 Latest News</h2>
            <Link to="/news" style={{ color: 'rgb(0, 168, 255)', fontSize: '1rem' }}>
              View All →
            </Link>
          </div>
          <div style={{ display: 'grid', gap: '15px' }}>
            {recentNews.map(article => (
              <div 
                key={article.id}
                style={{
                  backgroundColor: 'rgb(29, 29, 29)',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '2.5rem' }}>{article.image}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      gap: '10px', 
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{ 
                        backgroundColor: 'rgba(0, 168, 255, 0.2)',
                        color: 'rgb(0, 168, 255)',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}>
                        {article.category}
                      </span>
                      <span style={{ opacity: 0.5, fontSize: '0.85rem' }}>
                        {article.date}
                      </span>
                    </div>
                    <h3 style={{ 
                      fontSize: '1.2rem',
                      marginBottom: '8px',
                      color: 'white'
                    }}>
                      {article.title}
                    </h3>
                    <p style={{ opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.5' }}>
                      {article.summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center' }}>
            ⚡ Platform Features
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px'
          }}>
            <div style={{ 
              backgroundColor: 'rgb(29, 29, 29)', 
              padding: '30px', 
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'rgb(0, 168, 255)', marginBottom: '10px', fontSize: '2rem' }}>
                📊
              </h3>
              <h4 style={{ marginBottom: '10px' }}>Live Scores</h4>
              <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>
                Track real-time NBA game scores and stats as they happen
              </p>
            </div>

            <div style={{ 
              backgroundColor: 'rgb(29, 29, 29)', 
              padding: '30px', 
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'rgb(0, 168, 255)', marginBottom: '10px', fontSize: '2rem' }}>
                🤖
              </h3>
              <h4 style={{ marginBottom: '10px' }}>AI Predictions</h4>
              <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>
                Get AI-powered game outcome predictions based on performance
              </p>
            </div>

            <div style={{ 
              backgroundColor: 'rgb(29, 29, 29)', 
              padding: '30px', 
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'rgb(0, 168, 255)', marginBottom: '10px', fontSize: '2rem' }}>
                👥
              </h3>
              <h4 style={{ marginBottom: '10px' }}>Player Stats</h4>
              <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>
                Deep dive into individual player statistics and analytics
              </p>
            </div>

            <div style={{ 
              backgroundColor: 'rgb(29, 29, 29)', 
              padding: '30px', 
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'rgb(0, 168, 255)', marginBottom: '10px', fontSize: '2rem' }}>
                ☁️
              </h3>
              <h4 style={{ marginBottom: '10px' }}>AWS Powered</h4>
              <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>
                Scalable cloud infrastructure for reliable performance
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;
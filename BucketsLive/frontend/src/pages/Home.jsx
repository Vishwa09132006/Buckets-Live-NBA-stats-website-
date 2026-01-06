import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTodaysGames, fetchRecentGames } from '../services/nbaApi';
import { getTodaysGames } from '../data/mockGames';
import { getTopScorers } from '../data/mockPlayers';
import { getRecentNews } from '../data/mockNews';
import GameCard from '../components/GameCard/GameCard';
import StandingsCard from '../components/StandingsCard/StandingsCard';
import Loading from '../components/Loading/Loading';
import './Home.css';

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);

  // Other data (still using mock for now)
  const topScorers = getTopScorers(5);
  const recentNews = getRecentNews(3);

  // Fetch real NBA games on component mount
  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      
      try {
        // Try to fetch today's games first
        let gamesData = await fetchTodaysGames();
        
        // If no games today, try yesterday's games
        if (!gamesData || gamesData.length === 0) {
          console.log('No games today, fetching recent games...');
          gamesData = await fetchRecentGames();
        }
        
        // If API fails or returns nothing, use mock data
        if (!gamesData || gamesData.length === 0) {
          console.log('Using mock data as fallback');
          gamesData = getTodaysGames();
          setUsingMockData(true);
        }
        
        setGames(gamesData);
      } catch (err) {
        console.error('Error loading games:', err);
        // Fallback to mock data on error
        setGames(getTodaysGames());
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Separate live and upcoming games
  const liveGames = games.filter(game => game.status === 'Live');
  const todaysGames = games.filter(game => game.status !== 'Live').slice(0, 3);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home-page">
      {/* Show data source indicator */}
      {usingMockData && (
        <div style={{
          backgroundColor: 'rgba(251, 191, 36, 0.2)',
          border: '1px solid rgba(251, 191, 36, 0.5)',
          color: '#fbbf24',
          padding: '10px 20px',
          textAlign: 'center',
          fontSize: '0.9rem'
        }}>
          ⚠️ Using sample data - Real NBA API may be unavailable
        </div>
      )}

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">
          <span className="material-symbols-outlined" style={{fontSize: '3rem', verticalAlign: 'middle'}}>
            sports_basketball
          </span>
          Welcome to BucketsLive
        </h1>
        <p className="hero-subtitle">
          Your ultimate NBA stats tracker with real-time scores, AI predictions, and comprehensive analytics
        </p>
        <div className="hero-buttons">
          <Link to="/games">
            <button className="btn-primary">View Games</button>
          </Link>
          <Link to="/players">
            <button className="btn-secondary">Explore Players</button>
          </Link>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="home-container">
        {/* Main Content Area */}
        <div className="main-content">
          
          {/* Live Games Section */}
          {liveGames.length > 0 && (
            <section className="content-section">
              <div className="section-header">
                <h2>
                  <span className="live-indicator">●</span>
                  Live Now
                </h2>
                <Link to="/games" className="view-all-link">
                  View All →
                </Link>
              </div>
              <div className="games-grid">
                {liveGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>
          )}

          {/* Today's Games */}
          <section className="content-section">
            <div className="section-header">
              <h2>
                <span className="material-symbols-outlined">calendar_today</span>
                {usingMockData ? "Sample Games" : "Today's Games"}
              </h2>
              <Link to="/games" className="view-all-link">
                View All →
              </Link>
            </div>
            {games.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: 'white',
                opacity: 0.7
              }}>
                No games scheduled for today
              </div>
            ) : (
              <div className="games-grid">
                {todaysGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            )}
          </section>

          {/* Top Scorers */}
          <section className="content-section">
            <div className="section-header">
              <h2>
                <span className="material-symbols-outlined">local_fire_department</span>
                Top Scorers
              </h2>
              <Link to="/players" className="view-all-link">
                View All →
              </Link>
            </div>
            <div className="scorers-grid">
              {topScorers.map((player, index) => (
                <div 
                  key={player.id}
                  className={`scorer-card ${index === 0 ? 'top-scorer' : ''}`}
                >
                  <div className="scorer-header">
                    <span className="scorer-rank">#{index + 1}</span>
                    {index === 0 && (
                      <span className="material-symbols-outlined crown-icon">
                        workspace_premium
                      </span>
                    )}
                  </div>
                  <h3 className="scorer-name">{player.name}</h3>
                  <p className="scorer-team">{player.team}</p>
                  <div className="scorer-stats">
                    {player.ppg} <span className="stat-label">PPG</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Latest News */}
          <section className="content-section">
            <div className="section-header">
              <h2>
                <span className="material-symbols-outlined">newspaper</span>
                Latest News
              </h2>
              <Link to="/news" className="view-all-link">
                View All →
              </Link>
            </div>
            <div className="news-grid">
              {recentNews.map(article => (
                <div key={article.id} className="news-card">
                  <div className="news-content">
                    <span className="news-icon">{article.image}</span>
                    <div className="news-text">
                      <div className="news-meta">
                        <span className="news-category">{article.category}</span>
                        <span className="news-date">{article.date}</span>
                      </div>
                      <h3 className="news-title">{article.title}</h3>
                      <p className="news-summary">{article.summary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="sidebar-content">
          <StandingsCard />
          
          {/* Features Card */}
          <div className="features-card">
            <h3 className="features-title">
              <span className="material-symbols-outlined">bolt</span>
              Platform Features
            </h3>
            <div className="features-list">
              <div className="feature-item">
                <span className="material-symbols-outlined feature-icon">
                  query_stats
                </span>
                <div>
                  <h4>Live Scores</h4>
                  <p>Real-time game tracking</p>
                </div>
              </div>
              
              <div className="feature-item">
                <span className="material-symbols-outlined feature-icon">
                  psychology
                </span>
                <div>
                  <h4>AI Predictions</h4>
                  <p>ML-powered forecasts</p>
                </div>
              </div>
              
              <div className="feature-item">
                <span className="material-symbols-outlined feature-icon">
                  groups
                </span>
                <div>
                  <h4>Player Stats</h4>
                  <p>Deep analytics</p>
                </div>
              </div>
              
              <div className="feature-item">
                <span className="material-symbols-outlined feature-icon">
                  cloud
                </span>
                <div>
                  <h4>AWS Powered</h4>
                  <p>Scalable infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;
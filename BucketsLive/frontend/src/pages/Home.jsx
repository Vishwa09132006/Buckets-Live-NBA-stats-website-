import React from 'react';

function Home() {
  return (
    <div style={{ padding: '40px 20px', color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>🏀 Welcome to BucketsLive</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>
        Your ultimate NBA stats tracker with real-time scores, game predictions, and player analytics
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginTop: '40px' 
      }}>
        
        {/* Feature Card 1 */}
        <div style={{ 
          backgroundColor: 'rgb(29, 29, 29)', 
          padding: '30px', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ color: 'rgb(0, 168, 255)', marginBottom: '10px' }}>📊 Live Scores</h3>
          <p style={{ opacity: 0.8 }}>Track real-time NBA game scores and stats as they happen</p>
        </div>

        {/* Feature Card 2 */}
        <div style={{ 
          backgroundColor: 'rgb(29, 29, 29)', 
          padding: '30px', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ color: 'rgb(0, 168, 255)', marginBottom: '10px' }}>🤖 AI Predictions</h3>
          <p style={{ opacity: 0.8 }}>Get AI-powered game outcome predictions based on team performance</p>
        </div>

        {/* Feature Card 3 */}
        <div style={{ 
          backgroundColor: 'rgb(29, 29, 29)', 
          padding: '30px', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ color: 'rgb(0, 168, 255)', marginBottom: '10px' }}>👥 Player Stats</h3>
          <p style={{ opacity: 0.8 }}>Deep dive into individual player statistics and analytics</p>
        </div>

        {/* Feature Card 4 */}
        <div style={{ 
          backgroundColor: 'rgb(29, 29, 29)', 
          padding: '30px', 
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ color: 'rgb(0, 168, 255)', marginBottom: '10px' }}>📰 Latest News</h3>
          <p style={{ opacity: 0.8 }}>Stay updated with the latest NBA news and highlights</p>
        </div>

      </div>

      <div style={{ 
        marginTop: '60px', 
        textAlign: 'center',
        padding: '40px',
        backgroundColor: 'rgb(29, 29, 29)',
        borderRadius: '10px'
      }}>
        <h2 style={{ marginBottom: '20px' }}>🚧 Under Development</h2>
        <p style={{ opacity: 0.8 }}>
          This is a work in progress! More features coming soon including AWS integration,
          real-time data, and personalized dashboards.
        </p>
      </div>
    </div>
  );
}

export default Home;
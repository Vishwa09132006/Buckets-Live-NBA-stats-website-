import React from 'react';

function News() {
  return (
    <div style={{ padding: '40px 20px', color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📰 NBA News</h1>
      <p style={{ opacity: 0.7, marginBottom: '40px' }}>Latest updates and highlights from around the league</p>
      
      <div style={{ 
        backgroundColor: 'rgb(29, 29, 29)', 
        padding: '60px', 
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '20px' }}>🚧 Coming Soon</h2>
        <p style={{ opacity: 0.8 }}>
          NBA news feed with articles, highlights, and team updates will appear here.
        </p>
      </div>
    </div>
  );
}

export default News;
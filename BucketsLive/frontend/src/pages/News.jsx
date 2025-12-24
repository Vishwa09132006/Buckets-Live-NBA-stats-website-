import React, { useState } from 'react';
import { mockNews } from '../data/mockNews';

function News() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Game Recap', 'Awards', 'Trade Rumors', 'Rising Stars', 'All-Star', 'Injuries'];
  
  const filteredNews = selectedCategory === 'All' 
    ? mockNews 
    : mockNews.filter(article => article.category === selectedCategory);

  return (
    <div style={{ padding: '40px 20px', color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📰 NBA News</h1>
      <p style={{ opacity: 0.7, marginBottom: '30px' }}>Latest updates and highlights from around the league</p>

      {/* Category Filter */}
      <div style={{ 
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '10px 20px',
              backgroundColor: selectedCategory === category ? 'rgb(0, 168, 255)' : 'rgb(29, 29, 29)',
              border: selectedCategory === category ? 'none' : '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: selectedCategory === category ? 'bold' : 'normal',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== category) {
                e.target.style.backgroundColor = 'rgba(0, 168, 255, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category) {
                e.target.style.backgroundColor = 'rgb(29, 29, 29)';
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* News Articles */}
      <div style={{ display: 'grid', gap: '20px' }}>
        {filteredNews.map(article => (
          <div 
            key={article.id}
            style={{
              backgroundColor: 'rgb(29, 29, 29)',
              padding: '25px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '3rem' }}>{article.image}</span>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  alignItems: 'center',
                  marginBottom: '10px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ 
                    backgroundColor: 'rgba(0, 168, 255, 0.2)',
                    color: 'rgb(0, 168, 255)',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {article.category}
                  </span>
                  <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>
                    {article.date}
                  </span>
                  <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>
                    • {article.source}
                  </span>
                </div>
                <h3 style={{ 
                  fontSize: '1.4rem',
                  marginBottom: '10px',
                  color: 'white'
                }}>
                  {article.title}
                </h3>
                <p style={{ opacity: 0.8, fontSize: '1rem', lineHeight: '1.6' }}>
                  {article.summary}
                </p>
                <button style={{
                  marginTop: '15px',
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgb(0, 168, 255)',
                  borderRadius: '6px',
                  color: 'rgb(0, 168, 255)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
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
                  Read More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div style={{ 
          backgroundColor: 'rgb(29, 29, 29)', 
          padding: '60px', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📰</div>
          <h2 style={{ marginBottom: '10px' }}>No News in This Category</h2>
          <p style={{ opacity: 0.8 }}>Try selecting a different category!</p>
        </div>
      )}
    </div>
  );
}

export default News;
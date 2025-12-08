import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <div style={{ padding: '40px 20px', color: 'white', textAlign: 'center' }}>
        <h1>🏀 Welcome to BucketsLive!</h1>
        <p>Your NBA Stats Tracker is under construction</p>
        <p style={{ marginTop: '20px', opacity: 0.7 }}>
          Navbar should appear above. Try resizing your browser!
        </p>
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SearchBar from './components/SearchBar/SearchBar';
import Home from './pages/Home';
import Games from './pages/Games';
import Scores from './pages/Scores';
import News from './pages/News';
import Players from './pages/Players';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <SearchBar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/news" element={<News />} />
          <Route path="/players" element={<Players />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
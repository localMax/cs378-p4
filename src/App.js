import React, { useState } from 'react';
import './App.css';
import PlayerCard from './components/PlayerCard';

function App() {
  const [selectedUsername, setSelectedUsername] = useState('mkhappy');
  const [searchInput, setSearchInput] = useState('');
  const handleSearch = () => {
    if (searchInput.trim()) {
      setSelectedUsername(searchInput.trim());
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <h1>Players</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter username..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="button-container">
        <button onClick={() => setSelectedUsername('mkhappy')}>mkhappy</button>
        <button onClick={() => setSelectedUsername('checkmater7474')}>checkmater7474</button>
        <button onClick={() => setSelectedUsername('scoreboard420')}>scoreboard420</button>
      </div>
      <div className="players-container">
        <PlayerCard username={selectedUsername} />
      </div>
    </div>
  );
}

export default App;
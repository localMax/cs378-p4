import React, { useEffect, useState } from 'react';
import './PlayerCard.css'; // Import the CSS file

const PlayerCard = ({ username }) => {
  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        setError(null);

        const playerResponse = await fetch(`https://api.chess.com/pub/player/${username}`);
        if (!playerResponse.ok) {
          throw new Error('Failed to fetch player data');
        }
        const playerData = await playerResponse.json();
        setPlayer(playerData);

        const statsResponse = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
        if (!statsResponse.ok) {
          throw new Error('Failed to fetch player stats');
        }
        const statsData = await statsResponse.json();
        setStats(statsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [username]);

  if (loading) return <p>Loading player data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="player-card">
      {player?.avatar && <img src={player.avatar} alt="Avatar" className="player-avatar" />}
      <h2 className="player-username">{player?.username}</h2>
      {player?.title && <p className="player-title">{player.title}</p>}
      <div className="chess-ratings">
        <h3>Chess Ratings</h3>
        {stats?.chess_blitz?.last?.rating && <p>Blitz: {stats.chess_blitz.last.rating}</p>}
        {stats?.chess_daily?.last?.rating && <p>Daily: {stats.chess_daily.last.rating}</p>}
        {stats?.chess_rapid?.last?.rating && <p>Rapid: {stats.chess_rapid.last.rating}</p>}
        {stats?.chess_bullet?.last?.rating && <p>Bullet: {stats.chess_bullet.last.rating}</p>}
      </div>
      {stats?.tactics && (
        <div className="tactics">
          <h3>Tactics</h3>
          {stats.tactics.highest?.rating && <p>Highest: {stats.tactics.highest.rating}</p>}
          {stats.tactics.lowest?.rating && <p>Lowest: {stats.tactics.lowest.rating}</p>}
        </div>
      )}
      {stats?.puzzle_rush?.best && (
        <div className="puzzle-rush">
          <h3>Puzzle Rush</h3>
          {stats.puzzle_rush.best.score && <p>Best Score: {stats.puzzle_rush.best.score}</p>}
          {stats.puzzle_rush.best.total_attempts && <p>Total Attempts: {stats.puzzle_rush.best.total_attempts}</p>}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
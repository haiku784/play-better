import React, { useState, useEffect } from 'react';
import './Recommendation.css';

/**
 * Recommendation Component
 * This component fetches and displays recommendations for a user.
 * It allows users to view their recommendations and refresh the list.
 */
const Recommendation = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch recommendations from the Recommendation Service API.
   */
  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/recommendations/${userId}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [userId]); // Fetch recommendations when userId changes

  return (
    <div className="recommendation-container">
      <h2>User Recommendations</h2>
      {loading && <p>Loading recommendations...</p>}
      {error && <p className="error">Error: {error}</p>}
      <ul className="recommendation-list">
        {recommendations.map((rec) => (
          <li key={rec.recommendationId} className="recommendation-item">
            <h3>{rec.hardwareRecommendations}</h3>
            <p>{rec.configRecommendations}</p>
          </li>
        ))}
      </ul>
      <button onClick={fetchRecommendations} className="refresh-button">Refresh Recommendations</button>
    </div>
  );
};

export default Recommendation;
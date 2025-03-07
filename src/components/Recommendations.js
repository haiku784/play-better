// src/components/Recommendations.js
import React, { useEffect, useState } from 'react';
import './Recommendations.css';

/**
 * Recommendations component fetches and displays gear recommendations.
 * It communicates with the Gateway Service to retrieve recommendations data.
 */
const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  /**
   * Fetch recommendations from the Gateway Service.
   */
  const fetchRecommendations = async () => {
    try {
      const response = await fetch('/recommendations');
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="recommendations">
      <h2>Recommendations</h2>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((rec) => (
            <li key={rec.id}>{rec.gear}: {rec.reason}</li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default Recommendations;

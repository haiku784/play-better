import React, { useEffect, useState } from 'react';
import './RecommendationService.css';

/**
 * RecommendationService component fetches and displays hardware and configuration recommendations
 * for users based on their gameplay performance and preferences.
 */
const RecommendationService = () => {
  const [hardwareRecommendations, setHardwareRecommendations] = useState([]);
  const [configRecommendations, setConfigRecommendations] = useState([]);

  /**
   * Fetch hardware recommendations from the Recommendation Service API.
   */
  const fetchHardwareRecommendations = async () => {
    try {
      const response = await fetch('/hardware-recommendations');
      if (!response.ok) throw new Error('Failed to fetch hardware recommendations');
      const data = await response.json();
      setHardwareRecommendations(data);
    } catch (error) {
      console.error('Error fetching hardware recommendations:', error);
    }
  };

  /**
   * Fetch configuration recommendations from the Recommendation Service API.
   */
  const fetchConfigRecommendations = async () => {
    try {
      const response = await fetch('/config-recommendations');
      if (!response.ok) throw new Error('Failed to fetch config recommendations');
      const data = await response.json();
      setConfigRecommendations(data);
    } catch (error) {
      console.error('Error fetching config recommendations:', error);
    }
  };

  // Fetch recommendations on component mount
  useEffect(() => {
    fetchHardwareRecommendations();
    fetchConfigRecommendations();
  }, []);

  return (
    <div className="recommendation-service">
      <h2>Hardware Recommendations</h2>
      <ul className="recommendation-list">
        {hardwareRecommendations.map((rec) => (
          <li key={rec.hardwareId} className="recommendation-item">
            <h3>{rec.type}</h3>
            <p>{rec.compatibilityDetails}</p>
            <a href={rec.purchaseLinks} target="_blank" rel="noopener noreferrer">Buy Now</a>
          </li>
        ))}
      </ul>

      <h2>Configuration Recommendations</h2>
      <ul className="recommendation-list">
        {configRecommendations.map((rec) => (
          <li key={rec.gameTitle} className="recommendation-item">
            <h3>{rec.gameTitle}</h3>
            <p>Sensitivity: {rec.sensitivitySettings}</p>
            <p>Graphics Settings: {rec.graphicsSettings}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationService;
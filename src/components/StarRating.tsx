import React, { useState } from 'react';
import './StarRating.css';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const stars = Array(5).fill(0);

  return (
    <div className="star-rating">
      {stars.map((_, index) => {
        const starRating = index + 1;
        return (
          <span
            key={index}
            className={`star ${starRating <= rating ? 'filled' : ''}`}
            onClick={() => onRatingChange(starRating)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
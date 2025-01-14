import React, { useState } from 'react';

interface StarRatingProps {
    onChange: (rating: number) => void;
    initialRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ onChange, initialRating = 0 }) => {
    const [rating, setRating] = useState(initialRating);

    const handleClick = (value: number) => {
        setRating(value);
        onChange(value);
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star ${star <= rating ? 'filled' : ''}`}
                    onClick={() => handleClick(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
import React from 'react';
import PropTypes from 'prop-types';
import './RecommendationItem.css';

const RecommendationItem = ({ item }) => {
    return (
        <li className="recommendation-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
        </li>
    );
};

RecommendationItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default RecommendationItem;
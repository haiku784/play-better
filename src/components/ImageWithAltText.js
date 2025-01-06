import React from 'react';

/**
 * ImageWithAltText component renders an image with appropriate alt text for accessibility.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.src - Image source URL.
 * @param {string} props.alt - Alt text for the image (used by screen readers).
 * @param {string} [props.className] - Additional class names for styling.
 */
const ImageWithAltText = ({ src, alt, className }) => {
    return (
        <img src={src} alt={alt} className={className || ''} />
    );
};

export default ImageWithAltText;

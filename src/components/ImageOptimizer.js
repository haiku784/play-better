import React from 'react';

/**
 * ImageOptimizer component that optimizes and lazy loads images with a low resolution first.
 * @param {string} src - The source URL of the image.
 * @param {string} alt - The alt text for the image.
 * @param {string} lowResSrc - The low-resolution source URL for initial loading.
 * @returns {JSX.Element} - Rendered image element.
 */
const ImageOptimizer = ({ src, alt, lowResSrc }) => {
    return (
        <img
            src={lowResSrc}
            data-src={src} // Store the high-res src in data attribute
            alt={alt}
            className="lazy-load"
            loading="lazy" // Native lazy loading
            onLoad={(e) => {
                // Once the low-res image is loaded, load the high-res image
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    e.target.src = src; // Replace low-res with high-res
                };
            }}
        />
    );
};

export default ImageOptimizer;
import React from 'react';
import ImageOptimizer from './ImageOptimizer';

/**
 * LazyLoadedComponent that demonstrates the use of the ImageOptimizer for loading images.
 * @returns {JSX.Element} - Rendered component with optimized images.
 */
const LazyLoadedComponent = () => {
    return (
        <div className="lazy-loaded-gallery">
            <h2>Image Gallery</h2>
            <ImageOptimizer
                lowResSrc="/images/low-res1.jpg"
                src="/images/high-res1.jpg"
                alt="Description of high-res image 1"
            />
            <ImageOptimizer
                lowResSrc="/images/low-res2.jpg"
                src="/images/high-res2.jpg"
                alt="Description of high-res image 2"
            />
            {/* Add more images as necessary */}
        </div>
    );
};

export default LazyLoadedComponent;
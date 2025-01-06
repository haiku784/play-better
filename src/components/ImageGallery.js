import React from 'react';
import ImageWithAltText from './ImageWithAltText';

const ImageGallery = () => {
  const images = [
    { src: 'path/to/image1.jpg', alt: 'Description of image 1' },
    { src: 'path/to/image2.jpg', alt: 'Description of image 2' },
    { src: 'path/to/image3.jpg', alt: '' },  // Missing alt text for demonstration
  ];

  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <ImageWithAltText key={index} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
};

export default ImageGallery;
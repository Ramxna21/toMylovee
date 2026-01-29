import { useState, useEffect } from 'react';

interface HeartMaskedPhotoProps {
  photos?: string[];
  interval?: number;
  className?: string;
}

export default function HeartMaskedPhoto({
  photos = [
    'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=600'
  ],
  interval = 3000,
  className = ''
}: HeartMaskedPhotoProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (photos.length > 1) {
      const timer = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % photos.length);
          setIsTransitioning(false);
        }, 500);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [photos.length, interval]);

  return (
    <div className={`heart-mask-container ${className}`}>
      <div className={`photo-slideshow ${isTransitioning ? 'transitioning' : ''}`}>
        <img
          src={photos[currentIndex]}
          alt="Special Person"
          className="heart-masked-image"
        />
      </div>
    </div>
  );
}

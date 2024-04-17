import { useEffect, useState } from 'react';
import { Image } from 'react-native';

export const useLoadImage = (imageUrl: string): boolean => {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    if (!imageUrl) return;
    Image.prefetch(imageUrl)
      .then(() => {
        setImageLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to prefetch image', error);
      });
  }, []);

  return imageLoaded;
};

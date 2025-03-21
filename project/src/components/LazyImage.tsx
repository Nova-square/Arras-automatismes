import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  placeholderSrc?: string;
  threshold?: number;
}

export default function LazyImage({
  src,
  placeholderSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
  threshold = 0.1,
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc);
  const { ref, inView } = useInView({ threshold });

  useEffect(() => {
    if (inView && !loaded) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
        setLoaded(true);
      };
    }
  }, [inView, loaded, src]);

  return (
    <img
      ref={ref}
      src={currentSrc}
      className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-50'}`}
      {...props}
    />
  );
}
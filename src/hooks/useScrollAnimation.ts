import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Directional scroll animation for slide-left/right effects
export const useDirectionalAnimation = <T extends HTMLElement = HTMLDivElement>(direction: 'left' | 'right' | 'up' = 'up', threshold = 0.12) => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = (visible: boolean) => {
    if (visible) return 'translate(0, 0) scale(1)';
    switch (direction) {
      case 'left': return 'translate(-60px, 0) scale(0.97)';
      case 'right': return 'translate(60px, 0) scale(0.97)';
      default: return 'translate(0, 40px) scale(0.97)';
    }
  };

  return { ref, isVisible, getTransform };
};

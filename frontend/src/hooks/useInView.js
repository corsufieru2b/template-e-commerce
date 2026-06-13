/**
 * USE IN VIEW
 *
 * Hook simple pour déclencher des animations au scroll via IntersectionObserver.
 */

import { useEffect, useRef, useState } from 'react';

export const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      options
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, inView];
};

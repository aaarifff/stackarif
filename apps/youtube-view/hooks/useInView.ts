'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Reports when an element scrolls into view so embeds can lazy-load
 * (spec §2.5.1). Elements start visible when IntersectionObserver is missing.
 */
export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { rootMargin: '200px' },
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

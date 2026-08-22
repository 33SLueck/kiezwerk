'use client';

import * as React from 'react';

type SectionMotionProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'section' | 'div';
};

/**
 * Enter-once reveal. No exit fade — fading out interactive content (e.g. FAQ)
 * when height changes breaks open/close and click targets.
 */
export const SectionMotion = ({
  children,
  className = '',
  as = 'section',
}: SectionMotionProps) => {
  const ref = React.useRef<HTMLElement | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const shared = {
    ref: ref as React.RefObject<HTMLDivElement>,
    className: `section-motion ${className}`.trim(),
    'data-inview': inView ? 'true' : 'false',
  };

  if (as === 'div') {
    return <div {...shared}>{children}</div>;
  }

  return <section {...shared}>{children}</section>;
};

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, FC, ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedSection: FC<AnimatedSectionProps> = ({ children, className = '', delay = 0 }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const handleIntersection: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animate-fade-in');
      }, delay);
    }
  };

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay]);

  return (
    <section ref={sectionRef} className={`opacity-0 ${className}`}>
      {children}
    </section>
  );
};

export default AnimatedSection;

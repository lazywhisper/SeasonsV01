import { ReactNode, useEffect, useState } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 400,
  className = '' 
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      {children}
    </div>
  );
}

interface StaggeredFadeInProps {
  children: ReactNode[];
  staggerDelay?: number;
  duration?: number;
  className?: string;
}

export function StaggeredFadeIn({ 
  children, 
  staggerDelay = 50, 
  duration = 400,
  className = ''
}: StaggeredFadeInProps) {
  return (
    <>
      {children.map((child, index) => (
        <FadeIn 
          key={index} 
          delay={index * staggerDelay} 
          duration={duration}
          className={className}
        >
          {child}
        </FadeIn>
      ))}
    </>
  );
}

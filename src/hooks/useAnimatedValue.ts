import { useState, useEffect } from 'react';
import { PLATFORM } from '../constants/platform';

/**
 * Custom hook for animating numeric values
 * Extracts animation logic from components for reusability
 * 
 * @example
 * const animated = useAnimatedValue(targetWeights, { duration: 800 });
 */
export function useAnimatedValue<T extends Record<string, number>>(
  target: T | null,
  options: { 
    duration?: number; 
    steps?: number;
    enabled?: boolean;
  } = {}
): T | null {
  const { 
    duration = PLATFORM.UI.ANIMATION_DURATION_MS,
    steps = PLATFORM.UI.ANIMATION_STEPS,
    enabled = true,
  } = options;

  const [animated, setAnimated] = useState<T | null>(null);

  useEffect(() => {
    // If animation is disabled or no target, return immediately
    if (!enabled || !target) {
      setAnimated(target);
      return;
    }

    // Reset to zero initially
    const keys = Object.keys(target) as (keyof T)[];
    const zeroState = keys.reduce((acc, key) => {
      acc[key] = 0 as T[keyof T];
      return acc;
    }, {} as T);
    
    setAnimated(zeroState);

    let currentStep = 0;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      // Calculate eased progress (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimated(
        keys.reduce((acc, key) => {
          acc[key] = (target[key] * easedProgress) as T[keyof T];
          return acc;
        }, {} as T)
      );

      if (currentStep >= steps) {
        clearInterval(interval);
        // Set final value to ensure precision
        setAnimated(target);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [target, duration, steps, enabled]);

  return animated;
}

/**
 * Hook for animating a single number value
 * Simpler version for single values instead of objects
 * 
 * @example
 * const animatedCount = useAnimatedNumber(count, { duration: 500 });
 */
export function useAnimatedNumber(
  target: number,
  options: { 
    duration?: number; 
    steps?: number;
    enabled?: boolean;
  } = {}
): number {
  const { 
    duration = PLATFORM.UI.ANIMATION_DURATION_MS,
    steps = PLATFORM.UI.ANIMATION_STEPS,
    enabled = true,
  } = options;

  const [animated, setAnimated] = useState<number>(0);

  useEffect(() => {
    if (!enabled) {
      setAnimated(target);
      return;
    }

    setAnimated(0);

    let currentStep = 0;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimated(target * easedProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimated(target);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [target, duration, steps, enabled]);

  return animated;
}

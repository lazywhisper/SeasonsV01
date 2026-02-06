import { useState, useMemo, useEffect } from 'react';
import type { Asset } from '../types/asset';

interface PortfolioWeights {
  blue: number;
  under: number;
  rising: number;
}

export function usePortfolioWeights(
  assets: Asset[],
  rebalancedWeights: PortfolioWeights | null,
  isRebalancing: boolean
) {
  const [animatedWeights, setAnimatedWeights] = useState<PortfolioWeights | null>(null);

  // Calculate actual weights from asset data
  const actualWeights = useMemo(() => {
    const totalWeight = assets.reduce((sum, asset) => sum + asset.weightPct, 0);
    
    const blueWeight = assets
      .filter(a => a.category === 'blue')
      .reduce((sum, a) => sum + a.weightPct, 0);
    
    const underWeight = assets
      .filter(a => a.category === 'under')
      .reduce((sum, a) => sum + a.weightPct, 0);
    
    const risingWeight = assets
      .filter(a => a.category === 'rising')
      .reduce((sum, a) => sum + a.weightPct, 0);
    
    return {
      blue: totalWeight > 0 ? (blueWeight / totalWeight) * 100 : 0,
      under: totalWeight > 0 ? (underWeight / totalWeight) * 100 : 0,
      rising: totalWeight > 0 ? (risingWeight / totalWeight) * 100 : 0,
    };
  }, [assets]);

  // Animate weights when rebalancing completes
  useEffect(() => {
    if (rebalancedWeights && !isRebalancing) {
      // Start from 0
      setAnimatedWeights({ blue: 0, under: 0, rising: 0 });
      
      // Animate to target values
      const duration = 800; // 800ms animation
      const steps = 30;
      const stepDuration = duration / steps;
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedWeights({
          blue: rebalancedWeights.blue * progress,
          under: rebalancedWeights.under * progress,
          rising: rebalancedWeights.rising * progress,
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedWeights(rebalancedWeights);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    } else if (!rebalancedWeights) {
      setAnimatedWeights(null);
    }
  }, [rebalancedWeights, isRebalancing]);

  // Use animated weights if available, otherwise use actual weights
  const displayWeights = animatedWeights || actualWeights;

  return {
    displayWeights,
    actualWeights,
  };
}

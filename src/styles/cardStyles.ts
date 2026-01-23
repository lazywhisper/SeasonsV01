/**
 * Reusable card style constants for Seasons Dashboard
 * Reduces inline style duplication and improves maintainability
 */

import { CSSProperties } from 'react';

/**
 * Base card styles used throughout the dashboard
 */
export const cardStyles = {
  /**
   * Elevated card style (main containers)
   * Used for: main sections, PortfolioBuilder, YieldOverview
   */
  elevated: {
    background: 'var(--seasons-bg-elev)',
    border: '1px solid var(--seasons-border-hair)',
    boxShadow: 'var(--seasons-card-shadow)',
  } as CSSProperties,

  /**
   * Base card style (nested cards)
   * Used for: metric cards, asset rows, inner containers
   */
  base: {
    background: 'var(--seasons-bg-card)',
    border: '1px solid var(--seasons-border-hair)',
  } as CSSProperties,

  /**
   * Interactive card (hover effects)
   */
  interactive: {
    background: 'var(--seasons-bg-card)',
    border: '1px solid var(--seasons-border-hair)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  } as CSSProperties,

  /**
   * Glass effect card (semi-transparent)
   */
  glass: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--seasons-border-hair)',
    backdropFilter: 'blur(10px)',
  } as CSSProperties,
} as const;

/**
 * Text styles for consistency
 */
export const textStyles = {
  /**
   * Primary heading text
   */
  heading: {
    color: 'var(--seasons-text-primary)',
    fontWeight: 600,
    lineHeight: '1.3',
  } as CSSProperties,

  /**
   * Secondary text
   */
  secondary: {
    color: 'var(--seasons-text-secondary)',
    fontSize: '13px',
  } as CSSProperties,

  /**
   * Tertiary/muted text
   */
  tertiary: {
    color: 'var(--seasons-text-tertiary)',
    fontSize: '11px',
  } as CSSProperties,

  /**
   * Label text (uppercase, small)
   */
  label: {
    fontSize: '9px',
    color: 'var(--seasons-text-tertiary)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.6px',
    fontWeight: 600,
  } as CSSProperties,

  /**
   * Tabular numbers (for metrics, prices)
   */
  tabular: {
    fontVariantNumeric: 'tabular-nums',
    fontFeatureSettings: "'tnum' 1",
  } as CSSProperties,

  /**
   * Success text
   */
  success: {
    color: 'var(--seasons-success)',
    fontWeight: 500,
  } as CSSProperties,

  /**
   * Danger/error text
   */
  danger: {
    color: 'var(--seasons-danger)',
    fontWeight: 500,
  } as CSSProperties,
} as const;

/**
 * Button styles
 */
export const buttonStyles = {
  /**
   * Primary gradient button
   */
  gradient: {
    background: 'linear-gradient(135deg, #E9C774, #F27783, #B44BCB, #4B80CB)',
    border: 'none',
    color: 'white',
    fontWeight: 600,
    transition: 'all 0.3s ease',
  } as CSSProperties,

  /**
   * Secondary ghost button
   */
  ghost: {
    background: 'transparent',
    border: '1px solid var(--seasons-border-hair)',
    color: 'var(--seasons-text-secondary)',
    transition: 'all 0.3s ease',
  } as CSSProperties,

  /**
   * Filter button (inactive)
   */
  filter: {
    background: 'transparent',
    border: 'none',
    color: 'var(--seasons-text-secondary)',
    fontSize: '11px',
    transition: 'all 0.3s ease',
  } as CSSProperties,

  /**
   * Filter button (active)
   */
  filterActive: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    color: 'var(--seasons-text-primary)',
    fontSize: '11px',
    transition: 'all 0.3s ease',
  } as CSSProperties,
} as const;

/**
 * Badge/pill styles
 */
export const badgeStyles = {
  /**
   * Success badge (green)
   */
  success: {
    background: 'rgba(96, 211, 148, 0.08)',
    color: 'var(--seasons-success)',
    fontSize: '10px',
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: '4px',
  } as CSSProperties,

  /**
   * Warning badge (orange/red)
   */
  warning: {
    background: 'rgba(242, 119, 131, 0.08)',
    color: 'var(--seasons-brand-grad-mid1)',
    fontSize: '10px',
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: '4px',
  } as CSSProperties,

  /**
   * Info badge (blue)
   */
  info: {
    background: 'rgba(75, 128, 203, 0.08)',
    color: '#4B80CB',
    fontSize: '10px',
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: '4px',
  } as CSSProperties,

  /**
   * Neutral badge
   */
  neutral: {
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'var(--seasons-text-secondary)',
    fontSize: '10px',
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: '4px',
  } as CSSProperties,

  /**
   * Inactive badge (for node status)
   */
  inactive: {
    background: 'rgba(172, 169, 169, 0.08)',
    border: '1px solid rgba(172, 169, 169, 0.15)',
  } as CSSProperties,
} as const;

/**
 * Layout spacing constants
 */
export const spacing = {
  card: {
    padding: '16px',
    paddingMd: '24px',
    gap: '12px',
    gapMd: '16px',
  },
  section: {
    marginBottom: '16px',
    marginBottomMd: '24px',
  },
} as const;

/**
 * Helper to merge styles
 */
export const mergeStyles = (...styles: CSSProperties[]): CSSProperties => {
  return Object.assign({}, ...styles);
};
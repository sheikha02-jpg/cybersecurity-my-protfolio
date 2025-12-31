import React, { ReactNode } from 'react';

/**
 * Container Component
 * ═══════════════════════════════════════════════════════════════════
 * 
 * SYSTEM ANALYST REQUIREMENT #2: Responsive Layout System
 * 
 * PURPOSE:
 * - Provides consistent max-width wrappers across the site
 * - Prevents content from stretching on ultra-wide screens (>1440px)
 * - Ensures responsive padding that scales with viewport
 * - Centers content on large displays
 * - Prevents horizontal scroll on all devices (320px - 4K)
 * 
 * USAGE:
 * ```tsx
 * <Container>
 *   <YourContent />
 * </Container>
 * 
 * <Container size="narrow">
 *   <BlogPost />
 * </Container>
 * 
 * <Container size="wide" className="bg-neutral-900">
 *   <Dashboard />
 * </Container>
 * ```
 * 
 * VARIANTS:
 * - default (1440px max-width): Standard sections, hero, features
 * - narrow (800px max-width): Blog posts, articles, text-heavy content
 * - wide (1600px max-width): Dashboards, data tables, admin panels
 * 
 * FEATURES:
 * - Mobile-first responsive design
 * - Fluid padding using clamp() (1rem → 2.5rem)
 * - Automatic centering on large screens
 * - Safe area support for iOS devices
 * - Composable with custom className
 * 
 * ═══════════════════════════════════════════════════════════════════
 */

interface ContainerProps {
  children: ReactNode;
  size?: 'default' | 'narrow' | 'wide';
  className?: string;
  as?: React.ElementType; // Allow polymorphic component (div, section, article, etc.)
  id?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  size = 'default',
  className = '',
  as: Component = 'div',
  id,
}) => {
  /**
   * Determine CSS class based on size variant
   */
  const sizeClass = {
    default: 'wrapper', // 1440px max-width
    narrow: 'wrapper-narrow', // 800px max-width
    wide: 'wrapper-wide', // 1600px max-width
  }[size];

  return (
    <Component
      id={id}
      className={`${sizeClass} ${className}`.trim()}
      style={{
        // Ensure no horizontal overflow
        overflowX: 'hidden',
        // Safe area support for iOS devices
        paddingLeft: 'max(clamp(1rem, 4vw, 2.5rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(1rem, 4vw, 2.5rem), env(safe-area-inset-right))',
      }}
    >
      {children}
    </Component>
  );
};

export default Container;

/**
 * RESPONSIVE PADDING BREAKDOWN:
 * ─────────────────────────────────────────────────────────────────
 * clamp(1rem, 4vw, 2.5rem)
 * 
 * Mobile (320px - 767px):
 *   - 1rem (16px) padding
 *   - Prevents cramped content on small screens
 * 
 * Tablet (768px - 1023px):
 *   - ~1.5rem - 2rem (24px - 32px)
 *   - Scales proportionally with viewport
 * 
 * Desktop (1024px - 1439px):
 *   - ~2rem - 2.5rem (32px - 40px)
 *   - Comfortable breathing room
 * 
 * Ultra-wide (1440px+):
 *   - 2.5rem (40px) maximum
 *   - Prevents excessive padding on large displays
 *   - Content centered via margin-inline: auto
 * 
 * iOS Safe Area:
 *   - Automatically respects device notches and gesture bars
 *   - Uses max() to ensure padding never less than safe area
 * ─────────────────────────────────────────────────────────────────
 */

/**
 * ACCESSIBILITY NOTES:
 * ─────────────────────────────────────────────────────────────────
 * - Semantic HTML: Use `as` prop to render correct element
 *   Example: <Container as="section"> for section content
 * 
 * - Landmarks: Combine with ARIA roles
 *   Example: <Container as="main" role="main">
 * 
 * - Focus management: Container doesn't interfere with keyboard navigation
 * 
 * - Screen readers: No visual-only content, all content accessible
 * ─────────────────────────────────────────────────────────────────
 */

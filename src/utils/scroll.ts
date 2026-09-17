/**
 * Utility for smooth scrolling to heading elements with fixed/sticky header offset.
 */

export interface ScrollToHeadingOptions {
  /** Additional breathing room in pixels below the sticky header (default: 16) */
  additionalOffset?: number;
  /** Whether to adjust for an open mobile TOC that is about to collapse */
  adjustForCollapsingElement?: HTMLElement | null;
}

/**
 * Calculates the height of the sticky site header dynamically.
 */
export function getStickyHeaderHeight(): number {
  const siteHeader = document.getElementById('site-header') || document.querySelector('header.sticky');
  if (siteHeader) {
    const rect = siteHeader.getBoundingClientRect();
    if (rect.height > 0) {
      return rect.height;
    }
  }
  return 64; // Default standard height (h-16 = 64px)
}

/**
 * Scrolls smoothly to a target heading element by its ID,
 * accurately accounting for the sticky/fixed header offset and providing
 * comfortable breathing room so the heading is fully visible without being obscured.
 *
 * @param id The ID of the heading (H2/H3) element to scroll to
 * @param options Configuration options including collapsing height adjustment
 */
export function scrollToHeading(id: string, options?: ScrollToHeadingOptions): void {
  if (!id) return;

  // 1. Locate the actual heading element
  let headingEl = document.getElementById(id);

  // Fallback query if id has special characters
  if (!headingEl) {
    try {
      headingEl = document.querySelector(`[id="${CSS.escape(id)}"]`);
    } catch {
      // Ignore query error
    }
  }

  // Fallback: search for heading tag with the id or data-heading-id
  if (!headingEl) {
    headingEl = document.querySelector(`h2#${id}, h3#${id}, [data-heading-id="${id}"]`);
  }

  if (!headingEl) {
    console.warn(`[TOC] Heading target with id "${id}" not found.`);
    return;
  }

  // 2. Measure sticky header height
  const headerHeight = getStickyHeaderHeight();

  // 3. Determine the visual top of the heading.
  // If the heading (H2) is inside a styled section heading bar (.section-heading-bar),
  // we align to the top of that bar so the entire heading block (accent line + background)
  // is cleanly visible.
  const visualTarget = headingEl.closest('.section-heading-bar') || headingEl;
  const targetRect = visualTarget.getBoundingClientRect();
  const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

  // 4. Calculate offset adjustment if an element above it (e.g. mobile TOC dropdown) is collapsing
  let collapsingAdjustment = 0;
  if (options?.adjustForCollapsingElement) {
    const rect = options.adjustForCollapsingElement.getBoundingClientRect();
    collapsingAdjustment = rect.height;
  }

  // 5. Calculate final scroll position
  const buffer = options?.additionalOffset ?? 16;
  const targetTop = currentScrollY + targetRect.top - collapsingAdjustment - headerHeight - buffer;

  window.scrollTo({
    top: Math.max(0, Math.round(targetTop)),
    behavior: 'smooth'
  });
}

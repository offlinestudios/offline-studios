# Changelog - Offline Studios HTML Site

## Version 6.7 - Remove Restaurants Badge (November 2, 2025)

### Changed
- **Removed Restaurants badge** from hero section
- **Badge count reduced** from 4 to 3 badges
- **Remaining badges:** Dentists, Law Firms, Hair Salons

### Rationale
- Simplifies hero section layout
- Eliminates all spacing and overlap issues
- Creates cleaner, less crowded appearance
- Three badges provide better balance around +112% card

### Visual Impact
- ✅ Perfect spacing with no overlap
- ✅ Cleaner, more professional appearance
- ✅ Better visual balance
- ✅ Easier to maintain responsive behavior

---

## Version 6.6 - Badge Positioning Refinement (November 2, 2025)

### Changed
- **Refined badge positions** for better spacing
- **Badge positions updated:**
  - Top-left (Dentists): 4% from edges
  - Top-right (Law Firms): 6% top, 4% right
  - Bottom-left (Hair Salons): 45% from bottom, 2% from left
  - Bottom-right (Restaurants): 10% from bottom, 4% from right
- **Hero height:** 560px

### Technical
- Clean CSS structure with single media query for desktop
- No duplicate rules
- Proper badge positioning hierarchy

---

## Version 6.5 - Critical CSS Syntax Fix (November 2, 2025)

### Fixed - CRITICAL
- **CSS syntax error** that was breaking the entire mobile media query
- **Portfolio mobile order** - Fixed broken CSS structure causing preview to show before content
- **Mobile badge scaling** - Fixed media query scope issue

### Root Cause
**Broken CSS Structure:**
```css
@media (max-width: 768px) {
  .portfolio-grid { 
    grid-template-columns: 1fr; 
    /* MISSING CLOSING BRACE */
    .stat-badge { ... }  /* NESTED INSIDE (invalid) */
  }
}  /* Media query closed early */
  
  /* These were OUTSIDE media query: */
  .portfolio-preview { order: 1 !important; }  /* WRONG */
  .portfolio-content { order: 2 !important; }  /* WRONG */
```

### Solution
**Clean, Correct CSS:**
```css
@media (max-width: 768px) {
  .portfolio-grid, .portfolio-grid-reverse { 
    grid-template-columns: 1fr; 
    gap: var(--spacing-lg); 
  }
  
  .portfolio-grid .portfolio-content,
  .portfolio-grid-reverse .portfolio-content { order: 1 !important; }
  
  .portfolio-grid .portfolio-preview,
  .portfolio-grid-reverse .portfolio-preview { order: 2 !important; }
  
  .stat-badge { 
    display: flex; 
    transform: scale(0.8); 
  }
}
```

### Impact
- ✅ Portfolio content now shows before preview on mobile
- ✅ Mobile badge scaling now works correctly
- ✅ All mobile media query rules now apply properly
- ✅ Valid, maintainable CSS structure

---

## Version 6.4 - Badge Positioning Adjustments (November 2, 2025)

### Changed
- Refined badge positions with better balance
- Law Firms badge moved slightly higher and more to the right
- Hair Salons badge moved down for better spacing
- Restaurants badge moved up slightly
- Hero height optimized at 560px

---

## Version 6.3 - Badge Spacing & Portfolio Mobile Order (November 2, 2025)

### Critical Fixes

**1. Badge Spacing Issue**
- Increased spacing from center card for all badges
- Top-left (Dentists): 4% from edges (was 6%)
- Top-right (Law Firms): 8% top, 6% right (was 10%, 8%)
- Bottom-left (Hair Salons): 42% from bottom, 2% from left (was 38%, 4%)
- Bottom-right (Restaurants): 12% from bottom, 4% from right (was 18%, 6%)
- Hero height increased: 580px (was 560px)

**2. Portfolio Mobile Order Issue**
- Added `!important` to mobile order rules
- Increased CSS specificity with `.portfolio-grid-reverse` selector
- Content always shows before preview on mobile

---

## Version 6.2 - Class-Based Badge Positioning (November 2, 2025)

### Changed
- Migrated from inline styles to semantic CSS classes
- Added `.badge-tl`, `.badge-tr`, `.badge-bl`, `.badge-br` classes
- Cleaner HTML with no inline `style` attributes
- Better maintainability

---

## Version 6.1 - Bug Fixes (November 2, 2025)

### Fixed
- **Z-Index Overlap:** Center +112% badge now sits above circular badges
- **Mobile Badge Visibility:** Badges now visible on mobile with scaling
- **Portfolio Order:** Explicit `order: 2` for preview on mobile

---

## Version 6.0 - Mobile Navigation & Hero Optimization (November 1, 2025)

### Added
- **Mobile Navigation:** Hamburger menu implementation
- **Hero Section Mobile Optimization:** Reduced height, optimized badges

---

## Version 5.5 - Animation Transform Fix (October 31, 2025)

### Fixed
- Animation transform conflict that was overwriting centering transform
- Created `float-center` keyframes to preserve centering while floating

---

## Version 5.4 - Center Badge Fix (October 31, 2025)

### Fixed
- Removed `max-width: 200px` breaking centering
- Restored organic scattered badge positioning

---

## Version 5.3 - Badge Layout Redesign (October 31, 2025)

### Changed
- Reduced +112% badge size
- Removed Retail badge (5 → 4 badges)
- Improved positioning

---

## Version 5.2 - Badge Z-Index Fix (October 31, 2025)

### Fixed
- Badge layering with z-index adjustments

---

## Version 5.1 - Footer Link Hover Fix (October 31, 2025)

### Fixed
- Footer link hover color from white to brand red

---

## Version 5.0 - Circular Badges & Counter Animation (October 31, 2025)

### Added
- Circular floating badges
- Counter animation for +112% and process numbers

---

## Earlier Versions

Previous versions focused on initial HTML/CSS/JS structure, portfolio section, services, process, contact form, footer, and responsive design.

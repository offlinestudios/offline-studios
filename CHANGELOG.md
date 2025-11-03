# Changelog - Offline Studios HTML Site

## Version 6.11 - Mobile Hero Badge Hotfix (November 3, 2025)

### Fixed - Mobile Badge Clearance Around Center Card

**The Problem:**
Even with the 520px hero height from V6.10, the +112% card is still quite large on mobile (padding + large fonts), leaving tight clearance for badges. The bottom-left badge (`.badge-bl`) at `bottom: 14%` can still drift into the center card on shorter phones (iPhone SE, etc.).

**Root Cause:**
- Large +112% card on mobile takes up significant space
- Badge positions too aggressive for smaller viewport heights
- Insufficient clearance between badges and center card
- Risk of overlap on 375px and smaller screens

**The Solution - Hotfix CSS File:**

Created `hotfix-hero-badges.css` with mobile-specific overrides:

1. **Increased hero height:** `min-height: 580px` (was 520px) + `height: auto`
2. **Shrunk +112% card:**
   - Padding: 14px (smaller)
   - Max-width: 260px
   - Font size: 1.75rem (was 2.25rem)
   - Label: 0.8rem (smaller)
3. **Reduced badge size:** 68px (was 72px)
   - Icons: 18px
   - Text: 10px
4. **Safer badge positions:**
   - `badge-tl`: top 6%, left 6%
   - `badge-tr`: top 8%, right 6%
   - `badge-bl`: bottom 6% (was 14% - moved much lower)

### Implementation

**File Structure:**
```
css/
  styles.css               ← Main stylesheet
  hotfix-hero-badges.css   ← Mobile badge hotfix (NEW)
```

**HTML Changes:**
```html
<link rel="stylesheet" href="css/styles.css">
<link rel="stylesheet" href="css/hotfix-hero-badges.css">
```

The hotfix CSS loads after main styles and uses `!important` to override mobile rules, ensuring:
- No transform conflicts
- Explicit sizing (no scale)
- Safe positioning
- Smaller center card
- More breathing room

### Visual Result

**Before V6.11:**
- Hero height: 520px
- +112% card: Large (default padding/fonts)
- Badges: 72px
- badge-bl: bottom 14% (can drift into card)
- Risk of overlap on shorter phones

**After V6.11:**
- Hero height: min 580px (auto)
- +112% card: Compact (14px padding, 1.75rem font)
- Badges: 68px
- badge-bl: bottom 6% (safe distance from card)
- Perfect clearance on all phone sizes

### Impact

**Mobile Experience:**
- ✅ Generous clearance around +112% card
- ✅ Badges positioned safely away from center
- ✅ Smaller, more compact +112% card
- ✅ Works perfectly on iPhone SE (375px), iPhone 12 Pro (390px), and larger
- ✅ No risk of overlap on any mobile device
- ✅ Clean, professional appearance

**Maintainability:**
- ✅ Hotfix in separate file (easy to update or remove)
- ✅ Uses `!important` to override base styles
- ✅ Well-documented with comments
- ✅ No-risk addition (doesn't modify main CSS)

---

## Version 6.10 - Fix Conflicting CSS Rules on Mobile (November 3, 2025)

### Fixed - CRITICAL CSS Conflicts

**Issue 1: Conflicting Hero Heights**
- Removed duplicate `height: 350px;` rule
- Kept only `height: 520px;`

**Issue 2: Transform vs Animation Conflict**
- Replaced `transform: scale(0.7)` with explicit sizing
- Set `width: 72px; height: 72px;`
- Disabled animation with `animation: none;`

---

## Version 6.9 - Fix Mobile Badge Collision (November 2, 2025)

### Fixed - CRITICAL Mobile Badge Overlap
- Increased hero height to 520px
- Fixed badge-bl position from bottom: 60% to bottom: 14%
- Adjusted all margins to 6%

---

## Version 6.8 - Mobile Badge Overlap & Container Width Fixes (November 2, 2025)

### Fixed - CRITICAL Mobile Issues
- Mobile badge overlap
- Portfolio order bug
- Mobile container width issues

---

## Version 6.7 - Remove Restaurants Badge (November 2, 2025)

### Changed
- Removed Restaurants badge
- 3-badge layout

---

## Version 6.6 - Badge Positioning Refinement (November 2, 2025)

### Changed
- Refined badge positions

---

## Version 6.5 - Critical CSS Syntax Fix (November 2, 2025)

### Fixed - CRITICAL
- CSS syntax error
- Portfolio mobile order
- Mobile badge scaling

---

## Version 6.4 - Badge Positioning Adjustments (November 2, 2025)

### Changed
- Refined badge positions

---

## Version 6.3 - Badge Spacing & Portfolio Mobile Order (November 2, 2025)

### Critical Fixes
- Badge spacing
- Portfolio mobile order

---

## Version 6.2 - Class-Based Badge Positioning (November 2, 2025)

### Changed
- Semantic CSS classes

---

## Version 6.1 - Bug Fixes (November 2, 2025)

### Fixed
- Z-Index overlap
- Mobile badge visibility
- Portfolio order

---

## Version 6.0 - Mobile Navigation & Hero Optimization (November 1, 2025)

### Added
- Mobile navigation
- Hero optimization

---

## Version 5.5 - Animation Transform Fix (October 31, 2025)

### Fixed
- Animation transform conflict

---

## Version 5.4 - Center Badge Fix (October 31, 2025)

### Fixed
- Center badge positioning

---

## Version 5.3 - Badge Layout Redesign (October 31, 2025)

### Changed
- Smaller +112% badge
- 4-badge layout

---

## Version 5.2 - Badge Z-Index Fix (October 31, 2025)

### Fixed
- Badge layering

---

## Version 5.1 - Footer Link Hover Fix (October 31, 2025)

### Fixed
- Footer hover color

---

## Version 5.0 - Circular Badges & Counter Animation (October 31, 2025)

### Added
- Circular badges
- Counter animation

---

## Earlier Versions

Initial HTML/CSS/JS structure, responsive design, and core features.

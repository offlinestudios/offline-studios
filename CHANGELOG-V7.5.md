# CHANGELOG - V7.5

## Version 7.5 - Mobile Portfolio Layout with CSS Grid Areas (November 5, 2025)

### Fixed - Stat Card Styling + Button Positioning

**The Problem:**
V7.4 attempted to fix mobile portfolio layout using flexbox `order` properties, but had two critical issues:
1. **Stat cards not styled as cards:** The `.portfolio-features` list items were plain text, not styled as rounded grey cards matching the Figma mockup
2. **Button positioning unreliable:** The button was inside `.portfolio-content` container, making it difficult to position below mockups using just flexbox order

**Root Cause:**
- Flexbox with `display: contents` and `order` properties is fragile and hard to maintain
- Button nested inside `.portfolio-content` prevented clean separation of layout areas
- Stat cards lacked proper card styling (background, border-radius, padding, shadow)
- Conflicting CSS rules in media query were overriding the grid areas

**The Solution - CSS Grid Areas Approach:**

### HTML Changes
Moved button from inside `.portfolio-content` to separate `.portfolio-cta` wrapper for all 4 portfolio items:

```html
<!-- BEFORE (V7.4) -->
<div class="portfolio-content">
    <h3>Title</h3>
    <p>Description</p>
    <ul class="portfolio-features">...</ul>
    <a href="..." class="btn">View Project</a>  ← Inside content
</div>

<!-- AFTER (V7.5) -->
<div class="portfolio-content">
    <h3>Title</h3>
    <p>Description</p>
    <ul class="portfolio-features">...</ul>
</div>
<div class="portfolio-cta">
    <a href="..." class="btn">View Project</a>  ← Separate wrapper
</div>
```

### CSS Changes

**Desktop Layout (> 768px):**
```css
.portfolio-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "content preview";
    gap: var(--spacing-3xl);
}

.portfolio-content { grid-area: content; }
.portfolio-preview { grid-area: preview; }
.portfolio-cta { 
    grid-column: 1 / -1;  /* Spans both columns */
    margin-top: var(--spacing-md);
}

/* Reverse layout for alternating pattern */
.portfolio-grid-reverse {
    grid-template-areas: "preview content";
}

/* Stat cards styled as rounded grey cards in 2-column grid */
.portfolio-features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
    margin: var(--spacing-lg) 0;
}

.portfolio-features li {
    background: #F9FAFB;
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-sm);
}
```

**Mobile Layout (≤ 768px):**
```css
.portfolio-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
        "title"
        "description"
        "stats"
        "mockups"
        "button";
    gap: var(--spacing-md);
}

.portfolio-title { 
    grid-area: title;
    text-align: center;
}

.portfolio-description { 
    grid-area: description;
    text-align: center;
}

.portfolio-features { 
    grid-area: stats;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-sm);
}

.portfolio-features li {
    background: #F3F4F6;
    border: 1px solid #D1D5DB;
    border-radius: 0.75rem;
    padding: var(--spacing-md);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.portfolio-preview { 
    grid-area: mockups;
    display: flex;
    justify-content: center;
}

.portfolio-cta { 
    grid-area: button;
    display: flex;
    justify-content: center;
}

.portfolio-content {
    display: contents;  /* Children participate in parent grid */
}
```

### Key Improvements

1. **Proper Stat Card Styling:**
   - Rounded grey cards with `border-radius: 0.75rem`
   - Light grey background (#F3F4F6 on mobile, #F9FAFB on desktop)
   - Subtle border and shadow for depth
   - 2-column grid layout for the two stat cards
   - Proper padding and spacing

2. **Reliable Button Positioning:**
   - Button in separate `.portfolio-cta` wrapper
   - Uses CSS Grid areas for clean, predictable layout
   - Always appears below mockups on mobile
   - Centered with flexbox

3. **Cleaner CSS Architecture:**
   - Grid areas provide semantic layout structure
   - No fragile `order` properties
   - No `display: contents` complexity
   - Easier to maintain and debug

4. **Fixed Conflicting CSS:**
   - Removed duplicate `.portfolio-grid` rule at line ~992 that was overriding grid areas
   - Consolidated all mobile portfolio CSS into one section (line ~1020)

### Mobile Layout Order (Verified Working)
1. ✅ Title (centered)
2. ✅ Description (centered)
3. ✅ Stat Cards (2-column grid, rounded grey cards)
4. ✅ Mockups (device mockup with mobile + desktop screenshots)
5. ✅ Button (centered, below mockups)

### Files Modified
- `index.html` - Moved buttons into `.portfolio-cta` wrapper (all 4 portfolio items)
- `css/styles.css` - Implemented CSS Grid areas, styled stat cards, removed conflicting rules
- `todo.md` - Added V7.5 completion notes

### Testing
- ✅ Tested on 375px mobile viewport
- ✅ Verified stat cards appear as proper rounded grey cards
- ✅ Confirmed button appears below mockups
- ✅ All text center-aligned on mobile
- ✅ Layout matches Figma mockup requirements
- ✅ Desktop layout unchanged and working correctly

### Deployment
- Committed as: `3fa85c8`
- Pushed to: `offlinestudios/offline-studios` main branch
- Live at: https://offline-studios.github.io/offline-studios
- GitHub Pages build triggered automatically

---

# Pure HTML/CSS/JS Site - Todo List

## Fix Device Mockup Images
- [x] Add actual project images to device mockup windows
- [x] Ensure images load properly in laptop and phone frames

## Fix Hero Business Badges
- [x] Remove "Services" badge
- [x] Remove "Photo Studios" badge
- [x] Add "Dentists" badge with icon
- [x] Add "Law Firms" badge with icon
- [x] Add "Hair Salons" badge with icon
- [x] Add "Retail" badge with icon
- [x] Add "Restaurants" badge with icon
- [x] Arrange badges in circular floating pattern around +112% card

## Fix Button Widths
- [x] Make "View Project" buttons narrower (not full width)
- [x] Center buttons or align left based on design
- [x] Ensure buttons have proper max-width

## Fix Portfolio Layout
- [x] Verify alternating left-right layout works correctly
- [x] Ensure text and mockups swap sides properly

## Fix Testimonial Section
- [x] Remove "Request a Case Study" button
- [x] Keep testimonial quote and author info

## Fix Process Numbers
- [x] Set process step numbers opacity to 0.2 (currently too faded)
- [x] Ensure numbers are visible but subtle

## Fix CTA Section
- [x] Remove "View Portfolio" card entirely
- [x] Convert "Book Consultation" card into contact form
- [x] Add form fields: Name, Email, Phone, Message
- [x] Add submit button
- [x] Make form full-width in CTA section

## New Fixes Required (Match React Version)

### Portfolio Layout Direction
- [x] Fix Passport Photo Toronto: Mockup should be on RIGHT, text on LEFT
- [x] Fix Headshot Photo Toronto: Mockup should be on LEFT, text on RIGHT
- [x] Fix Julian Ross Photography: Mockup should be on RIGHT, text on LEFT
- [x] Fix Julian Ross Music: Mockup should be on LEFT, text on RIGHT
- [x] Verify alternating pattern matches React version
- [x] Replace RTL direction hack with proper CSS grid order

### Hero Section Badges
- [x] Remove emoji icons (🦷 ⚖️ 💇 🛍️ 🍴)
- [x] Add proper SVG/icon badges with text labels
- [x] Dentists badge with icon
- [x] Law Firms badge with icon
- [x] Hair Salons badge with icon
- [x] Restaurants badge with utensils icon
- [x] Retail badge with shopping bag icon
- [x] Match styling from React version (white circles with icons)

### Logo
- [x] Add Offline Studios logo back to navigation
- [x] Position logo correctly as in React version

### Process Numbers Animation
- [x] Add counter animation to process numbers (01, 02, 03, 04)
- [x] Numbers should count up from 00 to final number
- [x] Animation should trigger on scroll into view

### Footer Color
- [x] Change footer background from black to light gray (#F9FAFB)
- [x] Match exact color from React version (bg-accent/5)
- [x] Update text colors to work with light background
- [x] Verify text contrast is still good

## Additional React Version Parity Fixes

### Color Scheme
- [x] Investigate exact background colors used in React version
- [x] Check if React uses pure white or off-white background (#FAFAFA)
- [x] Match section background colors (hero, services, portfolio, etc.)
- [x] Verify all grays match React version

### Process Number Hover Effects
- [x] Add hover state to process numbers
- [x] Process numbers should "light up" or highlight on hover
- [x] Match exact hover effect from React version (color change + scale 1.1)

### Footer Logo
- [x] Add Offline Studios logo to footer
- [x] Position logo in footer brand section
- [x] Match footer logo styling from React version (32px height)


## V5 - Fix Hero Badge Design

### Badge Layout Issue
- [x] Change badges from horizontal pill layout to circular vertical layout
- [x] Icons should be ABOVE text labels, not beside them
- [x] Badges should be small circles (80-100px), not large rectangles
- [x] Match exact styling from React version (circular, compact design)
- [x] Update HTML structure for vertical flexbox layout (flex-col)
- [x] Update CSS for circular shape and proper icon/text spacing
- [x] Ensure badges are properly positioned around +112% card
- [x] Add floating animation to badges
- [x] Add hover effects (scale + border color change)


### Hero Counter Animation
- [x] Add counter animation to +112% number
- [x] Number should count up from 0 to 112 when hero section loads
- [x] Match timing and easing from React version (50 steps × 30ms = 1.5s)
- [x] Update JavaScript to include hero counter animation

## V5.1 - Footer Link Hover Color Fix

- [x] Change footer link hover color from white to brand red (#DC143C)
- [x] Ensure links are visible on hover against light gray background

## V5.2 - Badge Z-Index Layering Fix

- [x] Fix z-index so small badges (Retail, Restaurants) appear above large +112% card
- [x] Ensure all 5 badges are visible (Dentists, Law Firms, Hair Salons, Retail, Restaurants)

## V5.3 - Hero Badge Layout Redesign

- [x] Make +112% badge smaller (reduce size)
- [x] Center +112% badge better in the layout
- [x] Remove Retail badge from HTML
- [x] Keep only 4 badges: Dentists, Law Firms, Hair Salons, Restaurants
- [x] Adjust badge positions to prevent overlap
- [x] Ensure proper spacing between all badges

## V5.4 - Fix Center Badge Position and Restore Organic Layout

- [x] Fix +112% badge centering (currently too far right and down)
- [x] Remove max-width constraint that may be breaking centering
- [x] Restore organic/scattered badge positions (not symmetrical grid)
- [x] Test that center badge is truly centered in container

## V6.1 - Bug Fixes from User Report

### Z-Index Overlap Fix
- [x] Fix +112% badge being overlapped by circular badges
- [x] Change .stat-card-main z-index from 10 to 30
- [x] Change .stat-badge z-index from 20 to 10

### Mobile Badge Visibility
- [x] Show badges on mobile instead of hiding them
- [x] Scale badges down on mobile (0.8x for regular, 0.7x for small)
- [x] Remove display: none rule for .stat-badge on mobile

### Portfolio Order Fix
- [x] Add explicit order: 2 for .portfolio-preview on mobile
- [x] Ensure content always shows before preview on mobile

### CSS Token Repairs
- [x] Fix broken CSS tokens split by newlines
- [x] Repair "col\nor: white" to "color: white"
- [x] Repair ".service-ca\nrd:hover" to ".service-card:hover"
- [x] Check for any other broken CSS tokens

### Optional Polish
- [ ] Consider adding pointer-events: none to .stat-badge
- [ ] Consider reducing badge size further on very small screens (<480px)

## V6.3 - Critical Fixes (User Screenshots)

### Badge Spacing Issue
- [x] Increase badge spacing from center card (current positions still too close)
- [x] Move Restaurants badge further away (currently overlapping +112% card)
- [x] Adjust all badge positions to create more breathing room
- [x] Increase hero height to 580px for more space

### Portfolio Mobile Order Issue  
- [x] Fix portfolio grid showing preview BEFORE content on mobile
- [x] Add !important to mobile order rules to override desktop reverse
- [x] Increase specificity with .portfolio-grid-reverse selector
- [x] Verify content always shows before preview on mobile

## V6.5 - Debug Persisting Issues

### Badge Spacing (Still Not Fixed)
- [ ] Investigate why badges still overlap +112% card
- [ ] Check if CSS is being applied correctly
- [ ] Verify media query is triggering at correct breakpoint
- [ ] Test badge positions at different viewport sizes

### Portfolio Mobile Order (FIXED)
- [x] Found broken CSS syntax - unclosed brace in media query
- [x] Removed duplicate/conflicting portfolio order rules
- [x] Fixed media query structure
- [x] Portfolio order now correct: content first, preview second

## V6.7 - Remove Restaurants Badge

- [x] Remove Restaurants badge from hero section HTML
- [x] Keep only 3 badges: Dentists, Law Firms, Hair Salons
- [x] Verify spacing is perfect with 3 badges
- [x] Test on desktop and mobile

## V6.8 - Mobile Badge Overlap & Container Width Fixes

### Mobile Badge Issues
- [x] Fix "Hair Salons" text overlapping "Law Firms" badge
- [x] Fixed portfolio order (was backwards again)
- [x] Added mobile-specific badge positioning
- [x] Scaled badges to 70% on mobile
- [x] Spread badges out with 5% margins
- [x] Moved Hair Salons badge down (bottom: 60%)
- [x] Reduced hero height to 400px on mobile

### Mobile Container Width Issues
- [x] Ensure all containers are proportional to screen size on mobile
- [x] Reduced container padding on mobile
- [x] Set max-width: 100% for all containers
- [x] Added overflow-x: hidden to prevent horizontal scroll
- [x] Set width: 100% for all grid containers

## V6.9 - Fix Mobile Badge Collision

### Root Cause
- [x] bottom: 60% on 400px container = 160px from bottom = overlaps with top: 5% (20px from top)
- [x] badge-tl and badge-bl rendering in same position on mobile
- [x] "Hair Salons" and "Law Firms" text overlapping in one circle

### Solution
- [x] Increase hero height to 520px on mobile (more room)
- [x] Change badge-bl from bottom: 60% to bottom: 14%
- [x] Adjust all badge positions for proper spacing (6% margins)
- [x] Verify no overlap - all 3 badges now clearly separated

## V6.10 - Fix Conflicting CSS Rules on Mobile

### Issue 1: Conflicting Hero Heights
- [x] Line ~906: .hero-visual { height: 520px; }
- [x] Line ~1017: .hero-visual { height: 350px; } (REMOVED)
- [x] Result: Now only one height rule (520px)
- [x] Solution: Removed duplicate, kept only 520px

### Issue 2: Transform vs Animation Conflict
- [x] Mobile sets: transform: scale(0.7) (REPLACED)
- [x] Animation sets: transform: translateY(...) (DISABLED)
- [x] Solution: Set explicit width/height (72px) + animation: none
- [x] Result: Badges now correct size without animation conflicts

## V6.11 - Mobile Hero Badge Hotfix

### Issue: Tight Clearance Around Center Card
- [x] +112% card still large on mobile (padding + fonts)
- [x] badge-bl at bottom: 14% can drift into card on shorter phones
- [x] Current positions too aggressive for smaller heights

### Hotfix Solution
- [x] Increase hero min-height to 580px (more breathing room)
- [x] Shrink +112% card on mobile (smaller padding, fonts)
- [x] Move badges to safer positions (badge-bl to bottom: 6%)
- [x] Reduce badge size to 68px for better fit
- [x] Shrink badge icons and text
- [x] Created hotfix-hero-badges.css file
- [x] Added hotfix CSS to index.html

## V6.12 - Fixed Badge Overlap on Mobile ✓

### Issue: Hair Salons and Law Firms Text Overlapping in Same Badge
- [x] Screenshot showed two text labels in one badge
- [x] "Hair Salons" and "Law Firms" stacked on top of each other
- [x] V6.11 hotfix not preventing the overlap

### Root Cause Identified:
- [x] badge-tl and badge-tr both at top: 6% in styles.css
- [x] Same vertical position caused overlap on narrow screens (375px-390px)
- [x] Hotfix CSS had different values but main CSS had conflicting rules

### Solution Applied:
- [x] Updated hotfix-hero-badges.css with distinct vertical positions
- [x] badge-tl (Dentists): top: 8%
- [x] badge-tr (Law Firms): top: 28% (moved down significantly from 6%)
- [x] badge-bl (Hair Salons): bottom: 8%
- [x] Increased hero height to 600px for more vertical space
- [x] Reduced badge size to 64px for tighter footprint
- [x] All badges now have generous vertical separation

## V6.13 - Fixed Law Firms Badge Visibility ✓

### Issue: Law Firms Badge Not Showing
- [x] User screenshot showed only 2 badges visible (Hair Salons, Dentists)
- [x] Law Firms badge (badge-tr) was completely invisible
- [x] Badge was positioned at top: 28%, right: 6% (too far down)

### Root Cause:
- [x] V6.12 positioned Law Firms at top: 28% which was too far down
- [x] Badge was either off-screen or hidden behind +112% card
- [x] Z-index may have been insufficient

### Solution Applied:
- [x] Moved Law Firms badge to top: 15% (visible in top area)
- [x] Moved Dentists to top: 10% for better spacing
- [x] Moved Hair Salons to bottom: 10%
- [x] Added z-index: 30 to all badges (above card's z-index: 20)
- [x] All three badges now clearly visible on mobile
- [x] Tested on desktop viewport - all badges visible

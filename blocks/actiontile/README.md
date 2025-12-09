# Action Tile Block

A visually striking two-column component with content on the left and an image on the right, featuring a dark navy background. Part of the Adelaide University GTM Design System.

## Design Reference
- Figma: [Content Block Desktop](https://www.figma.com/design/eWyJLdC7NbPuIqZwlDCAkD/-CORE--Adelaide-University-%7C-GTM-Design-System-%7C-Patterns---Templates?node-id=370-12040)
- Component Name: Content Block/Desktop
- Container: Dark background (#0c0930)

## Features
- **Two-column layout**: Content left, image right
- **Dark theme**: Navy blue background with white text
- **Purple subtitle badge**: Optional accent element
- **Dual CTAs**: Primary (filled blue) and secondary (outlined) buttons
- **Responsive**: Stacks vertically on mobile with image on top
- **Semantic HTML**: Uses proper heading hierarchy

## Content Structure

### Fields (Universal Editor)
1. **Subtitle** (text, optional) - Purple accent badge above heading
2. **Heading** (text, required) - Main H2 heading
3. **Description** (richtext) - Body text content
4. **Primary CTA Link** (aem-content) - Main call-to-action link
5. **Primary Button Text** (text) - Text for primary CTA
6. **Secondary CTA Link** (aem-content, optional) - Secondary action link
7. **Secondary Button Text** (text, optional) - Text for secondary CTA
8. **Image** (reference) - Right column image
9. **Image Alt Text** (text) - Accessibility text for image

### Example Markup
```html
<div class="actiontile">
  <div><div>Subtitle</div></div>
  <div><div>H2 heading</div></div>
  <div><div>Lorem ipsum dolor sit amet...</div></div>
  <div><div><a href="/primary">Call to action</a></div></div>
  <div><div></div></div>
  <div><div><a href="/secondary">Call to action</a></div></div>
  <div><div></div></div>
  <div><div><picture>...</picture></div></div>
  <div><div></div></div>
</div>
```

## Design Tokens

### Colors
- Background: `#0c0930` (Navy)
- Subtitle badge: `#6956cc` (Purple)
- Primary button: `#1448ff` (Blue)
- Text: `#ffffff` (White)

### Typography
- **Subtitle**: National 2 Condensed Bold, 24px/32px
- **Heading**: National 2 Condensed Bold, 32px/40px
- **Body**: Roboto Serif Regular, 16px/26px
- **Button**: Roboto Serif Medium, 16px/24px

### Spacing
- Content padding: 40px 32px (desktop), 32px 24px (tablet), 24px 20px (mobile)
- Gap between elements: 24px (desktop), 16px (mobile)
- Button gap: 12px

## Responsive Behavior

### Desktop (> 900px)
- Two-column grid layout
- Image on right, content on left
- Full spacing and typography

### Tablet (≤ 900px)
- Single column stack
- Image appears first (top)
- Content appears second (bottom)
- Slightly reduced padding
- Buttons stack vertically and span full width

### Mobile (≤ 600px)
- Reduced font sizes
- Tighter spacing
- Image height reduced to 250px minimum

## Accessibility
- Semantic HTML structure with proper heading hierarchy
- Alt text required for images
- Focus states on interactive elements
- Sufficient color contrast (WCAG AA compliant)
- Keyboard navigable

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid support required
- Graceful degradation for older browsers

## Test File
See `drafts/actiontile-test.plain.html` for examples:
1. Full action tile with both CTAs
2. Action tile with only primary CTA
3. Action tile without subtitle
4. Minimal action tile

## Notes
- Subtitle is optional - block works without it
- Secondary CTA is optional
- Image should be 4:3 aspect ratio for best results
- Follows AEM Edge Delivery Services block pattern
- Compatible with Universal Editor authoring

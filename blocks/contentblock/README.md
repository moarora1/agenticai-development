# Content Block

A flexible content block that displays content with heading, description, call-to-action button, and image in a two-column layout with configurable variations. Features vibrant purple/teal gradient theme with neon effects.

## Features

✨ **Layout Variations**
- Image position: Left or Right
- Text alignment: Left, Center, or Right
- Image alignment: Top, Center, or Bottom

🎨 **Visual Design**
- Purple/magenta vertical separator with neon glow
- Gradient backgrounds (teal content, purple image overlay)
- Glowing wave effect connecting sections
- Modern, vibrant aesthetic

📱 **Responsive**
- Desktop: Two-column split layout
- Mobile: Stacked (image on top)
- Adaptive typography

## Usage in Universal Editor

Add a Content Block and configure:

### Content Fields
- **Heading** (required): Main title
- **Description**: Body text with rich formatting
- **Call to Action Link**: Button URL
- **Button Text**: Text for the CTA button
- **Image**: Hero image
- **Image Alt Text**: Accessible image description

### Layout Configuration
- **Image Position**: Right (default) or Left
- **Text Alignment**: Left (default), Center, or Right
- **Image Alignment**: Center (default), Top, or Bottom

## Content Model

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `heading` | text-input | Yes | Main title |
| `text` | richtext | No | Description with formatting |
| `cta` | aem-content | No | Call to action link URL |
| `ctaText` | text-input | No | Button label (embedded) |
| `image` | reference | No | Hero image |
| `imageAlt` | text-input | No | Image alt text (embedded) |
| `imagePosition` | select | No | Image on left or right |
| `textAlign` | select | No | Text alignment |
| `imageAlign` | select | No | Image vertical alignment |

**Note:** The last 3 fields are configuration options that control styling, not visible content rows.

## Implementation Details

### Layout Variations

**Image Position**
- **Right (default)**: Content on left, image on right, separator between
- **Left**: Image on left, content on right, separator between
- Controlled by CSS grid order and `.contentblock-image-left` class

**Text Alignment**
- **Left (default)**: Standard left-aligned text
- **Center**: Centered text and centered CTA button
- **Right**: Right-aligned text and right-aligned CTA button
- Applied via `.contentblock-text-center` or `.contentblock-text-right` classes

**Image Alignment**
- **Center (default)**: Image centered vertically in container
- **Top**: Image aligned to top with `object-position: top`
- **Bottom**: Image aligned to bottom with `object-position: bottom`
- Applied via `.contentblock-image-top` or `.contentblock-image-bottom` classes

### Visual Design

**Gradients:**
- Content column: `linear-gradient(135deg, #2c4a5e 0%, #1e3a4a 100%)` (teal)
- Image column: `linear-gradient(135deg, #5a189a 0%, #3c096c 50%, #240046 100%)` (purple)
- Separator: `linear-gradient(180deg, #9d4edd 0%, #7b2cbf 100%)` (purple/magenta)

**Effects:**
- 5px vertical separator with glow effect (blur filter)
- Radial gradient "neon wave" in center
- Purple overlay on image with luminosity blend mode
- Image desaturated for consistent brand look

### Responsive Behavior

**Desktop (>900px):**
- Three-column grid: content | separator | image
- Layout respects imagePosition setting
- Text alignment as configured
- All visual effects visible

**Mobile (≤900px):**
- Single column stack
- Image always on top, content below
- Text alignment resets to left
- Separator and neon effects hidden
- imagePosition ignored for consistent UX

### CSS Variables

Customize colors using CSS variables:

```css
/* Content column gradients */
--contentblock-content-bg-start: #2c4a5e;
--contentblock-content-bg-end: #1e3a4a;

/* Image column gradients */
--contentblock-image-bg-start: #5a189a;
--contentblock-image-bg-end: #240046;

/* Separator color */
--contentblock-separator-color: #9d4edd;

/* Neon glow effect */
--contentblock-glow-color: rgba(157, 78, 221, 0.3);

/* Button colors */
--color-button-background: #fff;
--color-button-text: #2c3e50;
--color-button-hover: #f0f0f0;

/* Text color */
--color-text-light: #fff;
```

## Layout Combinations

### Hero Style (Centered)
```
Image Position: Right
Text Alignment: Center
Image Alignment: Center
```

### Feature Callout (Image Left)
```
Image Position: Left
Text Alignment: Left
Image Alignment: Top
```

### Testimonial Style
```
Image Position: Right
Text Alignment: Right
Image Alignment: Center
```

### Announcement Banner
```
Image Position: Left
Text Alignment: Center
Image Alignment: Center
```

## Test Content

- **Standard tests**: `/drafts/contentblock-test`
- **Layout variations**: `/drafts/contentblock-variations-test`

The variations test includes 6 examples demonstrating different combinations of imagePosition, textAlign, and imageAlign.

Access during development:
- Regular view: `http://localhost:3000/drafts/contentblock-test`
- Plain HTML view: `http://localhost:3000/drafts/contentblock-test.plain.html`

Examples include:
- Full content with eyebrow text
- Feature announcement variant
- Content without eyebrow
- Minimal content example

## Design Reference

Based on Adelaide University GTM Design System pattern with:
- Two-column layout (50/50 split)
- Dark content background with light text
- Large hero image
- Clean typography hierarchy
- Prominent CTA button

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid layout
- CSS custom properties (variables)
- Picture element for responsive images

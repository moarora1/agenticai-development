# Content Block

A flexible content block that displays content with optional eyebrow text, heading, description, call-to-action button, and image in a two-column layout. Based on the Adelaide University GTM Design System.

## Usage

In Universal Editor, add a Content Block and fill in the fields:
- **Eyebrow Text** (optional): Small label above the heading (e.g., "What's new", "Announcement")
- **Heading** (required): Main title
- **Description**: Body text with optional formatting
- **Call to Action Link**: Button URL
- **Button Text**: Text for the CTA button
- **Image**: Hero image for the right column
- **Image Alt Text**: Accessible description of the image

## Content Model

**Universal Editor Component Model:**

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `eyebrow` | text-input | No | Small text above heading |
| `heading` | text-input | Yes | Main title |
| `text` | richtext-single | No | Description with formatting |
| `cta` | aem-content | No | Call to action link URL |
| `ctaText` | text-input | No | Button label (embedded) |
| `image` | reference | No | Hero image |
| `imageAlt` | text-input | No | Image alt text (embedded) |

**Expected DOM Structure:** 5 visible rows (or 4 if no eyebrow)

## Implementation Details

### Layout

- **Desktop**: Two-column grid layout (content left, image right)
- **Tablet/Mobile**: Stacked layout (image first, then content)
- **Responsive breakpoints**: 900px and 600px

### Styling

- Dark background on content column (customizable via CSS variables)
- Light text on dark background for contrast
- Responsive typography scaling
- Button with hover effects
- Image fills entire right column with object-fit cover

### CSS Variables

Customize colors using CSS variables:

```css
--color-background-dark: #2c3e50;  /* Content background */
--color-text-light: #fff;           /* Text color */
--color-button-background: #fff;    /* Button background */
--color-button-text: #2c3e50;       /* Button text */
--color-button-hover: #f0f0f0;      /* Button hover state */
```

### Features

- ✅ Universal Editor compatible
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Optional eyebrow text for flexibility
- ✅ Semantic HTML (h2 for heading)
- ✅ Accessible (proper alt text support)
- ✅ Smooth transitions and hover effects
- ✅ Graceful handling of missing content

### Files

- `_content-block.json` - Universal Editor component model
- `content-block.js` - Block decoration logic
- `content-block.css` - Block styles
- `README.md` - This documentation

## Test Content

Test content is available at: `/drafts/content-block-test`

Access during development:
- Regular view: `http://localhost:3000/drafts/content-block-test`
- Plain HTML view: `http://localhost:3000/drafts/content-block-test.plain.html`

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

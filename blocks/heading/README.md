# Heading Block

A simple, accessible heading block for displaying standalone headings with semantic HTML control and visual style variants.

## Features

- **Semantic HTML**: Choose heading levels (h1-h6) for proper document structure and accessibility
- **Style Variants**: Apply visual styles while maintaining semantic meaning
- **Responsive**: Adapts typography for mobile and tablet viewports
- **Lightweight**: Minimal JavaScript, CSS-driven styling

## Usage in Universal Editor

1. Add a **Section** to your page
2. Click **+** to add a component
3. Select **Heading** from the Blocks group
4. Configure the heading:
   - **Heading Text** (required): The text to display
   - **Heading Level**: Choose h1-h6 (defaults to h2)
   - **Style Variant**: Optional visual style

## Content Model

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Heading Text | text-input | Yes | The heading text to display |
| Heading Level | select | No | Semantic level (h1-h6), defaults to h2 |
| Style Variant | select | No | Visual style: Default, Accent, Large, or Subtle |

## Style Variants

### Default
Standard heading with responsive sizing based on heading level.

### Accent
- Centered alignment
- Accent color (customizable via CSS variables)
- Bottom border for emphasis

### Large
Increases font size by 25-50% for extra prominence.

### Subtle
- Lighter font weight (400 instead of 700)
- Reduced opacity
- Secondary text color

## CSS Customization

Customize the appearance using CSS variables:

```css
:root {
  --heading-font-family: 'Your Font', sans-serif;
  --heading-font-weight: 700;
  --heading-color: #000;
  --accent-color: #0066cc;
  --text-color-secondary: #666;
  
  /* Size variables */
  --heading-font-size-xxl: 3rem;    /* h1 */
  --heading-font-size-xl: 2.5rem;   /* h2 */
  --heading-font-size-l: 2rem;      /* h3 */
  --heading-font-size-m: 1.5rem;    /* h4 */
  --heading-font-size-s: 1.25rem;   /* h5 */
  --heading-font-size-xs: 1rem;     /* h6 */
}
```

## Accessibility

- Uses semantic HTML heading elements (h1-h6)
- Maintains proper document outline
- Respects user's font size preferences
- No reliance on color alone for meaning

## Test Content

Test content is available at:
- `/drafts/heading-test` - Multiple examples showing all heading levels and style variants

## Examples

### Simple h2 heading
```
Heading Text: Welcome to Our Website
Heading Level: h2
Style Variant: Default
```

### Prominent h1 with accent style
```
Heading Text: Main Page Title
Heading Level: h1
Style Variant: Accent
```

### Subtle h3 heading
```
Heading Text: Additional Information
Heading Level: h3
Style Variant: Subtle
```

## Best Practices

1. **Use semantic levels**: Choose heading levels based on document structure, not visual appearance
2. **Only one h1**: Each page should typically have only one h1 heading
3. **Sequential levels**: Don't skip heading levels (e.g., h2 → h4)
4. **Style for appearance**: Use style variants to achieve the visual design while maintaining semantic structure
5. **Consider context**: Headings provide structure for screen readers and SEO

## Browser Support

Works in all modern browsers with CSS Grid support (IE11+).

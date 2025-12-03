# Hero Banner Block

A full-width hero banner block with background image, title, subtitle, description, and call-to-action buttons.

## Universal Editor Configuration

✅ **Authorable properties configured in:**
- `blocks/hero-banner/_hero-banner.json` - **Primary configuration** (definitions, models, filters)
  - This is the single source of truth for the hero-banner component
  - Contains all Universal Editor field definitions
  - Colocated with the block code for easy maintenance

**Note**: The global files (`component-models.json` and `component-definition.json`) do NOT contain hero-banner configuration. The block-level `_hero-banner.json` file is the canonical source.

### Editable Fields in Universal Editor

Authors can edit the following properties:
- **Background Image** - Reference to background image asset
- **Image Alt Text** - Accessibility text for the background image  
- **Title** - Main heading (H1)
- **Subtitle** - Secondary heading (H2)
- **Description and CTAs** - Rich text field for description text and call-to-action links

## Content Model

**Block Type:** Standalone

### Structure

| Hero-Banner |
|-------------|
| ![Background image](image.jpg) |
| # Main Title |
| ## Subtitle |
| Description text. [Primary CTA](link) [Secondary CTA](link) |

### Elements

- **Background Image**: Full-width background image (recommended minimum 2000px wide)
- **Title**: H1 heading for the main title
- **Subtitle**: H2 heading for the subtitle
- **Description**: Paragraph text for descriptive content
- **Primary CTA**: First link (styled with solid background)
- **Secondary CTA**: Second link (styled with outline)

## Features

- Fully responsive design (mobile, tablet, desktop)
- Text shadow for readability over images
- Flexible content structure - decoration code handles various layouts
- Centered text layout with max-width content area
- Accessible semantic HTML structure

## Usage

The hero-banner block is flexible and accepts content in various structures:

### Standard Layout
```
| Hero-Banner |
|-------------|
| ![Image](hero.jpg) |
| # Welcome to Our Site |
| ## Making Your Life Easier |
| Description text here. [Get Started](/start) [Learn More](/info) |
```

### Separated Rows
```
| Hero-Banner |
|-------------|
| ![Image](hero.jpg) |
| # Welcome |
| ## Making Life Easier |
| Description text. [Get Started](/start) [Learn More](/info) |
```

### Minimal (One CTA)
```
| Hero-Banner |
|-------------|
| ![Image](hero.jpg) |
| # Welcome |
| ## Making Life Easier |
| Get started today. [Sign Up](/signup) |
```

## Styling Notes

- All selectors are scoped to `.hero-banner`
- Uses CSS custom properties from global styles
- Mobile-first responsive approach
- Breakpoints: 600px (tablet), 900px (desktop), 1200px (large desktop)
- Text color defaults to white with shadow for contrast

## Test Content

Test content is available at `/drafts/hero-banner-test.plain.html` showing multiple variations.

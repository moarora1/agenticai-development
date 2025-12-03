# Twitter Block

Embeds a Twitter timeline widget on a page, displaying tweets from a specific Twitter/X profile.

## Universal Editor Configuration

This block uses Universal Editor with a single-field content model:

**Component Model:** `blocks/twitter/_twitter.json`

**Field:**
- `url` (text-input) - Twitter profile URL, username, or timeline URL

## Usage

Add a Twitter block in the Universal Editor and provide one of the following:

1. **Full Twitter URL:** `https://twitter.com/Adobe`
2. **X.com URL:** `https://x.com/github`
3. **Username with @:** `@AdobeExpCloud`
4. **Plain username:** `deloitte`

The block will automatically extract the username and embed the profile's timeline.

## Supported Formats

- Twitter profile URLs: `https://twitter.com/username`
- X.com profile URLs: `https://x.com/username`
- Username with @: `@username`
- Plain username: `username`

## Features

- Automatically detects and extracts username from various input formats
- Loads Twitter widgets.js script for timeline rendering
- Responsive design with centered layout
- Maximum width of 600px for optimal readability
- Mobile-optimized layout
- Default height of 600px with clean chrome (no header/footer)

## Implementation Details

### Row-Per-Field Structure

Universal Editor creates one row for the single `url` field:

```html
<div class="twitter">
  <div><div>https://twitter.com/Adobe</div></div>  <!-- Row 0: url field -->
</div>
```

### Decoration Logic

The `twitter.js` decoration function:
1. Extracts the URL/username from row 0
2. Parses and validates the input
3. Extracts the Twitter username
4. Creates a Twitter timeline anchor element
5. Loads the Twitter widgets.js script
6. Renders the timeline widget

### Styling

The `twitter.css` file provides:
- Centered timeline layout
- Responsive design for mobile devices
- Loading and error states
- Maximum width constraints

## Testing

Test content is available at: `drafts/twitter-test.plain.html`

To test locally:
```bash
aem up --html-folder drafts
```

Then visit: `http://localhost:3000/drafts/twitter-test`

## Examples

### Basic Usage
```html
<div class="twitter">
  <div><div>Adobe</div></div>
</div>
```

### With Full URL
```html
<div class="twitter">
  <div><div>https://twitter.com/AdobeExpCloud</div></div>
</div>
```

## Dependencies

- Twitter widgets.js: Loaded automatically by the block
- No additional dependencies required

## Browser Compatibility

Works in all modern browsers that support Twitter/X embed widgets.

## Notes

- The block uses Twitter's official embed widgets API
- Timeline height is set to 600px by default
- Chrome options remove header, footer, and borders for a cleaner look
- The script is loaded once per page, even if multiple Twitter blocks are present

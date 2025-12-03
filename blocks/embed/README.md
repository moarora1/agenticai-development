# Embed Block

A versatile embed block for displaying content from Instagram, YouTube, Twitter, and other embeddable platforms.

## Universal Editor Configuration

✅ **Authorable properties configured in:**
- `blocks/embed/_embed.json` - Component model with single URL field

### Editable Fields in Universal Editor

Authors can edit:
- **Embed URL** - URL to Instagram post/reel, YouTube video, Twitter post, or other embeddable content

## Content Model

**Block Type:** Standalone (Universal Editor)

### Universal Editor Structure

The block has a single field:

| Row | Field | Type | Description |
|-----|-------|------|-------------|
| 0 | url | text | URL to embed (Instagram, YouTube, Twitter, etc.) |

### How It Works

1. Author pastes URL in the Universal Editor
2. Decoration code detects the platform (Instagram, YouTube, Twitter)
3. Generates appropriate embed iframe or widget
4. Loads platform-specific scripts if needed

## Supported Platforms

### Instagram
- Post URLs: `https://www.instagram.com/p/[post-id]/`
- Reel URLs: `https://www.instagram.com/reel/[reel-id]/`
- Automatically loads Instagram embed.js script

### YouTube
- Standard URLs: `https://www.youtube.com/watch?v=[video-id]`
- Short URLs: `https://youtu.be/[video-id]`
- Responsive 16:9 aspect ratio

### Twitter/X
- Tweet URLs: `https://twitter.com/[user]/status/[tweet-id]`
- X.com URLs: `https://x.com/[user]/status/[tweet-id]`
- Automatically loads Twitter widgets.js script

### Generic
- Any other URL will attempt a basic iframe embed

## Features

- Fully responsive design
- Platform-specific styling and aspect ratios
- Lazy loading for performance
- Automatic script loading for social platforms
- Centered layout with max-width constraints

## Usage

### In Universal Editor

1. Add Embed block to page
2. Paste the social media URL in the URL field
3. Save and publish

### Example URLs

**Instagram Post:**
```
https://www.instagram.com/p/CxOWiQNP7Xj/
```

**Instagram Reel:**
```
https://www.instagram.com/reel/CzN8KQvPqRs/
```

**YouTube Video:**
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

**Twitter Post:**
```
https://twitter.com/user/status/1234567890
```

## Implementation Details

### JavaScript Decoration

The block:
1. Extracts URL from row 0 (handles both plain text and link elements)
2. Detects platform using URL parsing
3. Creates platform-specific embed element
4. Loads required scripts (Instagram, Twitter)
5. Wraps in responsive container

### Platform Detection

- **Instagram:** Matches `/p/` or `/reel/` patterns
- **YouTube:** Detects `youtube.com` or `youtu.be` domains
- **Twitter:** Detects `twitter.com` or `x.com` domains
- **Generic:** Falls back to basic iframe for unknown URLs

### Responsive Behavior

- Instagram embeds: Max-width 540px, centered
- YouTube embeds: Responsive 16:9 aspect ratio
- Twitter embeds: Max-width 550px, centered
- Generic embeds: Max-width 800px with border

## Styling Notes

- All selectors scoped to `.embed`
- Platform-specific classes: `.embed-instagram`, `.embed-youtube`, `.embed-twitter`
- Mobile-first responsive design
- Loading state shows "Loading embed..." message
- Error handling for invalid URLs

## Testing

Test content available at: `drafts/embed-test.plain.html`

Includes examples of:
- Instagram post URLs
- Instagram reel URLs  
- YouTube video URLs
- URLs rendered as links (Universal Editor pattern)

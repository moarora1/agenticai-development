/**
 * Loads and embeds a Twitter timeline widget
 * Supports Twitter/X profile URLs, usernames, and timeline URLs
 * @param {Element} block The twitter block element
 */

const loadTwitterScript = () => {
  if (window.twitterWidgetsLoaded) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    script.onload = () => {
      window.twitterWidgetsLoaded = true;
      resolve();
    };
    document.head.append(script);
  });
};

/**
 * Extract username from various Twitter URL formats or plain username
 * @param {string} input - Twitter URL or username
 * @returns {string} - Clean username without @
 */
const extractUsername = (input) => {
  if (!input) return null;

  const trimmed = input.trim();

  // Handle direct username with @
  if (trimmed.startsWith('@')) {
    return trimmed.substring(1);
  }

  // Handle plain username (no special characters)
  if (!trimmed.includes('/') && !trimmed.includes('.')) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const { hostname, pathname } = url;

    // Verify it's a Twitter/X URL
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      // Extract username from pathname (e.g., /username or /username/status/123)
      const pathParts = pathname.split('/').filter((part) => part);
      if (pathParts.length > 0) {
        return pathParts[0];
      }
    }
  } catch (error) {
    // If URL parsing fails, might be a plain username
    return trimmed.replace(/[^a-zA-Z0-9_]/g, '');
  }

  return null;
};

/**
 * Create Twitter timeline embed
 * @param {string} username - Twitter username
 * @returns {HTMLElement} - Timeline container
 */
const createTwitterTimeline = (username) => {
  const timeline = document.createElement('a');
  timeline.className = 'twitter-timeline';
  timeline.href = `https://twitter.com/${username}`;
  timeline.setAttribute('data-height', '600');
  timeline.setAttribute('data-chrome', 'noheader nofooter noborders');
  timeline.textContent = `Tweets by @${username}`;

  return timeline;
};

export default async function decorate(block) {
  // Universal Editor row-per-field structure:
  // Row 0: url field (text or link)
  const rows = [...block.children];
  if (rows.length === 0) {
    block.textContent = 'No Twitter profile specified';
    return;
  }

  // Extract URL/username from first row
  const urlRow = rows[0];
  const link = urlRow.querySelector('a');
  const input = link ? link.href : urlRow.textContent.trim();

  if (!input) {
    block.textContent = 'No Twitter profile specified';
    return;
  }

  // Extract username from input
  const username = extractUsername(input);

  if (!username) {
    block.textContent = 'Invalid Twitter profile or URL';
    return;
  }

  // Clear the block
  block.textContent = '';

  try {
    // Create timeline element
    const timeline = createTwitterTimeline(username);

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'twitter-timeline-wrapper';
    wrapper.append(timeline);

    block.append(wrapper);

    // Load Twitter widgets script and render timeline
    await loadTwitterScript();

    // Trigger Twitter widget rendering
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load(block);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating Twitter timeline:', error);
    block.textContent = 'Unable to load Twitter timeline. Please check the URL.';
  }
}

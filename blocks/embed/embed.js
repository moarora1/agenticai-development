/**
 * Loads and embeds external content from various platforms
 * Supports Instagram, YouTube, Twitter, and other embeddable URLs
 * @param {Element} block The embed block element
 */

const loadScript = (url, callback) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  if (callback) {
    script.onload = callback;
  }
  document.head.append(script);
};

const getURLConfig = (url) => {
  const urlObj = new URL(url);
  const { hostname, pathname } = urlObj;

  // Instagram
  if (hostname.includes('instagram.com')) {
    // Handle both /p/ (posts) and /reel/ (reels)
    const match = pathname.match(/\/(p|reel)\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return {
        type: 'instagram',
        embedUrl: `https://www.instagram.com/${match[1]}/${match[2]}/embed`,
      };
    }
  }

  // YouTube
  if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
    let videoId;
    if (hostname.includes('youtu.be')) {
      videoId = pathname.substring(1);
    } else {
      const params = new URLSearchParams(urlObj.search);
      videoId = params.get('v');
    }
    if (videoId) {
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
      };
    }
  }

  // Twitter/X
  if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
    return {
      type: 'twitter',
      embedUrl: url,
    };
  }

  // Default: try generic iframe embed
  return {
    type: 'generic',
    embedUrl: url,
  };
};

const createInstagramEmbed = (embedUrl) => {
  const iframe = document.createElement('iframe');
  iframe.src = embedUrl;
  iframe.className = 'instagram-embed';
  iframe.style.width = '100%';
  iframe.style.maxWidth = '540px';
  iframe.style.minHeight = '600px';
  iframe.style.border = 'none';
  iframe.style.overflow = 'hidden';
  iframe.scrolling = 'no';
  iframe.frameBorder = '0';
  iframe.loading = 'lazy';
  iframe.title = 'Instagram Post';

  // Load Instagram embed script
  if (!window.instagramScriptLoaded) {
    loadScript('https://www.instagram.com/embed.js');
    window.instagramScriptLoaded = true;
  }

  return iframe;
};

const createYouTubeEmbed = (embedUrl) => {
  const iframe = document.createElement('iframe');
  iframe.src = embedUrl;
  iframe.className = 'youtube-embed';
  iframe.width = '560';
  iframe.height = '315';
  iframe.frameBorder = '0';
  iframe.loading = 'lazy';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.title = 'YouTube Video';

  return iframe;
};

const createTwitterEmbed = (tweetUrl) => {
  const blockquote = document.createElement('blockquote');
  blockquote.className = 'twitter-tweet';
  const link = document.createElement('a');
  link.href = tweetUrl;
  blockquote.append(link);

  // Load Twitter widget script
  if (!window.twitterScriptLoaded) {
    loadScript('https://platform.twitter.com/widgets.js');
    window.twitterScriptLoaded = true;
  }

  return blockquote;
};

const createGenericEmbed = (embedUrl) => {
  const iframe = document.createElement('iframe');
  iframe.src = embedUrl;
  iframe.className = 'generic-embed';
  iframe.style.width = '100%';
  iframe.style.minHeight = '400px';
  iframe.style.border = 'none';
  iframe.loading = 'lazy';
  iframe.title = 'Embedded Content';

  return iframe;
};

export default async function decorate(block) {
  // Universal Editor row-per-field structure:
  // Row 0: url field (text or link)
  const rows = [...block.children];
  if (rows.length === 0) return;

  // Extract URL from first row
  // URL might be plain text or a link element
  const urlRow = rows[0];
  const link = urlRow.querySelector('a');
  const url = link ? link.href : urlRow.textContent.trim();

  if (!url) {
    block.textContent = 'No embed URL provided';
    return;
  }

  // Clear the block
  block.textContent = '';

  try {
    const config = getURLConfig(url);
    let embedElement;

    switch (config.type) {
      case 'instagram':
        embedElement = createInstagramEmbed(config.embedUrl);
        break;
      case 'youtube':
        embedElement = createYouTubeEmbed(config.embedUrl);
        break;
      case 'twitter':
        embedElement = createTwitterEmbed(config.embedUrl);
        break;
      default:
        embedElement = createGenericEmbed(config.embedUrl);
    }

    // Create wrapper for centering and responsive behavior
    const wrapper = document.createElement('div');
    wrapper.className = `embed-wrapper embed-${config.type}`;
    wrapper.append(embedElement);

    block.append(wrapper);
    block.classList.add(`embed-${config.type}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating embed:', error);
    block.textContent = 'Unable to load embed. Please check the URL.';
  }
}

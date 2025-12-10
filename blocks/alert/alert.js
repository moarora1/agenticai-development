/**
 * Get SVG icon based on theme
 * @param {string} theme - The alert theme
 * @returns {string} SVG markup
 */
function getIconForTheme(theme) {
  const icons = {
    neutral: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    warning: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55297 18.6453 1.55199 18.9945C1.55101 19.3437 1.64149 19.6871 1.81442 19.9905C1.98735 20.2939 2.23673 20.5467 2.53771 20.7239C2.83868 20.901 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5467 22.0127 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 9V13M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    information: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 16V12M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    success: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    error: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M15 9L9 15M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  };
  return icons[theme] || icons.neutral;
}

/**
 * Decorate the alert block
 * Expected structure:
 * Row 0: alert group with 7 nested divs
 * (type, theme, title, description, ctaText, ctaLink, showClose)
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Extract grouped fields from row 0
  const alertGroup = rows[0];
  const groupDivs = alertGroup ? [...alertGroup.children[0].children] : [];

  const type = groupDivs[0]?.textContent.trim() || 'banner';
  const theme = groupDivs[1]?.textContent.trim() || 'neutral';
  const title = groupDivs[2]?.textContent.trim() || '';
  const description = groupDivs[3]?.textContent.trim() || '';
  const ctaText = groupDivs[4]?.textContent.trim() || '';
  const ctaLink = groupDivs[5]?.textContent.trim() || '';
  const showClose = groupDivs[6]?.textContent.trim() === 'true';

  // Clear the block
  block.innerHTML = '';

  // Apply alert classes
  block.classList.add(`alert-${type}`);
  block.classList.add(`alert-${theme}`);

  // Create alert container
  const container = document.createElement('div');
  container.className = 'alert-container';
  container.setAttribute('role', 'alert');
  container.setAttribute('aria-live', 'polite');

  // Create header wrapper for icon, content, and close button
  const header = document.createElement('div');
  header.className = 'alert-header';

  // Create icon element based on theme
  const icon = document.createElement('div');
  icon.className = 'alert-icon';
  icon.innerHTML = getIconForTheme(theme);
  header.appendChild(icon);

  // Create content wrapper
  const content = document.createElement('div');
  content.className = 'alert-content';

  // Add title
  if (title) {
    const titleEl = document.createElement('div');
    titleEl.className = 'alert-title';
    titleEl.textContent = title;
    content.appendChild(titleEl);
  }

  // Add description
  if (description) {
    const descEl = document.createElement('div');
    descEl.className = 'alert-description';
    descEl.textContent = description;
    content.appendChild(descEl);
  }

  header.appendChild(content);

  // Add close button to header
  if (showClose) {
    const closeButton = document.createElement('button');
    closeButton.className = 'alert-close';
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('aria-label', 'Close alert');
    closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    closeButton.addEventListener('click', () => {
      block.style.display = 'none';
    });

    header.appendChild(closeButton);
  }

  container.appendChild(header);

  // Add CTA button (banner type only) - below the header
  if (type === 'banner' && ctaText && ctaLink) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'alert-cta';

    const ctaButton = document.createElement('a');
    ctaButton.href = ctaLink;
    ctaButton.className = 'alert-button';
    ctaButton.textContent = ctaText;
    ctaWrapper.appendChild(ctaButton);

    container.appendChild(ctaWrapper);
  }

  block.appendChild(container);
}

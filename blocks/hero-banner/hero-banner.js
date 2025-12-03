/**
 * decorates the hero-banner block
 * @param {Element} block the hero-banner block element
 */
export default async function decorate(block) {
  // Extract elements using semantic selectors
  const picture = block.querySelector('picture');
  const h1 = block.querySelector('h1');
  const h2 = block.querySelector('h2');
  const links = block.querySelectorAll('a');

  // Create the hero-banner structure
  const heroContent = document.createElement('div');
  heroContent.className = 'hero-banner-content';

  // Add background image
  if (picture) {
    const heroBackground = document.createElement('div');
    heroBackground.className = 'hero-banner-background';
    heroBackground.append(picture);
    block.prepend(heroBackground);
  }

  // Add text content wrapper
  const heroText = document.createElement('div');
  heroText.className = 'hero-banner-text';

  // Add title
  if (h1) {
    h1.className = 'hero-banner-title';
    heroText.append(h1);
  }

  // Add subtitle
  if (h2) {
    h2.className = 'hero-banner-subtitle';
    heroText.append(h2);
  }

  // Collect all remaining content (paragraphs, etc.) that aren't titles
  // Don't include elements we've already moved
  const remainingContent = [...block.querySelectorAll('p, div > *')]
    .filter((el) => el !== h1 && el !== h2 && !el.closest('.hero-banner-background'));

  // Create description wrapper
  if (remainingContent.length > 0) {
    const description = document.createElement('div');
    description.className = 'hero-banner-description';
    remainingContent.forEach((el) => {
      // Skip if element only contains links (CTAs)
      if (el.tagName === 'P' && el.querySelectorAll('a').length > 0 && !el.textContent.trim().replace(/\s+/g, ' ').match(/[^\s]/)) {
        // This paragraph only has links, skip it for description
      } else if (el.tagName === 'P' && el.querySelector('a')) {
        // This paragraph has both text and links - extract text only
        const textNode = document.createElement('p');
        textNode.innerHTML = el.innerHTML.replace(/<a[^>]*>.*?<\/a>/gi, '').trim();
        if (textNode.textContent.trim()) {
          description.append(textNode);
        }
      } else if (!el.querySelector('a')) {
        description.append(el);
      }
    });
    if (description.children.length > 0) {
      heroText.append(description);
    }
  }

  // Add CTAs
  if (links.length > 0) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'hero-banner-ctas';

    links.forEach((link, index) => {
      // First link is primary, second is secondary
      if (index === 0) {
        link.className = 'button primary';
      } else if (index === 1) {
        link.className = 'button secondary';
      } else {
        link.className = 'button';
      }
      ctaWrapper.append(link);
    });

    heroText.append(ctaWrapper);
  }

  heroContent.append(heroText);

  // Replace block content with new structure
  block.textContent = '';
  if (block.querySelector('.hero-banner-background')) {
    block.append(block.querySelector('.hero-banner-background'));
  }
  block.append(heroContent);
}

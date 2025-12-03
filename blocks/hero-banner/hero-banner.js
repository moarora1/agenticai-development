/**
 * decorates the hero-banner block
 * @param {Element} block the hero-banner block element
 */
export default async function decorate(block) {
  // Universal Editor creates block content as rows with divs
  // Structure: block > div (row) > div (cells)
  // Expected cells: [image, imageAlt, title, subtitle, text]

  const rows = [...block.children];
  if (rows.length === 0) return;

  // Get the first (and typically only) row of content
  const cells = [...rows[0].children];

  // Extract values from cells based on the model definition order
  const picture = cells[0]?.querySelector('picture');
  const titleText = cells[1]?.textContent?.trim() || '';
  const subtitleText = cells[2]?.textContent?.trim() || '';
  const richText = cells[3]; // This contains description and CTAs

  // Clear the block
  block.textContent = '';

  // Add background image if present
  if (picture) {
    const heroBackground = document.createElement('div');
    heroBackground.className = 'hero-banner-background';
    heroBackground.append(picture);
    block.append(heroBackground);
  }

  // Create content wrapper
  const heroContent = document.createElement('div');
  heroContent.className = 'hero-banner-content';

  const heroText = document.createElement('div');
  heroText.className = 'hero-banner-text';

  // Create and add title (H1)
  if (titleText) {
    const h1 = document.createElement('h1');
    h1.className = 'hero-banner-title';
    h1.textContent = titleText;
    heroText.append(h1);
  }

  // Create and add subtitle (H2)
  if (subtitleText) {
    const h2 = document.createElement('h2');
    h2.className = 'hero-banner-subtitle';
    h2.textContent = subtitleText;
    heroText.append(h2);
  }

  // Add description and CTAs from rich text field
  if (richText) {
    const description = document.createElement('div');
    description.className = 'hero-banner-description';

    // Extract paragraphs (description)
    const paragraphs = richText.querySelectorAll('p');
    paragraphs.forEach((p) => {
      if (!p.querySelector('a') || p.textContent.trim().length > 0) {
        const descPara = p.cloneNode(true);
        // Remove links from description paragraphs
        descPara.querySelectorAll('a').forEach((a) => a.remove());
        if (descPara.textContent.trim()) {
          description.append(descPara);
        }
      }
    });

    if (description.children.length > 0) {
      heroText.append(description);
    }

    // Extract CTAs (links)
    const links = richText.querySelectorAll('a');
    if (links.length > 0) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.className = 'hero-banner-ctas';

      links.forEach((link, index) => {
        const ctaLink = link.cloneNode(true);
        // First link is primary, second is secondary
        if (index === 0) {
          ctaLink.className = 'button primary';
        } else if (index === 1) {
          ctaLink.className = 'button secondary';
        } else {
          ctaLink.className = 'button';
        }
        ctaWrapper.append(ctaLink);
      });

      heroText.append(ctaWrapper);
    }
  }

  heroContent.append(heroText);
  block.append(heroContent);
}

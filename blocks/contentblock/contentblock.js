/**
 * Content Block
 * Displays content with heading, description, call-to-action button,
 * and image in a two-column layout with configurable positioning and alignment.
 *
 * Due to element grouping (contentblock_ prefix), the structure is:
 * Row 0: contentblock group (heading, text, cta, ctaText, textAlign as child divs)
 * Row 1: image (with imageAlt embedded)
 * Row 2: imagePosition
 * Row 3: imageAlign
 */

export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: contentblock group contains heading, text, cta, ctaText, textAlign
  const contentblockGroup = rows[0];
  // Row 1: image (with imageAlt)
  const imageRow = rows[1];
  // Row 2: imagePosition
  const imagePositionRow = rows[2];
  // Row 3: imageAlign
  const imageAlignRow = rows[3];

  // Get configuration values
  const imagePosition = imagePositionRow?.textContent.trim() || '';
  const imageAlign = imageAlignRow?.textContent.trim() || '';

  // Apply variant classes
  if (imagePosition === 'left') {
    block.classList.add('contentblock-image-left');
  }

  if (imageAlign) {
    block.classList.add(`contentblock-image-${imageAlign}`);
  }

  // Create content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'contentblock-content';

  // Extract fields from the contentblock group
  if (contentblockGroup) {
    const groupDivs = [...contentblockGroup.children[0].children];

    // groupDivs[0] = heading
    // groupDivs[1] = text
    // groupDivs[2] = cta
    // groupDivs[3] = ctaText (embedded, won't create visible row)
    // groupDivs[4] = textAlign

    // Get textAlign value from grouped field
    const textAlign = groupDivs[4]?.textContent.trim() || '';
    if (textAlign) {
      block.classList.add(`contentblock-text-${textAlign}`);
    }

    // Add heading
    if (groupDivs[0]) {
      const heading = groupDivs[0];
      heading.className = 'contentblock-heading';
      // Wrap in h2 for semantic HTML
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      heading.textContent = '';
      heading.append(h2);
      contentWrapper.append(heading);
    }

    // Add text/description
    if (groupDivs[1]) {
      const text = groupDivs[1];
      text.className = 'contentblock-text';
      contentWrapper.append(text);
    }

    // Add CTA button
    if (groupDivs[2]) {
      const ctaCell = groupDivs[2];
      const link = ctaCell.querySelector('a');
      if (link) {
        link.className = 'contentblock-cta button primary';
        ctaCell.className = 'contentblock-cta-wrapper';
        contentWrapper.append(ctaCell);
      }
    }
  }

  // Create image wrapper
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'contentblock-image';

  if (imageRow) {
    const imageCell = imageRow.querySelector('div');
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        imageWrapper.append(picture);
      }
    }
  }

  // Clear block and rebuild with new structure
  // Grid: content | separator | image (or reversed based on imagePosition)
  block.textContent = '';

  // Create separator
  const separator = document.createElement('div');
  separator.className = 'contentblock-separator';
  separator.setAttribute('aria-hidden', 'true');

  // Append in correct order based on imagePosition
  if (imagePosition === 'left') {
    block.append(imageWrapper, separator, contentWrapper);
  } else {
    block.append(contentWrapper, separator, imageWrapper);
  }
}

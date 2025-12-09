/**
 * Content Block
 * Displays content with optional eyebrow text, heading, description,
 * call-to-action button, and image in a two-column layout.
 */

export default function decorate(block) {
  // Row structure (Universal Editor row-per-field):
  // Row 0: eyebrow (optional)
  // Row 1: heading
  // Row 2: text/description
  // Row 3: cta link (with ctaText embedded)
  // Row 4: image (with imageAlt embedded)

  const rows = [...block.children];

  // Detect content structure - eyebrow is optional
  let eyebrowRow = null;
  let headingRow;
  let textRow;
  let ctaRow;
  let imageRow;

  // Check if first row is eyebrow (typically short text)
  if (rows.length === 5) {
    // Full content with eyebrow
    [eyebrowRow, headingRow, textRow, ctaRow, imageRow] = rows;
  } else if (rows.length === 4) {
    // No eyebrow text
    [headingRow, textRow, ctaRow, imageRow] = rows;
  } 

  // Create content wrapper (left column)
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'contentblock-content';

  // Add eyebrow if present
  if (eyebrowRow) {
    const eyebrow = eyebrowRow.querySelector('div');
    if (eyebrow && eyebrow.textContent.trim()) {
      eyebrow.className = 'contentblock-eyebrow';
      contentWrapper.append(eyebrow);
    }
  }

  // Add heading
  if (headingRow) {
    const heading = headingRow.querySelector('div');
    if (heading) {
      heading.className = 'contentblock-heading';
      // Wrap in h2 for semantic HTML
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      heading.textContent = '';
      heading.append(h2);
      contentWrapper.append(heading);
    }
  }

  // Add text/description
  if (textRow) {
    const text = textRow.querySelector('div');
    if (text) {
      text.className = 'contentblock-text';
      contentWrapper.append(text);
    }
  }

  // Add CTA button
  if (ctaRow) {
    const ctaCell = ctaRow.querySelector('div');
    if (ctaCell) {
      const link = ctaCell.querySelector('a');
      if (link) {
        link.className = 'contentblock-cta button primary';
        ctaCell.className = 'contentblock-cta-wrapper';
        contentWrapper.append(ctaCell);
      }
    }
  }

  // Create image wrapper (right column)
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
  block.textContent = '';
  block.append(contentWrapper, imageWrapper);
}

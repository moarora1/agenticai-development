/**
 * Action Tile Block
 * A two-column layout with content (subtitle, heading, description, CTAs) on the left
 * and an image on the right, with a dark navy background.
 *
 * Due to element grouping (actiontile_ prefix), the structure is:
 * Row 0: actiontile group (subtitle, heading, text, primaryCta, primaryCtaText,
 *        secondaryCta, secondaryCtaText as child divs)
 * Row 1: image (with imageAlt embedded)
 */

export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: actiontile group contains all content fields
  const actiontileGroup = rows[0];
  // Row 1: image (with imageAlt embedded)
  const imageRow = rows[1];

  // Create content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'actiontile-content';

  // Extract fields from the actiontile group
  if (actiontileGroup) {
    const groupDivs = [...actiontileGroup.children[0].children];

    // groupDivs[0] = subtitle
    // groupDivs[1] = heading
    // groupDivs[2] = text
    // groupDivs[3] = primaryCta
    // groupDivs[4] = primaryCtaText (embedded)
    // groupDivs[5] = secondaryCta
    // groupDivs[6] = secondaryCtaText (embedded)

    // Add subtitle (purple badge) if present
    const subtitle = groupDivs[0];
    if (subtitle && subtitle.textContent.trim()) {
      subtitle.className = 'actiontile-subtitle';
      contentWrapper.append(subtitle);
    }

    // Add heading (required)
    const heading = groupDivs[1];
    if (heading) {
      heading.className = 'actiontile-heading';
      // Wrap in h2 for semantic HTML
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      heading.textContent = '';
      heading.append(h2);
      contentWrapper.append(heading);
    }

    // Add description text
    const text = groupDivs[2];
    if (text) {
      text.className = 'actiontile-text';
      contentWrapper.append(text);
    }

    // Create button group for CTAs
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'actiontile-button-group';

    // Add primary CTA
    const primaryCta = groupDivs[3];
    if (primaryCta) {
      const link = primaryCta.querySelector('a');
      if (link) {
        link.className = 'actiontile-cta button primary';
        const ctaWrapper = document.createElement('div');
        ctaWrapper.className = 'actiontile-cta-wrapper';
        ctaWrapper.append(link);
        buttonGroup.append(ctaWrapper);
      }
    }

    // Add secondary CTA if present
    const secondaryCta = groupDivs[5];
    if (secondaryCta) {
      const link = secondaryCta.querySelector('a');
      if (link && link.href && link.textContent.trim()) {
        link.className = 'actiontile-cta button secondary';
        const ctaWrapper = document.createElement('div');
        ctaWrapper.className = 'actiontile-cta-wrapper';
        ctaWrapper.append(link);
        buttonGroup.append(ctaWrapper);
      }
    }

    // Only append button group if it has children
    if (buttonGroup.children.length > 0) {
      contentWrapper.append(buttonGroup);
    }
  }

  // Create image wrapper
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'actiontile-image';

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

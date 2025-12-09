/**
 * Decorates the heading block
 * @param {Element} block The heading block element
 */
export default function decorate(block) {
  // Extract content from row-per-field structure
  const rows = [...block.children];

  // Get heading text (required, row 1)
  const headingText = rows[0]?.textContent.trim() || '';

  // Get heading level (optional, row 2) - defaults to h2
  const headingLevel = rows[1]?.textContent.trim().toLowerCase() || 'h2';

  // Get style variant (optional, row 3)
  const styleVariant = rows[2]?.textContent.trim() || '';

  // Validate heading level
  const validLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const level = validLevels.includes(headingLevel) ? headingLevel : 'h2';

  // Clear the block content
  block.innerHTML = '';

  // Create the heading element
  const heading = document.createElement(level);
  heading.textContent = headingText;

  // Add style variant class if specified
  if (styleVariant) {
    block.classList.add(`heading-${styleVariant}`);
  }

  // Append the heading to the block
  block.appendChild(heading);
}

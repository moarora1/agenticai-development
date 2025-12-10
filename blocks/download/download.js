import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorate the download block
 * Expected structure:
 * Row 0: download group with 5 nested divs (title, description, tags, link, text)
 * Row 1: image (optional)
 * Row 2: layout variant (vertical|horizontal)
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Extract grouped fields from row 0
  const downloadGroup = rows[0];
  const groupDivs = downloadGroup ? [...downloadGroup.children[0].children] : [];

  const title = groupDivs[0]?.textContent.trim() || '';
  const description = groupDivs[1]?.textContent.trim() || '';
  const tags = groupDivs[2]?.textContent.trim() || '';
  const downloadLink = groupDivs[3]?.textContent.trim() || '';
  const downloadText = groupDivs[4]?.textContent.trim() || 'Download';

  // Extract image from row 1
  const imageCell = rows[1]?.children[0];
  const picture = imageCell?.querySelector('picture');
  const img = imageCell?.querySelector('img');
  const imageAlt = img?.getAttribute('alt') || '';

  // Extract layout variant from row 2
  const layoutCell = rows[2]?.children[0];
  const layout = layoutCell?.textContent.trim() || 'vertical';

  // Clear the block
  block.innerHTML = '';

  // Apply layout class
  block.classList.add(`download-${layout}`);

  // Create the download container
  const container = document.createElement('div');
  container.className = 'download-container';

  // Create image section (if image exists)
  if (picture) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'download-image';

    // Optimize the image
    const optimizedPicture = createOptimizedPicture(img.src, imageAlt, false, [{ width: '160' }]);
    imageWrapper.appendChild(optimizedPicture);

    container.appendChild(imageWrapper);
  }

  // Create content section
  const content = document.createElement('div');
  content.className = 'download-content';

  // Add title
  if (title) {
    const titleEl = document.createElement('h3');
    titleEl.className = 'download-title';
    titleEl.textContent = title;
    content.appendChild(titleEl);
  }

  // Add description
  if (description) {
    const descEl = document.createElement('p');
    descEl.className = 'download-description';
    descEl.textContent = description;
    content.appendChild(descEl);
  }

  // Add tags
  if (tags) {
    const tagsWrapper = document.createElement('div');
    tagsWrapper.className = 'download-tags';

    const tagList = tags.split(',').map((tag) => tag.trim()).filter((tag) => tag);
    tagList.forEach((tag) => {
      const tagEl = document.createElement('span');
      tagEl.className = 'download-tag';
      tagEl.textContent = tag;
      tagsWrapper.appendChild(tagEl);
    });

    content.appendChild(tagsWrapper);
  }

  // Add download button
  if (downloadLink) {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'download-button-wrapper';

    const button = document.createElement('a');
    button.href = downloadLink;
    button.className = 'download-button';
    button.setAttribute('download', '');
    button.setAttribute('aria-label', `Download ${title || 'file'}`);

    // Add download icon
    const icon = document.createElement('span');
    icon.className = 'download-icon';
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 12L3 7L4.4 5.6L7 8.2V0H9V8.2L11.6 5.6L13 7L8 12Z" fill="currentColor"/><path d="M0 14V16H16V14H0Z" fill="currentColor"/></svg>';
    button.appendChild(icon);

    // Add button text
    const buttonText = document.createElement('span');
    buttonText.textContent = downloadText;
    button.appendChild(buttonText);

    buttonWrapper.appendChild(button);
    content.appendChild(buttonWrapper);
  }

  container.appendChild(content);
  block.appendChild(container);
}

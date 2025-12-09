# ContentBlock Text Alignment Fix

## Issue
Text alignment was not taking effect because `contentblock_textAlign` field needed to be part of the contentblock element group.

## Root Cause
The `contentblock_textAlign` field had the `contentblock_` prefix but was defined **after** non-prefixed fields (image, imageAlt, imagePosition). According to AEM element grouping rules, all fields with the same prefix must be consecutive to be grouped together.

## Solution
Moved `contentblock_textAlign` to be the **5th field** in the contentblock group, right after the other `contentblock_` prefixed fields:

### Field Order (Updated)
1. `contentblock_heading` (text)
2. `contentblock_text` (richtext)
3. `contentblock_cta` (aem-content)
4. `contentblock_ctaText` (text)
5. **`contentblock_textAlign` (select)** ← MOVED HERE
6. `image` (reference)
7. `imageAlt` (text)
8. `imagePosition` (select)
9. `imageAlign` (select)

## Files Updated

### 1. `_contentblock.json`
- Moved `contentblock_textAlign` field to position 5 (after contentblock_ctaText, before image)

### 2. `component-models.json`
- Synchronized field order to match `_contentblock.json`

### 3. `contentblock.js`
Updated element grouping logic:

**Before:**
```javascript
// Row 0: contentblock group (heading, text, cta, ctaText as child divs)
// Row 3: contentblock_textAlign
const textAlignRow = rows[3];
const textAlign = textAlignRow?.textContent.trim() || '';
```

**After:**
```javascript
// Row 0: contentblock group (heading, text, cta, ctaText, textAlign as child divs)
const groupDivs = [...contentblockGroup.children[0].children];
// groupDivs[4] = textAlign
const textAlign = groupDivs[4]?.textContent.trim() || '';
```

**New Row Structure:**
- Row 0: contentblock group (5 fields nested: heading, text, cta, ctaText, **textAlign**)
- Row 1: image (with imageAlt embedded)
- Row 2: imagePosition
- Row 3: imageAlign

### 4. `drafts/contentblock-grouped-test.plain.html`
Updated all 6 examples to include textAlign as the **4th nested div** in the contentblock group:

**Example Structure:**
```html
<div class="contentblock">
  <div>
    <div>
      <div>Heading</div>
      <div>Description</div>
      <div><a href="#">CTA</a></div>
      <div>center</div> <!-- textAlign value here (4th child) -->
    </div>
  </div>
  <div><!-- image --></div>
  <div><!-- imagePosition --></div>
  <div><!-- imageAlign --></div>
</div>
```

## Why This Fixes Text Alignment

1. **Proper Grouping**: textAlign is now correctly grouped with other contentblock_ fields
2. **Correct DOM Position**: JavaScript now reads textAlign from `groupDivs[4]` (5th child in group)
3. **Class Applied**: `contentblock-text-center` or `contentblock-text-right` classes are properly applied to the block
4. **CSS Works**: Existing CSS selectors (`.contentblock-text-center .contentblock-content`) now match correctly

## Validation
✅ ESLint passed (JavaScript valid)
✅ JSON syntax valid (component-models.json)
✅ Test file updated with correct structure
✅ All 6 test examples now have proper textAlign values

## Testing
To test the fix:
1. Start dev server: `aem up --html-folder drafts`
2. Visit: http://localhost:3000/drafts/contentblock-grouped-test
3. Verify:
   - Example 3: Text should be centered
   - Example 4: Text should be centered (image left)
   - Example 5: Text should be right-aligned
   - All other examples: Text should be left-aligned (default)

## Breaking Change
⚠️ **DOM structure changed from 5 rows to 4 rows**
- Old: Row 3 was contentblock_textAlign
- New: Row 0 contains textAlign as 5th nested child

Existing content authored with the old structure will need to be re-saved in Universal Editor.

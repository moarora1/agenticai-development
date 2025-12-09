# ContentBlock - Element Grouping Update

## Date: December 9, 2025

## Overview
Updated contentblock to use AEM element grouping pattern by adding `contentblock_` prefix to related fields.

## Element Grouping Pattern

According to [AEM.live Component Model Definitions](https://www.aem.live/developer/component-model-definitions#element-grouping), when multiple fields share the same prefix before an underscore, they are grouped into a single `<div>` with child `<div>`s for each field.

### Field Naming Changes

| Old Name | New Name | Reason |
|----------|----------|--------|
| `heading` | `contentblock_heading` | Groups with other content fields |
| `text` | `contentblock_text` | Groups with other content fields |
| `cta` | `contentblock_cta` | Groups with other content fields |
| `ctaText` | `contentblock_ctaText` | Groups with other content fields |
| `textAlign` | `contentblock_textAlign` | Groups with other content fields |
| `image` | `image` | Remains separate (different group) |
| `imageAlt` | `imageAlt` | Embedded with image |
| `imagePosition` | `imagePosition` | Remains separate (config field) |
| `imageAlign` | `imageAlign` | Remains separate (config field) |

## Generated DOM Structure

### Before (Row-per-Field)
```html
<div class="contentblock">
  <div><div>Heading Text</div></div>          <!-- Row 0 -->
  <div><div>Description text...</div></div>   <!-- Row 1 -->
  <div><div><a href="#">CTA</a></div></div>   <!-- Row 2 -->
  <div><div><picture>...</picture></div></div> <!-- Row 3 -->
  <div><div>left</div></div>                  <!-- Row 4 -->
  <div><div>center</div></div>                <!-- Row 5 -->
  <div><div>top</div></div>                   <!-- Row 6 -->
</div>
```

### After (With Element Grouping)
```html
<div class="contentblock">
  <!-- Row 0: contentblock_ group -->
  <div>
    <div>
      <div>Heading Text</div>        <!-- contentblock_heading -->
      <div>Description text...</div> <!-- contentblock_text -->
      <div><a href="#">CTA</a></div> <!-- contentblock_cta -->
      <!-- contentblock_ctaText is embedded in the link -->
    </div>
  </div>
  <!-- Row 1: image group -->
  <div><div><picture>...</picture></div></div>
  <!-- Row 2: imagePosition -->
  <div><div>left</div></div>
  <!-- Row 3: contentblock_textAlign -->
  <div><div>center</div></div>
  <!-- Row 4: imageAlign -->
  <div><div>top</div></div>
</div>
```

## Benefits of Element Grouping

1. **Fewer Total Rows**: Reduced from 7 rows to 5 rows
2. **Logical Grouping**: Content fields grouped together
3. **Easier Authoring**: Related fields appear together in Universal Editor
4. **Cleaner DOM**: More semantic structure
5. **Better Performance**: Fewer DOM nodes to traverse

## JavaScript Changes

### Old Approach
```javascript
const headingRow = rows[0];
const textRow = rows[1];
const ctaRow = rows[2];
const imageRow = rows[3];
```

### New Approach (Element Grouping)
```javascript
// Row 0: contentblock group contains heading, text, cta, ctaText
const contentblockGroup = rows[0];
// Row 1: image (with imageAlt)
const imageRow = rows[1];
// Row 2: imagePosition
const imagePositionRow = rows[2];
// Row 3: contentblock_textAlign
const textAlignRow = rows[3];
// Row 4: imageAlign
const imageAlignRow = rows[4];

// Extract fields from the contentblock group
const groupDivs = [...contentblockGroup.children[0].children];
// groupDivs[0] = heading
// groupDivs[1] = text
// groupDivs[2] = cta
// groupDivs[3] = ctaText (embedded)
```

## Row Structure Summary

| Row Index | Content | Visible in DOM | Group |
|-----------|---------|----------------|-------|
| 0 | contentblock group | Yes (as container) | contentblock_ |
| 0.0 | heading | Yes | Inside group |
| 0.1 | text | Yes | Inside group |
| 0.2 | cta | Yes | Inside group |
| 0.3 | ctaText | No (embedded) | Inside group |
| 1 | image + imageAlt | Yes | image |
| 2 | imagePosition | No (config) | - |
| 3 | contentblock_textAlign | No (config) | contentblock_ |
| 4 | imageAlign | No (config) | - |

**Total Visible Rows**: 2 (contentblock group + image)
**Total Configuration Rows**: 3 (imagePosition, textAlign, imageAlign)

## CSS Impact

No CSS changes required. The CSS classes applied to the block remain the same:
- `.contentblock`
- `.contentblock-image-left`
- `.contentblock-text-center`
- `.contentblock-text-right`
- `.contentblock-image-top`
- `.contentblock-image-bottom`

The decoration logic still applies the same classes to child elements:
- `.contentblock-content`
- `.contentblock-heading`
- `.contentblock-text`
- `.contentblock-cta-wrapper`
- `.contentblock-cta`
- `.contentblock-separator`
- `.contentblock-image`

## Test Files

### Updated Test File
`drafts/contentblock-grouped-test.plain.html` - New file with grouped structure

### Old Test Files (Still Valid)
The following files use the old structure and will need to be updated or deprecated:
- `drafts/contentblock-test.plain.html`
- `drafts/contentblock-variations-test.plain.html`

## Migration Notes

### For Existing Content

**Universal Editor**: Content created with the old field names will need to be migrated or recreated. The Universal Editor will show the new field names.

**Document Authoring**: If using .docx or SharePoint, content will need to be updated to use the new grouped structure.

### For Developers

1. **Test Locally**: Use `drafts/contentblock-grouped-test.plain.html`
2. **Verify Grouping**: Check that heading, text, cta appear in a single row/container
3. **Check Configuration**: Verify imagePosition, textAlign, imageAlign still work
4. **Validate Universal Editor**: Test creating new content with grouped fields

## Files Modified

1. `blocks/contentblock/_contentblock.json` - Updated field names with prefixes
2. `blocks/contentblock/contentblock.js` - Updated to handle grouped DOM structure
3. `component-models.json` - Synchronized field names
4. `drafts/contentblock-grouped-test.plain.html` - New test file with grouped structure

## Files NOT Modified

- `blocks/contentblock/contentblock.css` - No changes required (CSS classes unchanged)

## Backward Compatibility

⚠️ **BREAKING CHANGE**: This is a breaking change for existing content.

**Impact**:
- Old test files will not render correctly with new JavaScript
- Existing Universal Editor content will need field name updates
- DOM structure changed from 7 rows to 5 rows

**Mitigation**:
- Update test content to new grouped structure
- Recreate or migrate existing Universal Editor content
- Update any custom JavaScript that relies on row indices

## Validation

- ✅ JSON files valid (both _contentblock.json and component-models.json)
- ✅ JavaScript linting passed
- ✅ CSS linting passed
- ✅ Test file created with grouped structure

## Next Steps

1. ✅ Test with new grouped test file
2. ⏳ Verify in Universal Editor
3. ⏳ Update or deprecate old test files
4. ⏳ Communicate breaking change to team
5. ⏳ Update documentation with migration guide

---

**Implementation Status**: ✅ Complete
**Breaking Change**: ⚠️ Yes (DOM structure changed)
**Requires Content Migration**: ⚠️ Yes

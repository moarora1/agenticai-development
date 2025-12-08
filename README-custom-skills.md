# Custom Skills Loader

This script loads and merges custom skills from the `moarora1/agenticai-development` repository into your local `.claude/skills/` directory.

## Features

- **Merge Strategy**: Preserves existing files, only adds new ones
- **Smart Detection**: Automatically finds all SKILL.md files
- **Safe Updates**: Never overwrites existing skill files
- **Automatic Discovery**: Updates the `.agents/discover-skills` script

## Usage

```bash
./.agents/load-custom-skills.sh
```

## How It Works

1. **Clone Repository**: Temporarily clones `moarora1/agenticai-development` (branch: `agents-skills-update`)
2. **Discover Skills**: Finds all SKILL.md files in `.claude/skills/`
3. **Merge Skills**: Copies skill directories to your local `.claude/skills/`
   - If skill doesn't exist: Copies entire skill directory
   - If skill exists: Only adds new files, preserves existing ones
4. **Update Tools**: Regenerates `.agents/discover-skills` script
5. **Cleanup**: Removes temporary clone directory

## Merge Behavior

### New Skill
```
Source: custom-repo/.claude/skills/my-new-skill/
  ├── SKILL.md
  ├── resource.md
  └── script.sh

Result: Entire directory copied to .claude/skills/my-new-skill/
```

### Existing Skill
```
Existing: .claude/skills/content-modeling/
  ├── SKILL.md (preserved)
  └── resources/
      └── guide.md (preserved)

Source: custom-repo/.claude/skills/content-modeling/
  ├── SKILL.md (skipped - exists)
  ├── resources/
  │   ├── guide.md (skipped - exists)
  │   └── new-guide.md (added)
  └── examples/ (added - new directory)
      └── example.md (added)

Result: .claude/skills/content-modeling/
  ├── SKILL.md (original preserved)
  ├── resources/
  │   ├── guide.md (original preserved)
  │   └── new-guide.md (added from custom)
  └── examples/ (added from custom)
      └── example.md (added from custom)
```

## Configuration

The script is pre-configured with:

- **Repository**: `moarora1/agenticai-development`
- **Branch**: `agents-skills-update`
- **Skills Path**: `.claude/skills`
- **Destination**: `.claude/skills` (local project)

To modify these, edit the variables at the top of the `main()` function in the script.

## Forcing Updates

If you want to update an existing skill file that has been modified in the custom repository:

1. **Delete the specific file locally**:
   ```bash
   rm .claude/skills/my-skill/SKILL.md
   ```

2. **Re-run the loader**:
   ```bash
   ./.agents/load-custom-skills.sh
   ```

3. **Or delete entire skill directory**:
   ```bash
   rm -rf .claude/skills/my-skill/
   ./.agents/load-custom-skills.sh
   ```

## Output

The script provides detailed logging:

```
*************************************************
Loading Custom Skills from moarora1/agenticai-development
*************************************************

ℹ Created temp dir: /var/folders/.../
ℹ Cloning moarora1/agenticai-development (branch: agents-skills-update)...
✓ Repository cloned successfully
ℹ Merging custom skills...
  Installing new skill: my-new-skill
  Merging skill: content-modeling (preserving existing files)
    Skipping existing file: SKILL.md
    Adding new file: resources/new-guide.md
✓ Merged 2 custom skill(s)
ℹ Updating .agents/discover-skills script...
✓ Updated discover-skills script
✓ Custom skills loaded and merged successfully!

ℹ Skills have been merged without overwriting existing files
ℹ Run './.agents/discover-skills' to see all available skills
```

## Error Handling

The script handles common errors:

- **Repository not accessible**: Ensures you have access to the repository
- **No skills found**: Warns if no SKILL.md files are found
- **Temporary directory cleanup**: Automatically cleans up on exit or error

## Integration

This script is automatically called by `aem-agenticai-setup.sh` during initial setup:

1. Adobe skills are loaded first (via `gh upskill`)
2. Custom skills are merged second (via this script)
3. Result: Combined skill set from both sources

## Manual Updates

To manually update custom skills at any time:

```bash
# Run the custom skills loader
./.agents/load-custom-skills.sh

# Verify what was loaded
./.agents/discover-skills
```

## Troubleshooting

### Authentication Error

```bash
# Ensure you're logged into GitHub CLI
gh auth login
```

### Skills Not Merging

Check that you have the correct permissions:
```bash
# Test repository access
gh repo view moarora1/agenticai-development
```

### Force Clean Install

To start fresh with custom skills:
```bash
# Remove all skills
rm -rf .claude/skills/

# Reload Adobe skills
gh upskill adobe/helix-website

# Reload custom skills
./.agents/load-custom-skills.sh
```

## See Also

- Main setup script: `aem-agenticai-setup.sh`
- Skills discovery: `./.agents/discover-skills`
- Adobe skills loader: `gh upskill adobe/helix-website`

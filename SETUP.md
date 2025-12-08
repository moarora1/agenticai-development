# AEM Agentic AI Setup Script

This set1. **OS Detection**: Identifies your operating system (macOS or Linux)
2. **Homebrew Check** (macOS only): Installs Homebrew if not present
3. **Dependency Checks**: Verifies if each required tool is installed
4. **nvm Installation**: Installs Node Version Manager if not present
5. **Automatic Installation**: Installs missing tools using appropriate package managers
6. **Version Verification**: Ensures Node.js is 22.x.x and npm is 9.0.0+
7. **AEM CLI Installation**: Installs Adobe Experience Manager CLI globally
8. **GitHub Extensions**: Installs gh-upskill extension for the GitHub CLI
9. **Skills Loading**: Automatically loads AEM skills from adobe/helix-website repository
10. **Custom Skills Merging**: Merges project-specific skills without overwriting existing files
11. **Project Dependencies**: Installs npm packages from package.json (if present)
12. **Verification Summary**: Displays versions of all installed components automates the installation and configuration of the development environment for AEM Edge Delivery Services with Agentic AI capabilities.

## What It Does

The `aem-agenticai-setup.sh` script checks for and installs the following required dependencies:

1. **bash** - Latest version
2. **git** - Latest version for version control
3. **GitHub CLI (gh)** - Latest version for GitHub operations
4. **nvm** - Node Version Manager for managing Node.js versions
5. **Node.js** - Version 22.x.x (installed via nvm)
6. **npm** - Version 9.0.0 or higher (package manager)
7. **AEM CLI** - Adobe Experience Manager command-line tool
8. **gh-upskill extension** - GitHub CLI extension for skill management
9. **Adobe Skills** - Automatically loads skills from `adobe/helix-website` repository
10. **Custom Skills** - Merges project-specific skills from `moarora1/agenticai-development` repository

## Prerequisites

- **macOS**: Homebrew will be installed automatically if not present
- **Linux**: Requires apt-get package manager (Debian/Ubuntu)
- **Admin/sudo access**: Required for installing system packages

## Why nvm?

This script uses **nvm (Node Version Manager)** instead of direct Node.js installation because:

- ✅ **Easy version switching**: Switch between Node.js versions with `nvm use <version>`
- ✅ **No sudo required**: Install Node.js without system-level permissions
- ✅ **Project-specific versions**: Use `.nvmrc` files for per-project Node.js versions
- ✅ **Clean installations**: Avoid conflicts between different Node.js versions
- ✅ **Industry standard**: Widely used in JavaScript/Node.js development

## Usage

### Make the script executable (first time only)

```bash
chmod +x aem-agenticai-setup.sh
```

### Run the setup script

```bash
./aem-agenticai-setup.sh
```

## What Happens During Setup

1. **OS Detection**: Identifies your operating system (macOS or Linux)
2. **Homebrew Check** (macOS only): Installs Homebrew if not present
3. **Dependency Checks**: Verifies if each required tool is installed
4. **Automatic Installation**: Installs missing tools using appropriate package managers
5. **Version Verification**: Ensures Node.js is 22.x.x and npm is 9.0.0+
6. **AEM CLI Installation**: Installs Adobe Experience Manager CLI globally
7. **GitHub Extensions**: Installs gh-upskill extension for the GitHub CLI
8. **Project Dependencies**: Installs npm packages from package.json (if present)
9. **Verification Summary**: Displays versions of all installed tools

## Version Requirements

| Tool | Required Version | Notes |
|------|------------------|-------|
| bash | Latest | System shell |
| git | Latest | Version control |
| GitHub CLI | Latest | GitHub operations |
| nvm | Latest | Node Version Manager |
| Node.js | 22.x.x | **Installed via nvm** |
| npm | 9.0.0+ | Minimum version |
| AEM CLI | Latest | Adobe tool |

## Post-Installation

After successful setup, you can:

1. **Review loaded skills**:
   ```bash
   ls .claude/skills/
   # or
   ./.agents/discover-skills
   ```

2. **Start the development server**:
   ```bash
   aem up
   ```

3. **Open your browser**:
   ```
   http://localhost:3000
   ```

4. **Start developing**:
   - Create blocks in `blocks/` directory
   - Test with Universal Editor integration
   - Use Content Driven Development workflow
   - Leverage loaded skills for AI-assisted development

## Skills Management

The script automatically loads skills from two sources:

1. **Adobe Skills** - Base skills from `adobe/helix-website` repository
2. **Custom Skills** - Project-specific skills from `moarora1/agenticai-development` repository

### How Skills are Merged

The custom skills loader uses a **merge strategy** rather than overwriting:

- ✅ New skills are added to `.claude/skills/`
- ✅ New files within existing skills are added
- ✅ Existing files are **preserved** (not overwritten)
- ✅ Both Adobe and custom skills coexist

This ensures that Adobe skills remain intact while adding project-specific customizations.

### Reloading Skills

To reload Adobe skills:
```bash
gh upskill adobe/helix-website
```

To reload custom skills (merges, doesn't overwrite):
```bash
./.agents/load-custom-skills.sh
```

### Discovering Available Skills

To see what skills are available:
```bash
./.agents/discover-skills
```

### Using Skills

Skills are automatically available to GitHub Copilot and other AI tools configured to use the `.claude/skills/` directory.

## Troubleshooting

### Node.js version mismatch

The script now uses **nvm (Node Version Manager)** to install and manage Node.js versions. If you have a different Node.js version installed:
- The script will automatically install Node.js 22 via nvm
- Set it as the default version
- You can switch between versions using `nvm use <version>`

### nvm not loading

If nvm is not available after installation, try:
```bash
# Load nvm manually
source ~/.nvm/nvm.sh

# Or restart your terminal
```

### Permission errors

If you encounter permission errors, ensure you have sudo access:
```bash
sudo ./aem-agenticai-setup.sh
```

### Homebrew installation fails (macOS)

If Homebrew installation fails, install manually:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### GitHub CLI authentication

After installation, you may need to authenticate:
```bash
gh auth login
```

### Skills not loading

If skills fail to load, you can manually load them:

**Adobe skills:**
```bash
# Ensure you're authenticated with GitHub
gh auth login

# Load Adobe skills
gh upskill adobe/helix-website

# Verify skills loaded
ls .claude/skills/
```

**Custom skills:**
```bash
# Ensure you're authenticated with GitHub
gh auth login

# Load custom skills (merges with existing)
./.agents/load-custom-skills.sh

# Verify skills loaded
./.agents/discover-skills
```

### Merge conflicts

The custom skills loader uses a **merge strategy**:
- Existing files are never overwritten
- Only new files and directories are added
- If you want to update an existing skill file, manually delete it first, then re-run the loader

## Manual Installation Alternative

If you prefer to install components manually:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load nvm
source ~/.nvm/nvm.sh

# Install Node.js 22 via nvm
nvm install 22
nvm use 22
nvm alias default 22

# macOS - Other tools
brew install bash git gh
npm install -g @adobe/aem-cli
gh extension install trieloff/gh-upskill

# Linux - Other tools
sudo apt-get install bash git
# Install GitHub CLI (see https://github.com/cli/cli/blob/trunk/docs/install_linux.md)
npm install -g @adobe/aem-cli
gh extension install trieloff/gh-upskill
```

## Support

For issues or questions:
- Check the [AGENTS.md](./AGENTS.md) file for development guidelines
- Review skills documentation in `.claude/skills/`
- Consult AEM Edge Delivery documentation

## Script Features

- ✅ Automatic OS detection
- ✅ Color-coded output for easy reading
- ✅ Version verification
- ✅ Error handling with detailed messages
- ✅ Idempotent (safe to run multiple times)
- ✅ Installation summary at completion

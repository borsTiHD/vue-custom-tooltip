# Scripts

This directory contains utility scripts for the project.

## update-changelog.js

Automatically updates the `CHANGELOG.md` file when creating a new release.

### What it does

1. Converts the `[Unreleased]` section to a new version entry with today's date
2. Creates a new empty `[Unreleased]` section
3. Updates version comparison links at the bottom of the changelog

### Usage

#### Manual Usage

```bash
# Update changelog for a specific version
node scripts/update-changelog.js 1.1.8

# Or use the npm script
pnpm changelog:update 1.1.8
```

#### Automatic Usage (GitHub Actions)

The script is automatically executed during the release workflow (`.github/workflows/publish.yml`) when you trigger a release:

1. Go to GitHub Actions
2. Select "Release and Publish" workflow
3. Click "Run workflow"
4. Choose version bump type (patch/minor/major)
5. The workflow will:
   - Run tests
   - Build the library
   - Bump version in package.json
   - **Update CHANGELOG.md automatically**
   - Commit and tag the changes
   - Publish to NPM
   - Create GitHub release

### Requirements

- The `[Unreleased]` section must contain changes
- Version must follow semantic versioning (e.g., 1.2.3)

### Example

Before:
```markdown
## [Unreleased]

### Fixed
- Bug fix description

## [1.1.7] - 2025-10-20
```

After running `node scripts/update-changelog.js 1.1.8`:
```markdown
## [Unreleased]

## [1.1.8] - 2025-10-23

### Fixed
- Bug fix description

## [1.1.7] - 2025-10-20
```

The version links at the bottom are also updated automatically.

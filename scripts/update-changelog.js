#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CHANGELOG_PATH = path.join(__dirname, '../CHANGELOG.md')

/**
 * Updates the CHANGELOG.md file by:
 * 1. Converting [Unreleased] section to a new version entry
 * 2. Adding today's date
 * 3. Creating a new empty [Unreleased] section
 * 4. Updating version comparison links at the bottom
 *
 * @param {string} version - The new version number (e.g., "1.1.8")
 */
function updateChangelog(version) {
  try {
    // Read current changelog
    const changelog = fs.readFileSync(CHANGELOG_PATH, 'utf-8')

    // Get today's date in YYYY-MM-DD format
    const date = new Date().toISOString().split('T')[0]

    // Check if there's actually content in the Unreleased section
    const unreleasedPattern = /## \[Unreleased\]\n([\s\S]*?)\n## \[/
    const unreleasedMatch = changelog.match(unreleasedPattern)
    if (!unreleasedMatch || !unreleasedMatch[1].trim()) {
      console.error('❌ Error: No unreleased changes found in CHANGELOG.md')
      console.error('Please add changes to the [Unreleased] section before creating a release.')
      process.exit(1)
    }

    // Replace [Unreleased] header with new version and create new empty [Unreleased] section
    let updatedChangelog = changelog.replace(
      '## [Unreleased]',
      `## [Unreleased]\n\n## [${version}] - ${date}`,
    )

    // Update version comparison links at the bottom
    // Find the [Unreleased] link pattern
    const linkPattern = /\[Unreleased\]: (.+)\/compare\/v(.+)\.\.\.HEAD/
    const unreleasedLinkMatch = updatedChangelog.match(linkPattern)

    if (unreleasedLinkMatch) {
      const repoUrl = unreleasedLinkMatch[1]
      const previousVersion = unreleasedLinkMatch[2]

      // Update the [Unreleased] link to point to new version
      updatedChangelog = updatedChangelog.replace(
        linkPattern,
        `[Unreleased]: ${repoUrl}/compare/v${version}...HEAD`,
      )

      // Add new version comparison link right after [Unreleased]
      const newVersionLink = `[${version}]: ${repoUrl}/compare/v${previousVersion}...v${version}`
      updatedChangelog = updatedChangelog.replace(
        `[Unreleased]: ${repoUrl}/compare/v${version}...HEAD`,
        `[Unreleased]: ${repoUrl}/compare/v${version}...HEAD\n${newVersionLink}`,
      )
    }
    else {
      console.warn('⚠️  Warning: Could not find version comparison links. Please update them manually.')
    }

    // Write updated changelog
    fs.writeFileSync(CHANGELOG_PATH, updatedChangelog)

    console.log(`✅ Successfully updated CHANGELOG.md for version ${version}`)
    console.log(`   - Date: ${date}`)
    console.log(`   - Created new [${version}] section`)
    console.log(`   - Updated version comparison links`)
  }
  catch (error) {
    console.error('❌ Error updating changelog:', error.message)
    process.exit(1)
  }
}

// Main execution
const version = process.argv[2]

if (!version) {
  console.error('❌ Error: Please provide a version number')
  console.error('Usage: node update-changelog.js <version>')
  console.error('Example: node update-changelog.js 1.1.8')
  process.exit(1)
}

// Validate version format (basic semver check)
if (!/^\d+\.\d+\.\d+$/.test(version)) {
  console.error(`❌ Error: Invalid version format: ${version}`)
  console.error('Version must follow semantic versioning (e.g., 1.2.3)')
  process.exit(1)
}

updateChangelog(version)

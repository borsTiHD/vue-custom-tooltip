# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2025-10-16

### Fixed
- **Critical CSS Scoping Issue**: Fixed global CSS pollution from dark mode styles that was overriding host application backgrounds
  - The `:global()` selector was incorrectly scoped, causing Vue to generate styles that targeted `html.dark` and `body.dark` globally
  - Changed `:global(html.dark) .tooltip-auto` to `:global(html.dark .tooltip-auto)` to properly scope styles to tooltip descendants only
  - Now styles only apply to `.tooltip-auto` elements within `html.dark` or `body.dark`, preventing global style leakage
  - Maintains Tailwind dark mode support without side effects when importing the tooltip CSS in other projects

## [1.0.1] - 2025-10-15

### Fixed
- Trying to fix dark mode selection bug after build

## [1.0.0] - Initial Development

### Added
- Initial release of Vue Custom Tooltip component
- Core tooltip component functionality
- Flexible tooltip component built with Vue 3 Composition API
- Multiple trigger modes: hover, focus, both, and click
- Auto-positioning with smart placement detection
- Customizable delays for show/hide animations
- Dark mode support with auto-detection (prefers-color-scheme and Tailwind .dark class)
- Accessibility features:
  - Keyboard navigation support (Tab to focus, Escape to close)
  - Screen reader compatible
  - Proper ARIA attributes
  - Focus management
- Rich content support via slots
- Arrow positioning with automatic adjustment
- Directive support for simple use cases
- TypeScript support
- Zero external dependencies (except Vue 3)
- CSS custom properties for easy theming
- High contrast mode support
- Reduced motion support for accessibility

### Features
- **Positioning**: Auto, top, bottom, left, right
- **Triggers**: Hover, focus, both, click
- **Themes**: Light, dark, auto (system preference)
- **Customization**: CSS variables for colors, border radius, shadows
- **Responsive**: Automatically adjusts position to stay within viewport
- **Teleport**: Uses Vue Teleport to avoid z-index and overflow issues

---

## Types of Changes
- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** in case of vulnerabilities

[Unreleased]: https://github.com/borsTiHD/vue-custom-tooltip/compare/v1.0.2...HEAD
[1.0.2]: https://github.com/borsTiHD/vue-custom-tooltip/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/borsTiHD/vue-custom-tooltip/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/borsTiHD/vue-custom-tooltip/releases/tag/v1.0.0

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- fix: store reference to original element instead of cloning it in tooltip directive

## [1.1.7] - 2025-10-20

### Fixed
- **Arrow Positioning**: Fixed tooltip arrow alignment issue where arrows were offset incorrectly
  - Arrows in `top` and `bottom` positions were appearing too far to the right
  - Arrows in `left` and `right` positions were appearing too far down

## [1.1.6] - 2025-10-17

### Fixed
- **TypeScript Support for Global Registration**: Fixed missing TypeScript types for globally registered directive
  - Directive modifiers (`.top`, `.bottom`, `.click`, `.fast`, etc.) now validated by TypeScript

## [1.1.5] - 2025-10-17

### Fixed
- **TypeScript Component Typing**: Fixed missing TypeScript types for globally registered `<Tooltip />` component
  - Added Vue component type augmentation to enable IDE autocomplete and type checking
  - Component props now properly recognized in templates with full IntelliSense support
  - Updated Vite configuration to ensure type declarations are included in build output
  - Improved developer experience with proper TypeScript support in consuming projects

## [1.1.4] - 2025-10-17

### Fixed
- **Tooltip Positioning**: Optimized positioning calculations and improved initial measurement accuracy for more reliable tooltip placement

## [1.1.2] - 2025-10-17

### Fixed
- **Tooltip Transition Animation**: Fixed fade transition not working properly during tooltip show/hide
- **Dark Mode Priority**: Fixed dark mode not applying correctly when using Tailwind's `.dark` class on either `html` or `body` element. The priority chain now works as intended: Tailwind `.dark`/`.light` class takes precedence over system `prefers-color-scheme`, ensuring consistent theme application regardless of where the class is applied
- **Accessibility Enhancement**: Improved accessibility by implementing proper ARIA attributes and unique tooltip IDs
  - Added `aria-describedby` to trigger elements, linking them to their tooltip content
  - Added `aria-expanded` for click-triggered tooltips to indicate expanded/collapsed state
  - Implemented unique ID generation for each tooltip instance using counter and random string combination
  - Added `aria-live="polite"` to tooltip elements for screen reader announcements
  - Ensures proper association between trigger and tooltip elements for assistive technologies

## [1.1.1] - 2025-10-16

### Fixed
- **Prop Detection**: Fixed an issue where props passed in `kebab-case` (e.g., `tooltip-class`) were not being detected correctly. The component now properly recognizes both `camelCase` and `kebab-case` prop formats, ensuring consistent behavior

## [1.1.0] - 2025-10-16

### Added
- **Global Configuration System**: Comprehensive global configuration support with plugin options
  - New `setTooltipGlobalConfig()` function to set global defaults for all tooltips
  - Global config can be provided during plugin installation via `app.use(VueCustomTooltip, { globalConfig: {...} })`
  - Priority chain: Component props > Global config > Default values

### Fixed
- **Default Value Handling**: Fixed issue where default values weren't applied correctly
  - Boolean props now correctly distinguish between explicit `false` and missing prop
  - Number props (like `offset`) now correctly handle explicit `0` value
  - String props properly handle empty string as valid value

### Documentation
- Updated README with comprehensive global configuration examples
- Added inline code documentation for all configuration functions
- Documented priority chain behavior

## [1.0.2] - 2025-10-16

### Fixed
- **Critical CSS Scoping Issue**: Fixed global CSS pollution from dark mode styles that was overriding host application backgrounds
  - The `:global()` selector was incorrectly scoped, causing Vue to generate styles that targeted `html.dark` and `body.dark` globally
  - Changed `:global(html.dark) .tooltip-auto` to `:global(html.dark .tooltip-auto)` to properly scope styles to tooltip descendants only
  - Now styles only apply to `.tooltip-auto` elements within `html.dark` or `body.dark`, preventing global style leakage
  - Maintains Tailwind dark mode support without side effects when importing the tooltip CSS in other projects

## [1.0.1] - 2025-10-15

### Fixed
- **Dark Mode Selection**: Fixed dark mode detection and application after build process
  - Improved dark mode auto-detection reliability

## [1.0.0] - 2025-10-15

### Added
- **Initial Release**: Vue Custom Tooltip component
- **Core Features**:
  - Flexible tooltip component built with Vue 3 Composition API and TypeScript
  - Multiple trigger modes: `hover`, `focus`, `both`, and `click`
  - Smart auto-positioning with viewport boundary detection
  - Customizable show/hide delays with configurable timing
  - Dark mode support with auto-detection (respects both `prefers-color-scheme` and Tailwind's `.dark` class)
  - Rich content support via default slot or content prop
  - Arrow positioning with automatic adjustment when tooltip shifts
  - Directive support (`v-tooltip`) for simple text tooltips
  - Full TypeScript support with comprehensive type definitions
  - Zero external dependencies (only requires Vue 3)
  
- **Accessibility Features**:
  - Full keyboard navigation support (Tab to focus, Escape to close)
  - Screen reader compatible with proper ARIA attributes
  - Focus management and keyboard event handling
  - High contrast mode support
  - Reduced motion support for users with motion sensitivity preferences
  
- **Customization Options**:
  - CSS custom properties (CSS variables) for easy theming
  - Configurable positioning: `auto`, `top`, `bottom`, `left`, `right`
  - Adjustable offset distance from trigger element
  - Custom CSS classes via `tooltipClass` prop
  - Configurable max-width
  - Optional arrow display
  
- **Technical Features**:
  - Uses Vue Teleport to avoid z-index and overflow issues
  - Responsive design that automatically adjusts to viewport constraints
  - Smooth transitions and animations
  - Proper cleanup on component unmount
  - Window resize and scroll handling

---

## Types of Changes

This changelog follows these categories:
- **Added** - New features and functionality
- **Changed** - Changes to existing functionality or behavior
- **Deprecated** - Features that will be removed in future versions
- **Removed** - Features that have been removed
- **Fixed** - Bug fixes and error corrections
- **Security** - Vulnerability fixes and security improvements
- **Documentation** - Documentation updates and improvements

---

## Version Links

[Unreleased]: https://github.com/borsTiHD/vue-custom-tooltip/compare/v1.1.7...HEAD
[1.1.7]: https://github.com/borsTiHD/vue-custom-tooltip/compare/v1.1.6...v1.1.7
[1.1.6]: https://github.com/borsTiHD/vue-custom-tooltip/compare/v1.1.5...v1.1.6
[1.1.5]: https://github.com/borsTiHD/vue-custom-tooltip/compare/v1.1.4...v1.1.5
[1.1.3]: https://github.com/borsTiHD/vue-custom-tooltip/compare/v1.1.2...v1.1.4
[1.1.2]: https://github.com/borsTiHD/vue-custom-tooltip/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/borsTiHD/vue-custom-tooltip/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/borsTiHD/vue-custom-tooltip/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/borsTiHD/vue-custom-tooltip/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/borsTiHD/vue-custom-tooltip/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/borsTiHD/vue-custom-tooltip/releases/tag/v1.0.0

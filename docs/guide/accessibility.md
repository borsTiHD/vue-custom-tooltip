# Accessibility Guide

Vue Custom Tooltip is built with accessibility in mind, following WAI-ARIA guidelines for tooltips and ensuring keyboard navigation and screen reader support.

## ARIA Attributes

The tooltip component automatically applies the appropriate ARIA attributes for accessibility.

Tooltip Content:
- `id` matches the `aria-describedby` attribute on the trigger element
- `role="tooltip"`
- `aria-live="polite"` for polite announcements by screen readers

Trigger Element:
- `aria-describedby` referencing the tooltip's `id`
- `aria-expanded` toggles on click to indicate tooltip visibility

```vue
<template>
  <Tooltip content="Helper text">
    <!-- Results in: -->
    <button
      aria-describedby="tooltip-1"
      role="button"
      tabindex="0"
    >
      Hover me
    </button>
  </Tooltip>
</template>
```

## Keyboard Navigation

Tooltips are keyboard-accessible by default:

- **Tab**: Move focus between tooltip triggers
- **Enter/Space**: Toggle click-triggered tooltips
- **Escape**: Close active tooltip
- **Focus**: Show tooltip on focusable elements
- **Blur**: Hide tooltip when focus is lost

## Screen Reader Support

Screen readers announce tooltip content appropriately:

```vue
<template>
  <!-- Basic screen reader support -->
  <Tooltip content="Delete this item">
    <button>
      <IconTrash aria-hidden="true" />
    </button>
  </Tooltip>

  <!-- With additional context -->
  <Tooltip content="Press Enter to save changes">
    <button aria-label="Save">
      <IconSave aria-hidden="true" />
    </button>
  </Tooltip>
</template>
```

## Focus Management

### Focusable Elements

Ensure tooltip triggers are focusable:

```vue
<template>
  <!-- Good - naturally focusable -->
  <Tooltip content="Submit form">
    <button>Submit</button>
  </Tooltip>

  <!-- Good - made focusable -->
  <Tooltip content="More information">
    <div
      role="button"
      tabindex="0"
    >
      Info
    </div>
  </Tooltip>

  <!-- Avoid - not focusable -->
  <Tooltip content="Helper">
    <div>❌ Not accessible</div>
  </Tooltip>
</template>
```

### Focus Indicators

Maintain visible focus indicators:

```vue
<template>
  <Tooltip content="Action button">
    <button class="focus-visible:ring-2">
      Visible Focus
    </button>
  </Tooltip>
</template>

<style>
/* Ensure focus is visible */
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>
```

## Reduced motion support

The tooltip respects users 'prefers-reduced-motion' system settings by disabling animations for a more comfortable experience. This ensures tooltips appear instantly without animation when reduced motion is preferred:

```css
@media (prefers-reduced-motion: reduce) {
  .tooltip-fade-enter-active,
  .tooltip-fade-leave-active {
    transition: none;
  }

  .tooltip-fade-enter-from,
  .tooltip-fade-leave-to {
    transform: scale(1);
  }
}
```

## High contrast mode support

The tooltip adapts to users' high contrast preference by enhancing visibility with thicker borders and bolder text. This ensures better readability and accessibility for users who require increased contrast:

```css
/* High contrast mode support */
@media (prefers-contrast: high) {
  .tooltip-content {
    border-width: 2px;
    font-weight: 600;
  }
}
```

## Best Practices

### 1. Clear and Concise Content

```vue
<template>
  <!-- Good - clear and concise -->
  <Tooltip content="Delete item">
    <button>
      <IconTrash />
    </button>
  </Tooltip>

  <!-- Avoid - too verbose -->
  <Tooltip content="Click this button to permanently delete the selected item from your list">
    <button>
      <IconTrash />
    </button>
  </Tooltip>
</template>
```

### 2. Appropriate Timing

```vue
<template>
  <!-- Good - enough time to read -->
  <Tooltip
    content="Important information"
    :show-delay="200"
    :hide-delay="150"
  >
    <button>Action</button>
  </Tooltip>

  <!-- Avoid - too quick -->
  <Tooltip
    content="Important information"
    :show-delay="50"
    :hide-delay="50"
  >
    <button>Action</button>
  </Tooltip>
</template>
```

### 3. Color Contrast

Ensure sufficient color contrast:

```css
:root {
  /* Good - high contrast */
  --tooltip-background: rgba(0, 0, 0, 0.9);
  --tooltip-color: #ffffff;

  /* Avoid - low contrast */
  --tooltip-bad-background: rgba(0, 0, 0, 0.3);
  --tooltip-bad-color: #666666;
}
```

## Form Input Tooltips

```vue
<template>
  <form>
    <Tooltip content="Must be at least 8 characters">
      <input
        type="password"
        aria-required="true"
        placeholder="Password"
      >
    </Tooltip>

    <Tooltip content="Enter a valid email address">
      <input
        type="email"
        aria-required="true"
        placeholder="Email"
      >
    </Tooltip>
  </form>
</template>
```

## Icon Button Tooltips

```vue
<template>
  <div role="toolbar" aria-label="Document actions">
    <Tooltip content="Save document">
      <button aria-label="Save">
        <IconSave aria-hidden="true" />
      </button>
    </Tooltip>

    <Tooltip content="Print document">
      <button aria-label="Print">
        <IconPrint aria-hidden="true" />
      </button>
    </Tooltip>
  </div>
</template>
```

## Interactive Content

For tooltips with interactive content, ensure proper focus management:

```vue
<template>
  <Tooltip>
    <button aria-label="Settings">
      <IconSettings aria-hidden="true" />
    </button>

    <template #content>
      <div
        role="dialog"
        aria-label="Settings options"
      >
        <button
          tabindex="0"
          @click="saveSettings"
        >
          Save preferences
        </button>
      </div>
    </template>
  </Tooltip>
</template>
```

## Testing Accessibility

### Manual Testing Checklist

1. **Keyboard Navigation**
   - [ ] All tooltips reachable via Tab
   - [ ] Enter/Space toggles click tooltips
   - [ ] Escape closes active tooltips

2. **Screen Reader Testing**
   - [ ] Content is announced properly
   - [ ] Role and state are clear
   - [ ] Interactive elements are discoverable

3. **Focus Management**
   - [ ] Focus indicators are visible
   - [ ] Focus order is logical
   - [ ] No keyboard traps

4. **Color and Contrast**
   - [ ] Text meets WCAG contrast requirements
   - [ ] Works in high contrast mode
   - [ ] Visible in light/dark themes

## Resources

- [WAI-ARIA Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Accessible Rich Internet Applications (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)

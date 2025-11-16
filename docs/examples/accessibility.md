<script setup>
import { ref } from 'vue'

// ARIA Labels with Tooltips
const notificationCount = ref(5)
const unreadCount = ref(3)
</script>

# Accessibility Examples

Examples demonstrating accessibility best practices and patterns for using Vue Custom Tooltip.

## Keyboard Navigation

### Focus-Based Tooltips

<Card>
  <div class="space-y-4">
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
      Press Tab to navigate. Tooltips appear on focus.
    </p>
    <div class="space-y-2">
      <Button v-tooltip.focus="'This is the first button'" label="Button 1" />
      <Button v-tooltip.focus="'This is the second button'" label="Button 2" />
      <Button v-tooltip.focus="'This is the third button'" label="Button 3" />
    </div>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="space-y-4">
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
      Press Tab to navigate. Tooltips appear on focus.
    </p>

    <div class="space-y-2">
      <Tooltip content="This is the first button" trigger="focus">
        <Button label="Button 1" />
      </Tooltip>

      <Tooltip content="This is the second button" trigger="focus">
        <Button label="Button 2" />
      </Tooltip>

      <Tooltip content="This is the third button" trigger="focus">
        <Button label="Button 3" />
      </Tooltip>
    </div>
  </div>
</template>
```

```vue [Directive API]
<template>
  <div class="space-y-4">
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
      Press Tab to navigate. Tooltips appear on focus.
    </p>

    <div class="space-y-2">
      <Button v-tooltip.focus="'This is the first button'" label="Button 1" />
      <Button v-tooltip.focus="'This is the second button'" label="Button 2" />
      <Button v-tooltip.focus="'This is the third button'" label="Button 3" />
    </div>
  </div>
</template>
```
:::

## Help Text for Form Fields

### Accessible Form Helpers

<Card>
  <form class="space-y-4 max-w-md">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Full Name
        <Tooltip
          content="Enter your first and last name"
          trigger="hover"
          position="right"
        >
          <span class="text-gray-400 cursor-help ml-1">(?)</span>
        </Tooltip>
      </label>
      <input
        type="text"
        placeholder="John Doe"
        aria-label="Full name"
        aria-describedby="name-help"
        class="w-full! border! border-gray-300! dark:border-gray-600! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!"
      >
      <p id="name-help" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Used for your account profile
      </p>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Email Address
        <Tooltip
          content="We'll use this for login and notifications"
          trigger="hover"
          position="right"
        >
          <span class="text-gray-400 cursor-help ml-1">(?)</span>
        </Tooltip>
      </label>
      <input
        type="email"
        placeholder="your@email.com"
        aria-label="Email address"
        aria-describedby="email-help"
        class="w-full! border! border-gray-300! dark:border-gray-600! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!"
      >
      <p id="email-help" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Your email won't be shared with anyone
      </p>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Password
        <Tooltip
          content="Minimum 8 characters. Include uppercase, lowercase, and numbers."
          trigger="hover"
          position="right"
        >
          <span class="text-gray-400 cursor-help ml-1">(?)</span>
        </Tooltip>
      </label>
      <input
        type="password"
        aria-label="Password"
        aria-describedby="password-help"
        class="w-full! border! border-gray-300! dark:border-gray-600! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!"
      >
      <p id="password-help" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Use a strong password for security
      </p>
    </div>
  </form>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <form class="space-y-4 max-w-md">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Full Name
        <Tooltip
          content="Enter your first and last name"
          trigger="hover"
          position="right"
        >
          <span class="text-gray-400 cursor-help ml-1">(?)</span>
        </Tooltip>
      </label>
      <input
        type="text"
        placeholder="John Doe"
        aria-label="Full name"
        aria-describedby="name-help"
        class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
      <p id="name-help" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Used for your account profile
      </p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Email Address
        <Tooltip
          content="We'll use this for login and notifications"
          trigger="hover"
          position="right"
        >
          <span class="text-gray-400 cursor-help ml-1">(?)</span>
        </Tooltip>
      </label>
      <input
        type="email"
        placeholder="your@email.com"
        aria-label="Email address"
        aria-describedby="email-help"
        class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
      <p id="email-help" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Your email won't be shared with anyone
      </p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Password
        <Tooltip
          content="Minimum 8 characters. Include uppercase, lowercase, and numbers."
          trigger="hover"
          position="right"
        >
          <span class="text-gray-400 cursor-help ml-1">(?)</span>
        </Tooltip>
      </label>
      <input
        type="password"
        aria-label="Password"
        aria-describedby="password-help"
        class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
      <p id="password-help" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Use a strong password for security
      </p>
    </div>
  </form>
</template>
```
:::

## Screen Reader Announcements

### ARIA Labels with Tooltips

<Card>
  <nav class="flex gap-4 items-center p-4 bg-gray-100 dark:bg-gray-800 rounded">
    <Tooltip content="Home page" position="bottom">
      <button
        aria-label="Go to home page"
        class="p-2! hover:bg-gray-200! dark:hover:bg-gray-700! rounded!"
      >
        🏠
      </button>
    </Tooltip>
    <Tooltip
      :content="`You have ${notificationCount} new notifications`"
      position="bottom"
    >
      <button
        :aria-label="`Notifications. You have ${notificationCount} unread messages`"
        class="relative! p-2! hover:bg-gray-200! dark:hover:bg-gray-700! rounded!"
      >
        🔔
        <span
          v-if="notificationCount > 0"
          class="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
        >
          {{ notificationCount }}
        </span>
      </button>
    </Tooltip>
    <Tooltip
      :content="`${unreadCount} unread messages`"
      position="bottom"
    >
      <button
        :aria-label="`Messages. You have ${unreadCount} unread`"
        class="relative! p-2! hover:bg-gray-200! dark:hover:bg-gray-700! rounded!"
      >
        ✉️
        <span
          v-if="unreadCount > 0"
          class="absolute top-0 right-0 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center"
        >
          {{ unreadCount }}
        </span>
      </button>
    </Tooltip>
    <Tooltip content="User settings" position="bottom">
      <button
        aria-label="Open user settings menu"
        class="p-2! hover:bg-gray-200! dark:hover:bg-gray-700! rounded!"
      >
        ⚙️
      </button>
    </Tooltip>
  </nav>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<script setup>
import { ref } from 'vue'

const notificationCount = ref(5)
const unreadCount = ref(3)
</script>

<template>
  <nav class="flex gap-4 items-center p-4 bg-gray-100 dark:bg-gray-800 rounded">
    <Tooltip content="Home page" position="bottom">
      <button
        aria-label="Go to home page"
        class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
      >
        🏠
      </button>
    </Tooltip>

    <Tooltip
      :content="`You have ${notificationCount} new notifications`"
      position="bottom"
    >
      <button
        :aria-label="`Notifications. You have ${notificationCount} unread messages`"
        class="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
      >
        🔔
        <span
          v-if="notificationCount > 0"
          class="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
        >
          {{ notificationCount }}
        </span>
      </button>
    </Tooltip>

    <Tooltip
      :content="`${unreadCount} unread messages`"
      position="bottom"
    >
      <button
        :aria-label="`Messages. You have ${unreadCount} unread`"
        class="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
      >
        ✉️
        <span
          v-if="unreadCount > 0"
          class="absolute top-0 right-0 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center"
        >
          {{ unreadCount }}
        </span>
      </button>
    </Tooltip>

    <Tooltip content="User settings" position="bottom">
      <button
        aria-label="Open user settings menu"
        class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
      >
        ⚙️
      </button>
    </Tooltip>
  </nav>
</template>
```
:::

## Disabled Elements

### Tooltips for Disabled Controls

<Card>
  <div class="space-y-4">
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
      Tooltips help explain why features are disabled.
    </p>
    <div class="space-y-2">
      <Button
        v-tooltip.hover="'Feature will be available after account verification'"
        label="Premium Feature"
        disabled
      />
      <Button
        v-tooltip.hover="'You need to select an item first'"
        label="Delete Selected"
        disabled
      />
      <Button
        v-tooltip.hover="'Saving in progress...'"
        label="Save Changes"
        disabled
      />
    </div>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="space-y-4">
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
      Tooltips help explain why features are disabled.
    </p>

    <div class="space-y-2">
      <div>
        <Tooltip
          content="Feature will be available after account verification"
          trigger="hover"
        >
          <Button label="Premium Feature" disabled />
        </Tooltip>
      </div>

      <div>
        <Tooltip
          content="You need to select an item first"
          trigger="hover"
        >
          <Button label="Delete Selected" disabled />
        </Tooltip>
      </div>

      <div>
        <Tooltip
          content="Saving in progress..."
          trigger="hover"
        >
          <Button label="Save Changes" disabled />
        </Tooltip>
      </div>
    </div>
  </div>
</template>
```

```vue [Directive API]
<template>
  <div class="space-y-4">
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
      Tooltips help explain why features are disabled.
    </p>

    <div class="space-y-2">
      <Button
        v-tooltip.hover="'Feature will be available after account verification'"
        label="Premium Feature"
        disabled
      />

      <Button
        v-tooltip.hover="'You need to select an item first'"
        label="Delete Selected"
        disabled
      />

      <Button
        v-tooltip.hover="'Saving in progress...'"
        label="Save Changes"
        disabled
      />
    </div>
  </div>
</template>
```
:::

## Icon Button Accessibility

### Meaningful Tooltips for Icons

<Card>
  <div class="space-y-6">
    <!-- Toolbar Example -->
    <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded flex gap-2">
      <Tooltip
        content="Create new document"
        trigger="both"
        position="bottom"
      >
        <button
          aria-label="Create new document"
          class="p-2! hover:bg-gray-200! dark:hover:bg-gray-700! rounded!"
        >
          📄
        </button>
      </Tooltip>
      <Tooltip
        content="Open existing file"
        trigger="both"
        position="bottom"
      >
        <button
          aria-label="Open existing file"
          class="p-2! hover:bg-gray-200! dark:hover:bg-gray-700! rounded!"
        >
          📁
        </button>
      </Tooltip>
      <Tooltip
        content="Save document"
        trigger="both"
        position="bottom"
      >
        <button
          aria-label="Save document"
          class="p-2! hover:bg-gray-200! dark:hover:bg-gray-700! rounded!"
        >
          💾
        </button>
      </Tooltip>
      <div class="border-l border-gray-300 dark:border-gray-600"></div>
      <Tooltip
        content="Undo last action"
        trigger="both"
        position="bottom"
      >
        <button
          aria-label="Undo last action"
          class="p-2! hover:bg-gray-200! dark:hover:bg-gray-700! rounded!"
        >
          ↶
        </button>
      </Tooltip>
      <Tooltip
        content="Redo last action"
        trigger="both"
        position="bottom"
      >
        <button
          aria-label="Redo last action"
          class="p-2! hover:bg-gray-200! dark:hover:bg-gray-700! rounded!"
        >
          ↷
        </button>
      </Tooltip>
    </div>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="space-y-6">
    <!-- Toolbar Example -->
    <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded flex gap-2">
      <Tooltip
        content="Create new document"
        trigger="both"
        position="bottom"
      >
        <button
          aria-label="Create new document"
          class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
        >
          📄
        </button>
      </Tooltip>

      <Tooltip
        content="Open existing file"
        trigger="both"
        position="bottom"
      >
        <button
          aria-label="Open existing file"
          class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
        >
          📁
        </button>
      </Tooltip>

      <Tooltip
        content="Save document"
        trigger="both"
        position="bottom"
      >
        <button
          aria-label="Save document"
          class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
        >
          💾
        </button>
      </Tooltip>

      <div class="border-l border-gray-300 dark:border-gray-600"></div>

      <Tooltip
        content="Undo last action"
        trigger="both"
        position="bottom"
      >
        <button
          aria-label="Undo last action"
          class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
        >
          ↶
        </button>
      </Tooltip>

      <Tooltip
        content="Redo last action"
        trigger="both"
        position="bottom"
      >
        <button
          aria-label="Redo last action"
          class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
        >
          ↷
        </button>
      </Tooltip>
    </div>
  </div>
</template>
```
:::

## Abbreviations and Acronyms

### Explain Abbreviations

<Card>
  <div class="space-y-4">
    <p class="text-gray-700 dark:text-gray-300">
      This project uses
      <Tooltip content="Vue is a JavaScript framework for building user interfaces">
        <span class="underline decoration-dotted cursor-help text-blue-600 dark:text-blue-400">
          Vue
        </span>
      </Tooltip>
      and
      <Tooltip content="TypeScript is a strongly typed programming language built on JavaScript">
        <span class="underline decoration-dotted cursor-help text-blue-600 dark:text-blue-400">
          TypeScript
        </span>
      </Tooltip>
      for development.
    </p>
    <p class="text-gray-700 dark:text-gray-300">
      The
      <Tooltip content="Application Programming Interface - a set of rules for software communication">
        <span class="underline decoration-dotted cursor-help text-blue-600 dark:text-blue-400">
          API
        </span>
      </Tooltip>
      is
      <Tooltip content="Representational State Transfer - an architectural style for web services">
        <span class="underline decoration-dotted cursor-help text-blue-600 dark:text-blue-400">
          REST
        </span>
      </Tooltip>
      based.
    </p>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="space-y-4">
    <p class="text-gray-700 dark:text-gray-300">
      This project uses
      <Tooltip content="Vue is a JavaScript framework for building user interfaces">
        <span class="underline decoration-dotted cursor-help text-blue-600 dark:text-blue-400">
          Vue
        </span>
      </Tooltip>
      and
      <Tooltip content="TypeScript is a strongly typed programming language built on JavaScript">
        <span class="underline decoration-dotted cursor-help text-blue-600 dark:text-blue-400">
          TypeScript
        </span>
      </Tooltip>
      for development.
    </p>

    <p class="text-gray-700 dark:text-gray-300">
      The
      <Tooltip content="Application Programming Interface - a set of rules for software communication">
        <span class="underline decoration-dotted cursor-help text-blue-600 dark:text-blue-400">
          API
        </span>
      </Tooltip>
      is
      <Tooltip content="Representational State Transfer - an architectural style for web services">
        <span class="underline decoration-dotted cursor-help text-blue-600 dark:text-blue-400">
          REST
        </span>
      </Tooltip>
      based.
    </p>
  </div>
</template>
```
:::

## Best Practices

### Summary

Here are key accessibility principles for using tooltips:

1. **Keyboard Navigation**: Ensure tooltips appear on focus for keyboard users
2. **ARIA Labels**: Use `aria-label` and `aria-describedby` for screen readers (tooltips will do this automatically)
3. **Visual Indicators**: Always provide visual feedback for interactive elements
4. **Context**: Tooltips should supplement, not replace, visible labels
5. **Delays**: Use reasonable delays to avoid overwhelming users
6. **Alternative Text**: Provide alt text for icon-only buttons
7. **Clear Language**: Use simple, clear language in tooltip content
8. **Disabled State**: Explain why features are disabled
9. **Error Messages**: Use tooltips for validation feedback
10. **Mobile**: Consider touch accessibility when appropriate

## More Examples

- [Back to Examples](./index.md)
- [Form Examples](./forms.md)
- [Interactive Examples](./interactive.md)
- [Positioning Examples](./positioning.md)

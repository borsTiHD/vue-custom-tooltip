<script setup>
import { computed, ref } from 'vue'

// Contextual Button Helpers
const formValid = ref(false)
const isSubmitting = ref(false)

const submitTooltip = computed(() => {
  if (isSubmitting.value) return 'Submitting...'
  if (!formValid.value) return 'Please fill in all required fields'
  return 'Click to submit the form'
})

// Dynamic Validation Feedback
function useDynamicValidationExample() {
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')

  const emailValid = computed(() => {
    if (!email.value) return null
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email.value)
  })

  const passwordStrength = computed(() => {
    if (!password.value) return 'empty'
    const hasUpper = /[A-Z]/.test(password.value)
    const hasLower = /[a-z]/.test(password.value)
    const hasNumber = /[0-9]/.test(password.value)
    const length = password.value.length >= 8

    if (hasUpper && hasLower && hasNumber && length) return 'strong'
    if ((hasUpper || hasLower) && hasNumber && length) return 'medium'
    return 'weak'
  })

  const passwordsMatch = computed(() => {
    if (!password.value || !confirmPassword.value) return null
    return password.value === confirmPassword.value
  })

  const getEmailTooltip = computed(() => {
    if (!email.value) return 'Enter a valid email'
    return emailValid.value ? '✓ Email valid!' : '✗ Invalid email format'
  })

  const getPasswordTooltip = computed(() => {
    if (!password.value) return 'Must be at least 8 characters'
    const strength = { weak: '✗ Weak', medium: '◐ Medium', strong: '✓ Strong' }
    return strength[passwordStrength.value]
  })

  const getConfirmTooltip = computed(() => {
    if (!confirmPassword.value) return 'Confirm your password'
    return passwordsMatch.value ? '✓ Passwords match!' : '✗ Passwords do not match'
  })

  const emailClass = computed(() => {
    if (emailValid.value === null) return ''
    return emailValid.value ? 'border-green-500!' : 'border-red-500!'
  })

  const passwordClass = computed(() => {
    if (passwordStrength.value === 'empty') return ''
    const classes = {
      weak: 'border-red-500!',
      medium: 'border-yellow-500!',
      strong: 'border-green-500!'
    }
    return classes[passwordStrength.value]
  })

  const confirmClass = computed(() => {
    if (passwordsMatch.value === null) return ''
    return passwordsMatch.value ? 'border-green-500!' : 'border-red-500!'
  })

  return {
    email,
    password,
    confirmPassword,
    emailValid,
    passwordStrength,
    passwordsMatch,
    getEmailTooltip,
    getPasswordTooltip,
    getConfirmTooltip,
    emailClass,
    passwordClass,
    confirmClass,
  }
}

const {
  email,
  password,
  confirmPassword,
  emailValid,
  passwordStrength,
  passwordsMatch,
  getEmailTooltip,
  getPasswordTooltip,
  getConfirmTooltip,
  emailClass,
  passwordClass,
  confirmClass,
} = useDynamicValidationExample()
</script>

# Form Examples

Real-world examples of using Vue Custom Tooltip with forms, including input helpers, validation feedback, and form-related patterns.

## Input Helpers

### Basic Input Tooltips

<Card>
  <form class="space-y-4 max-w-md">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Username
      </label>
      <input
        v-tooltip.focus.top="'Username must be 3-20 characters'"
        type="text"
        placeholder="Enter username"
        class="w-full! border! border-gray-300! dark:border-gray-600! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!"
      >
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Email
      </label>
      <input
        v-tooltip.focus.top="'We will never share your email'"
        type="email"
        placeholder="your@email.com"
        class="w-full! border! border-gray-300! dark:border-gray-600! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!"
      >
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Password
      </label>
      <input
        v-tooltip.focus.top="'Must be at least 8 characters with uppercase, lowercase, and numbers'"
        type="password"
        placeholder="Enter password"
        class="w-full! border! border-gray-300! dark:border-gray-600! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!"
      >
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
        Username
      </label>
      <Tooltip content="Username must be 3-20 characters" trigger="focus">
        <input
          type="text"
          placeholder="Enter username"
          class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
      </Tooltip>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Email
      </label>
      <Tooltip content="We'll never share your email" trigger="focus">
        <input
          type="email"
          placeholder="your@email.com"
          class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
      </Tooltip>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Password
      </label>
      <Tooltip content="Must be at least 8 characters with uppercase, lowercase, and numbers" trigger="focus">
        <input
          type="password"
          placeholder="Enter password"
          class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
      </Tooltip>
    </div>
  </form>
</template>
```

```vue [Directive API]
<template>
  <form class="space-y-4 max-w-md">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Username
      </label>
      <input
        v-tooltip.focus="'Username must be 3-20 characters'"
        type="text"
        placeholder="Enter username"
        class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Email
      </label>
      <input
        v-tooltip.focus="'We will never share your email'"
        type="email"
        placeholder="your@email.com"
        class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Password
      </label>
      <input
        v-tooltip.focus.top="'Must be at least 8 characters with uppercase, lowercase, and numbers'"
        type="password"
        placeholder="Enter password"
        class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
    </div>
  </form>
</template>
```
:::

## Form Validation

### Dynamic Validation Feedback

<Card>
  <form class="space-y-4 max-w-md form-validation-example">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Email
      </label>
      <Tooltip
        v-model="show"
        :content="getEmailTooltip"
        :tooltip-class="emailValid ? 'tooltip-success' : 'tooltip-error'"
        position="right"
      >
        <input
          v-model="email"
          type="email"
          placeholder="your@email.com"
          :class="['w-full! border-2! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!', emailClass]"
        >
      </Tooltip>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Password
      </label>
      <Tooltip
        :content="getPasswordTooltip"
        :tooltip-class="passwordStrength === 'strong' ? 'tooltip-success' : 'tooltip-warning'"
        position="right"
      >
        <input
          v-model="password"
          type="password"
          placeholder="Enter password"
          :class="['w-full! border-2! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!', passwordClass]"
        >
      </Tooltip>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Confirm Password
      </label>
      <Tooltip
        :content="getConfirmTooltip"
        :tooltip-class="passwordsMatch ? 'tooltip-success' : 'tooltip-error'"
        position="right"
      >
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm password"
          :class="['w-full! border-2! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!', confirmClass]"
        >
      </Tooltip>
    </div>
  </form>
</Card>

<style>
.tooltip-success .tooltip-content {
  background: #10b981 !important;
  color: white !important;
}

.tooltip-success .tooltip-arrow {
  background: #10b981 !important;
  border-color: #10b981 !important;
}

.tooltip-error .tooltip-content {
  background: #ef4444 !important;
  color: white !important;
}

.tooltip-error .tooltip-arrow {
  background: #ef4444 !important;
  border-color: #ef4444 !important;
}

.tooltip-warning .tooltip-content {
  background: #f59e0b !important;
  color: white !important;
}

.tooltip-warning .tooltip-arrow {
  background: #f59e0b !important;
  border-color: #f59e0b !important;
}
</style>

::: details Show code
::: code-group
```vue [Component API]
<script setup>
import { computed, ref } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const emailValid = computed(() => {
  if (!email.value) return null
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email.value)
})

const passwordStrength = computed(() => {
  if (!password.value) return 'empty'
  const hasUpper = /[A-Z]/.test(password.value)
  const hasLower = /[a-z]/.test(password.value)
  const hasNumber = /[0-9]/.test(password.value)
  const length = password.value.length >= 8

  if (hasUpper && hasLower && hasNumber && length) return 'strong'
  if ((hasUpper || hasLower) && hasNumber && length) return 'medium'
  return 'weak'
})

const passwordsMatch = computed(() => {
  if (!password.value || !confirmPassword.value) return null
  return password.value === confirmPassword.value
})

const getEmailTooltip = computed(() => {
  if (!email.value) return 'Enter a valid email'
  return emailValid.value ? '✓ Email valid!' : '✗ Invalid email format'
})

const getPasswordTooltip = computed(() => {
  if (!password.value) return 'Must be at least 8 characters'
  const strength = { weak: '✗ Weak', medium: '◐ Medium', strong: '✓ Strong' }
  return strength[passwordStrength.value]
})

const getConfirmTooltip = computed(() => {
  if (!confirmPassword.value) return 'Confirm your password'
  return passwordsMatch.value ? '✓ Passwords match!' : '✗ Passwords do not match'
})

const emailClass = computed(() => {
  if (emailValid.value === null) return ''
  return emailValid.value ? 'border-green-500' : 'border-red-500'
})

const passwordClass = computed(() => {
  if (passwordStrength.value === 'empty') return ''
  const classes = {
    weak: 'border-red-500',
    medium: 'border-yellow-500',
    strong: 'border-green-500'
  }
  return classes[passwordStrength.value]
})

const confirmClass = computed(() => {
  if (passwordsMatch.value === null) return ''
  return passwordsMatch.value ? 'border-green-500' : 'border-red-500'
})
</script>

<template>
  <form class="space-y-4 max-w-md">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Email
      </label>
      <Tooltip
        :content="getEmailTooltip"
        :tooltip-class="emailValid ? 'tooltip-success' : 'tooltip-error'"
        position="right"
      >
        <input
          v-model="email"
          type="email"
          placeholder="your@email.com"
          :class="['w-full border-2 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white', emailClass]"
        >
      </Tooltip>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Password
      </label>
      <Tooltip
        :content="getPasswordTooltip"
        :tooltip-class="passwordStrength === 'strong' ? 'tooltip-success' : 'tooltip-warning'"
        position="right"
      >
        <input
          v-model="password"
          type="password"
          placeholder="Enter password"
          :class="['w-full border-2 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white', passwordClass]"
        >
      </Tooltip>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Confirm Password
      </label>
      <Tooltip
        :content="getConfirmTooltip"
        :tooltip-class="passwordsMatch ? 'tooltip-success' : 'tooltip-error'"
        position="right"
      >
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm password"
          :class="['w-full border-2 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white', confirmClass]"
        >
      </Tooltip>
    </div>
  </form>
</template>

<style scoped>
.tooltip-success .tooltip-content {
  background: #10b981 !important;
  color: white !important;
}

.tooltip-success .tooltip-arrow {
  background: #10b981 !important;
  border-color: #10b981 !important;
}

.tooltip-error .tooltip-content {
  background: #ef4444 !important;
  color: white !important;
}

.tooltip-error .tooltip-arrow {
  background: #ef4444 !important;
  border-color: #ef4444 !important;
}

.tooltip-warning .tooltip-content {
  background: #f59e0b !important;
  color: white !important;
}

.tooltip-warning .tooltip-arrow {
  background: #f59e0b !important;
  border-color: #f59e0b !important;
}
</style>
```
:::

## Checkbox and Radio Groups

### Labeled Options with Help

<Card>
  <div class="space-y-4 max-w-md">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Notification Preferences
      </label>
      <div class="space-y-2">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="rounded!" />
          <span class="text-sm">Email notifications</span>
          <span
            v-tooltip.right="'Get notified about important updates via email'"
            class="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-help"
          >
            ?
          </span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="rounded!" />
          <span class="text-sm">SMS alerts</span>
          <span
            v-tooltip.right="'Receive critical alerts via text message'"
            class="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-help"
          >
            ?
          </span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="rounded!" />
          <span class="text-sm">Push notifications</span>
          <span
            v-tooltip.right="'Receive notifications in your browser'"
            class="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-help"
          >
            ?
          </span>
        </label>
      </div>
    </div>
  </div>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <div class="space-y-4 max-w-md">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Notification Preferences
      </label>
      <div class="space-y-2">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="rounded" />
          <span class="text-sm">Email notifications</span>
          <Tooltip content="Get notified about important updates via email" position="right">
            <span class="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-help">
              ?
            </span>
          </Tooltip>
        </label>

        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="rounded" />
          <span class="text-sm">SMS alerts</span>
          <Tooltip content="Receive critical alerts via text message" position="right">
            <span class="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-help">
              ?
            </span>
          </Tooltip>
        </label>

        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="rounded" />
          <span class="text-sm">Push notifications</span>
          <Tooltip content="Receive notifications in your browser" position="right">
            <span class="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-help">
              ?
            </span>
          </Tooltip>
        </label>
      </div>
    </div>
  </div>
</template>
```

```vue [Directive API]
<template>
  <div class="space-y-4 max-w-md">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Notification Preferences
      </label>
      <div class="space-y-2">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="rounded" />
          <span class="text-sm">Email notifications</span>
          <span
            v-tooltip.right="'Get notified about important updates via email'"
            class="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-help"
          >
            ?
          </span>
        </label>

        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="rounded" />
          <span class="text-sm">SMS alerts</span>
          <span
            v-tooltip.right="'Receive critical alerts via text message'"
            class="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-help"
          >
            ?
          </span>
        </label>

        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="rounded" />
          <span class="text-sm">Push notifications</span>
          <span
            v-tooltip.right="'Receive notifications in your browser'"
            class="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-help"
          >
            ?
          </span>
        </label>
      </div>
    </div>
  </div>
</template>
```
:::

## Select Dropdowns

### Select with Helper

<Card>
  <form class="space-y-4 max-w-md">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Subscription Plan
      </label>
      <Tooltip
        content="Choose a plan based on your needs. You can upgrade or downgrade anytime."
        trigger="focus"
        position="top"
      >
        <select
          class="w-full! border! border-gray-300! dark:border-gray-600! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!"
        >
          <option>Select a plan</option>
          <option>Basic ($9/month)</option>
          <option>Pro ($29/month)</option>
          <option>Enterprise (Custom)</option>
        </select>
      </Tooltip>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Country
      </label>
      <Tooltip
        content="This is required for accurate pricing and compliance"
        trigger="focus"
        position="top"
      >
        <select
          class="w-full! border! border-gray-300! dark:border-gray-600! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!"
        >
          <option>Select country</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Canada</option>
          <option>Other</option>
        </select>
      </Tooltip>
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
        Subscription Plan
      </label>
      <Tooltip
        content="Choose a plan based on your needs. You can upgrade or downgrade anytime."
        trigger="focus"
        position="top"
      >
        <select
          class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option>Select a plan</option>
          <option>Basic ($9/month)</option>
          <option>Pro ($29/month)</option>
          <option>Enterprise (Custom)</option>
        </select>
      </Tooltip>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Country
      </label>
      <Tooltip
        content="This is required for accurate pricing and compliance"
        trigger="focus"
      >
        <select
          class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option>Select country</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Canada</option>
          <option>Other</option>
        </select>
      </Tooltip>
    </div>
  </form>
</template>
```
:::

## Required Fields Indicator

### Visual Indicators with Tooltips

<Card>
  <form class="space-y-4 max-w-md">
    <div class="flex items-center gap-2 mb-4">
      <span v-tooltip="'Fields marked with this symbol are required'" class="text-red-500 text-lg cursor-help">
        *
      </span>
      <span class="text-sm text-gray-600 dark:text-gray-400">
        = Required field
      </span>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        <span class="text-red-500">*</span> Full Name
      </label>
      <input
        type="text"
        placeholder="John Doe"
        class="w-full! border! border-gray-300! dark:border-gray-600! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!"
      >
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        <span class="text-red-500">*</span> Email Address
      </label>
      <input
        type="email"
        placeholder="john@example.com"
        class="w-full! border! border-gray-300! dark:border-gray-600! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!"
      >
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Company (Optional)
      </label>
      <input
        type="text"
        placeholder="Your Company"
        class="w-full! border! border-gray-300! dark:border-gray-600! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!"
      >
    </div>
  </form>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<template>
  <form class="space-y-4 max-w-md">
    <div class="flex items-center gap-2 mb-4">
      <Tooltip content="Fields marked with this symbol are required">
        <span class="text-red-500 text-lg cursor-help">*</span>
      </Tooltip>
      <span class="text-sm text-gray-600 dark:text-gray-400">
        = Required field
      </span>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        <span class="text-red-500">*</span> Full Name
      </label>
      <input
        type="text"
        placeholder="John Doe"
        class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        <span class="text-red-500">*</span> Email Address
      </label>
      <input
        type="email"
        placeholder="john@example.com"
        class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Company (Optional)
      </label>
      <input
        type="text"
        placeholder="Your Company"
        class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
    </div>
  </form>
</template>
```

```vue [Directive API]
<template>
  <form class="space-y-4 max-w-md">
    <div class="flex items-center gap-2 mb-4">
      <span v-tooltip="'Fields marked with this symbol are required'" class="text-red-500 text-lg cursor-help">
        *
      </span>
      <span class="text-sm text-gray-600 dark:text-gray-400">
        = Required field
      </span>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        <span class="text-red-500">*</span> Full Name
      </label>
      <input
        type="text"
        placeholder="John Doe"
        class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        <span class="text-red-500">*</span> Email Address
      </label>
      <input
        type="email"
        placeholder="john@example.com"
        class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Company (Optional)
      </label>
      <input
        type="text"
        placeholder="Your Company"
        class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
    </div>
  </form>
</template>
```
:::

## Submit Button Tooltips

### Contextual Button Helpers

<Card>
  <form class="space-y-4 max-w-md">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Email
      </label>
      <input
        type="email"
        placeholder="your@email.com"
        @change="formValid = $event.target.value.length > 0"
        class="w-full! border! border-gray-300! dark:border-gray-600! rounded! px-3! py-2! bg-white! dark:bg-gray-700! text-gray-900! dark:text-white!"
      >
    </div>
    <div>
      <Tooltip :content="submitTooltip" position="top">
        <Button
          label="Submit"
          :disabled="!formValid || isSubmitting"
          class="w-full"
        />
      </Tooltip>
    </div>
  </form>
</Card>

::: details Show code
::: code-group
```vue [Component API]
<script setup>
import { computed, ref } from 'vue'

const formValid = ref(false)
const isSubmitting = ref(false)

const submitTooltip = computed(() => {
  if (isSubmitting.value) return 'Submitting...'
  if (!formValid.value) return 'Please fill in all required fields'
  return 'Click to submit the form'
})
</script>

<template>
  <form class="space-y-4 max-w-md">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Email
      </label>
      <input
        type="email"
        placeholder="your@email.com"
        @change="formValid = $event.target.value.length > 0"
        class="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
    </div>

    <div>
      <Tooltip :content="submitTooltip" position="top">
        <Button
          label="Submit"
          :disabled="!formValid || isSubmitting"
          class="w-full"
        />
      </Tooltip>
    </div>
  </form>
</template>
```
:::

## More Examples

- [Back to Examples](./index.md)
- [Interactive Examples](./interactive.md)
- [Positioning Examples](./positioning.md)
- [Accessibility Examples](./accessibility.md)

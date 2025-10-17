<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

export type Appearance = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'theme-preference'

const currentTheme = ref<Appearance>('system')

function setAppearance(appearance: Appearance) {
  if (appearance === 'system') {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(dark ? 'dark' : 'light')
  }
  else {
    applyTheme(appearance)
  }
}

function applyTheme(theme: 'light' | 'dark') {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
    document.body.classList.add('dark')
  }
  else {
    document.documentElement.classList.remove('dark')
    document.body.classList.remove('dark')
  }
}

function toggleTheme() {
  const themes: Appearance[] = ['light', 'dark', 'system']
  const currentIndex = themes.indexOf(currentTheme.value)
  const nextIndex = (currentIndex + 1) % themes.length
  currentTheme.value = themes[nextIndex]!
}

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY) as Appearance | null
  currentTheme.value = savedTheme || 'system'
  setAppearance(currentTheme.value)
}

// Watch for theme changes and persist to localStorage
watch(currentTheme, (newTheme) => {
  localStorage.setItem(STORAGE_KEY, newTheme)
  setAppearance(newTheme)
})

// Listen for system theme changes
onMounted(() => {
  initTheme()

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleChange = () => {
    if (currentTheme.value === 'system') {
      setAppearance('system')
    }
  }

  mediaQuery.addEventListener('change', handleChange)

  // Cleanup on unmount
  return () => mediaQuery.removeEventListener('change', handleChange)
})
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="`Switch to ${currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'system' : 'light'} mode`"
    :title="`Current: ${currentTheme} mode`"
    @click="toggleTheme"
  >
    <!-- Light Mode Icon -->
    <svg
      v-if="currentTheme === 'light'"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>

    <!-- Dark Mode Icon -->
    <svg
      v-else-if="currentTheme === 'dark'"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>

    <!-- System Mode Icon -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>

    <span class="theme-label">{{ currentTheme }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: #ffffff;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.theme-toggle:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.theme-toggle:active {
  transform: scale(0.98);
}

.dark .theme-toggle {
  background-color: #1f2937;
  color: #f9fafb;
  border-color: #374151;
}

.dark .theme-toggle:hover {
  background-color: #374151;
  border-color: #4b5563;
}

.theme-label {
  text-transform: capitalize;
}
</style>

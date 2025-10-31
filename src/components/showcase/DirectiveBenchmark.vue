<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import Button from '@/components/Button.vue'

interface PerformanceMetrics {
  mountTime: number
  memoryUsage: number | null
  elementCount: number
  renderTime: number
  averageTooltipShowTime: number
  fps: number
}

const tooltipCount = ref(1000)
const isRendering = ref(false)
const metrics = ref<PerformanceMetrics>({
  mountTime: 0,
  memoryUsage: null,
  elementCount: 0,
  renderTime: 0,
  averageTooltipShowTime: 0,
  fps: 0,
})

const buttons = computed(() =>
  Array.from({ length: tooltipCount.value }, (_, i) => `Button ${i + 1}`),
)

// Measure FPS during interaction
let frameCount = 0
let lastFrameTime = performance.now()
let fpsInterval: number | null = null

function measureFPS() {
  frameCount++
  const currentTime = performance.now()
  const elapsed = currentTime - lastFrameTime

  if (elapsed >= 1000) {
    metrics.value.fps = Math.round((frameCount * 1000) / elapsed)
    frameCount = 0
    lastFrameTime = currentTime
  }

  if (fpsInterval !== null) {
    requestAnimationFrame(measureFPS)
  }
}

function startFPSMonitoring() {
  if (fpsInterval === null) {
    frameCount = 0
    lastFrameTime = performance.now()
    fpsInterval = requestAnimationFrame(measureFPS) as unknown as number
  }
}

function stopFPSMonitoring() {
  if (fpsInterval !== null) {
    cancelAnimationFrame(fpsInterval)
    fpsInterval = null
  }
}

// Measure tooltip show time
async function measureTooltipShowTime(): Promise<number> {
  const testElement = document.querySelector('[data-benchmark-test]') as HTMLElement
  if (!testElement)
    return 0

  const times: number[] = []

  for (let i = 0; i < 10; i++) {
    const startTime = performance.now()

    // Trigger tooltip
    const mouseEnterEvent = new MouseEvent('mouseenter', {
      bubbles: true,
      cancelable: true,
    })
    testElement.dispatchEvent(mouseEnterEvent)

    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))

    const endTime = performance.now()
    times.push(endTime - startTime)

    // Hide tooltip
    const mouseLeaveEvent = new MouseEvent('mouseleave', {
      bubbles: true,
      cancelable: true,
    })
    testElement.dispatchEvent(mouseLeaveEvent)

    await new Promise(resolve => setTimeout(resolve, 50))
  }

  return times.reduce((a, b) => a + b, 0) / times.length
}

// Measure rendering performance
async function measurePerformance() {
  isRendering.value = true

  const startTime = performance.now()

  // Force re-render
  const currentCount = tooltipCount.value
  tooltipCount.value = 0
  await nextTick()

  tooltipCount.value = currentCount
  await nextTick()

  const mountEndTime = performance.now()
  metrics.value.mountTime = mountEndTime - startTime

  // Wait for DOM to settle
  await new Promise(resolve => setTimeout(resolve, 100))

  const renderEndTime = performance.now()
  metrics.value.renderTime = renderEndTime - startTime

  // Count elements
  const container = document.querySelector('[data-benchmark-container]')
  metrics.value.elementCount = container ? container.querySelectorAll('button').length : 0

  // Measure memory (if available)
  if ((performance as any).memory) {
    metrics.value.memoryUsage = Math.round(
      (performance as any).memory.usedJSHeapSize / 1048576,
    )
  }

  // Measure tooltip show time
  metrics.value.averageTooltipShowTime = await measureTooltipShowTime()

  isRendering.value = false
}

// Run benchmark on mount and when count changes
onMounted(async () => {
  await nextTick()
  await measurePerformance()
  startFPSMonitoring()
})

watch(tooltipCount, async () => {
  if (!isRendering.value) {
    await measurePerformance()
  }
})

// Cleanup
onMounted(() => {
  return () => {
    stopFPSMonitoring()
  }
})

function handleMouseEnter() {
  startFPSMonitoring()
}

function handleMouseLeave() {
  stopFPSMonitoring()
  metrics.value.fps = 0
}
</script>

<template>
  <div class="p-8 space-y-8">
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
      Tooltip Directive Benchmark
    </h2>

    <!-- Performance Metrics Dashboard -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Performance Metrics
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <!-- Tooltip Count -->
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Tooltip Count
          </div>
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {{ metrics.elementCount }}
          </div>
        </div>

        <!-- Mount Time -->
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Mount Time
          </div>
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">
            {{ metrics.mountTime.toFixed(2) }}ms
          </div>
        </div>

        <!-- Render Time -->
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Render Time
          </div>
          <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {{ metrics.renderTime.toFixed(2) }}ms
          </div>
        </div>

        <!-- Average Tooltip Show Time -->
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Avg. Show Time
          </div>
          <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {{ metrics.averageTooltipShowTime.toFixed(2) }}ms
          </div>
        </div>

        <!-- FPS -->
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">
            FPS (hover to measure)
          </div>
          <div
            class="text-2xl font-bold"
            :class="{
              'text-green-600 dark:text-green-400': metrics.fps >= 55,
              'text-yellow-600 dark:text-yellow-400': metrics.fps >= 30 && metrics.fps < 55,
              'text-red-600 dark:text-red-400': metrics.fps > 0 && metrics.fps < 30,
              'text-gray-600 dark:text-gray-400': metrics.fps === 0,
            }"
          >
            {{ metrics.fps > 0 ? `${metrics.fps} FPS` : 'N/A' }}
          </div>
        </div>

        <!-- Memory Usage -->
        <div v-if="metrics.memoryUsage !== null" class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Memory Usage
          </div>
          <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">
            {{ metrics.memoryUsage }}MB
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-4 flex-wrap">
        <label class="flex items-center gap-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">Tooltip Count:</span>
          <input
            v-model.number="tooltipCount"
            type="number"
            min="1"
            max="5000"
            step="100"
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </label>

        <Button
          class="!px-4 !py-2"
          label="Re-run Benchmark"
          :disabled="isRendering"
          @click="measurePerformance"
        />

        <span v-if="isRendering" class="text-sm text-gray-600 dark:text-gray-400 italic">
          Running benchmark...
        </span>
      </div>

      <!-- Info -->
      <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
        <p class="text-sm text-blue-800 dark:text-blue-300">
          💡 <strong>Tip:</strong> Hover over the buttons below to measure FPS in real-time.
          Lower element counts show better performance metrics.
        </p>
      </div>
    </div>

    <!-- Performance test with tooltips -->
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Interactive Test Area
      </h3>
      <div
        data-benchmark-container
        class="flex flex-wrap gap-2 items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <Button
          v-for="(label, idx) in buttons"
          :key="idx"
          v-tooltip="`Tooltip for ${label}`"
          :label="label"
          class="text-xs px-2 py-1"
          :data-benchmark-test="idx === 0 ? '' : undefined"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ProjectHours } from '../utils/workOrders'

const props = defineProps<{
  data: ProjectHours[]
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

function renderChart() {
  if (!chartRef.value) {
    return
  }

  chart ??= echarts.init(chartRef.value)
  chart.setOption({
    title: {
      text: 'Project Hours Distribution',
      left: 0,
      textStyle: {
        color: '#152033',
        fontSize: 16,
        fontWeight: 600,
      },
    },
    grid: {
      top: 64,
      right: 20,
      bottom: 42,
      left: 48,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      valueFormatter: (value: number | string) => `${value} h`,
    },
    xAxis: {
      type: 'category',
      data: props.data.map((item) => item.project),
      axisLabel: {
        interval: 0,
        rotate: props.data.length > 3 ? 18 : 0,
      },
    },
    yAxis: {
      type: 'value',
      name: 'Hours',
      minInterval: 1,
    },
    series: [
      {
        name: 'Hours',
        type: 'bar',
        data: props.data.map((item) => item.hours),
        barMaxWidth: 48,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: '#2f7cf6',
        },
      },
    ],
  })
}

function handleResize() {
  chart?.resize()
}

onMounted(async () => {
  await nextTick()
  renderChart()
  window.addEventListener('resize', handleResize)
})

watch(
  () => props.data,
  async () => {
    await nextTick()
    renderChart()
  },
  { deep: true },
)

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
  chart = null
})
</script>

<template>
  <div ref="chartRef" class="chart-surface" aria-label="Project Hours Distribution"></div>
</template>

<script setup lang="ts">
import { DeleteOutlined, LogoutOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import type { TableColumnsType } from 'ant-design-vue'
import { computed, h, ref } from 'vue'
import { initialWorkOrders } from '../data/workOrders'
import type { UserRole, WorkOrder } from '../types/workOrder'
import { canDeleteWorkOrder } from '../utils/permissions'
import { deleteWorkOrder, summarizeHoursByProject } from '../utils/workOrders'
import ProjectHoursChart from './ProjectHoursChart.vue'

const props = defineProps<{
  username: string
  role: UserRole
}>()

const emit = defineEmits<{
  logout: []
}>()

const records = ref<WorkOrder[]>([...initialWorkOrders])
const isAdmin = computed(() => canDeleteWorkOrder(props.role))
const chartData = computed(() => summarizeHoursByProject(records.value))
const totalHours = computed(() => records.value.reduce((total, record) => total + record.hours, 0))

const columns = computed<TableColumnsType<WorkOrder>>(() => {
  const baseColumns: TableColumnsType<WorkOrder> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 86,
    },
    {
      title: 'Project',
      dataIndex: 'project',
      minWidth: 220,
    },
    {
      title: 'Overtime',
      dataIndex: 'overtime',
      width: 120,
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      width: 110,
      sorter: (a, b) => a.hours - b.hours,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      width: 180,
    },
  ]

  if (isAdmin.value) {
    baseColumns.push({
      title: 'Action',
      key: 'action',
      width: 116,
      fixed: 'right',
    })
  }

  return baseColumns
})

function handleDelete(id: string) {
  records.value = deleteWorkOrder(records.value, id, props.role)
}

function handleReset() {
  records.value = [...initialWorkOrders]
}
</script>

<template>
  <main class="dashboard-shell">
    <header class="dashboard-header">
      <div>
        <p class="eyebrow">Work Order Console</p>
        <h1>工单管理与图表展示</h1>
      </div>
      <div class="header-actions">
        <a-tag :color="isAdmin ? 'blue' : 'green'">
          {{ username }} · {{ isAdmin ? 'Admin' : 'User' }}
        </a-tag>
        <a-button :icon="h(ReloadOutlined)" @click="handleReset">Reset</a-button>
        <a-button :icon="h(LogoutOutlined)" @click="emit('logout')">Logout</a-button>
      </div>
    </header>

    <section class="metric-strip">
      <div class="metric">
        <span>Work Orders</span>
        <strong>{{ records.length }}</strong>
      </div>
      <div class="metric">
        <span>Total Hours</span>
        <strong>{{ totalHours.toFixed(1) }}</strong>
      </div>
      <div class="metric">
        <span>Projects</span>
        <strong>{{ chartData.length }}</strong>
      </div>
    </section>

    <section class="content-grid">
      <div class="workspace-card table-card">
        <div class="section-heading">
          <div>
            <h2>Work Orders</h2>
            <p>Delete action is available to admin users only.</p>
          </div>
        </div>

        <a-table
          :columns="columns"
          :data-source="records"
          :pagination="false"
          :scroll="{ x: 760 }"
          row-key="id"
          size="middle"
        >
          <template #bodyCell="{ column, record, text }">
            <template v-if="column.dataIndex === 'overtime'">
              <a-tag :color="record.overtime ? 'orange' : 'default'">
                {{ record.overtime ? 'Yes' : 'No' }}
              </a-tag>
            </template>
            <template v-else-if="column.dataIndex === 'hours'">
              {{ Number(text).toFixed(1) }}
            </template>
            <template v-else-if="column.key === 'action'">
              <a-popconfirm title="Delete this work order?" ok-text="Delete" @confirm="handleDelete(record.id)">
                <a-button danger size="small" :icon="h(DeleteOutlined)">Delete</a-button>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </div>

      <div class="workspace-card chart-card">
        <ProjectHoursChart :data="chartData" />
      </div>
    </section>
  </main>
</template>

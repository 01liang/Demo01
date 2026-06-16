<script setup lang="ts">
import { ref } from 'vue'
import LoginView from './components/LoginView.vue'
import WorkOrderDashboard from './components/WorkOrderDashboard.vue'
import type { UserRole } from './types/workOrder'
import { getRoleByUsername } from './utils/permissions'

const currentUser = ref('')
const currentRole = ref<UserRole>('user')

function handleLogin(username: string) {
  currentUser.value = username.trim()
  currentRole.value = getRoleByUsername(username)
}

function handleLogout() {
  currentUser.value = ''
  currentRole.value = 'user'
}
</script>

<template>
  <LoginView v-if="!currentUser" @login="handleLogin" />
  <WorkOrderDashboard
    v-else
    :username="currentUser"
    :role="currentRole"
    @logout="handleLogout"
  />
</template>

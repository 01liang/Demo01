<script setup lang="ts">
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { computed, reactive } from 'vue'

const emit = defineEmits<{
  login: [username: string]
}>()

const formState = reactive({
  username: '',
  password: '',
})

const canSubmit = computed(() => formState.username.trim().length > 0 && formState.password.length > 0)

function handleSubmit() {
  if (!canSubmit.value) {
    return
  }

  emit('login', formState.username)
}
</script>

<template>
  <main class="login-shell">
    <section class="login-panel">
      <div class="login-copy">
        <p class="eyebrow">Work Order Console</p>
        <h1>工单管理与图表展示</h1>
        <p>输入任意密码登录。用户名为 admin 时进入管理员模式，其余用户为普通权限。</p>
      </div>

      <a-form class="login-form" layout="vertical" :model="formState" @finish="handleSubmit">
        <a-form-item label="Username" name="username" required>
          <a-input v-model:value="formState.username" size="large" placeholder="admin or any user">
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="Password" name="password" required>
          <a-input-password v-model:value="formState.password" size="large" placeholder="Any value">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-button block size="large" type="primary" html-type="submit" :disabled="!canSubmit">
          Login
        </a-button>
      </a-form>
    </section>
  </main>
</template>

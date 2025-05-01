<template>
  <div v-if="isReady">
    <AdminHeader />
    <main>
      <NuxtPage />
    </main>
    <AdminFooter />
  </div>

  <div v-else class="d-flex justify-content-center align-items-center" style="height:100vh">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Yüklənir...</span>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import AdminHeader from '~/components/admin/AdminHeader.vue'
import AdminFooter from '~/components/admin/AdminFooter.vue'

const router = useRouter()
const route = useRoute()
const isReady = ref(false)

onMounted(() => {
  const token = localStorage.getItem('admin_token')

  if (!token && route.path !== '/admin/login') {
    router.push('/admin/login')
  } else {
    isReady.value = true
  }
})
</script>

<style scoped>
main {
  min-height: calc(100vh - 160px);
}
</style>
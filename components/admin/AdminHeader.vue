<template>
  <header class="admin-header bg-light shadow-sm py-3 mb-4">
    <div class="container d-flex justify-content-between align-items-center">
      <NuxtLink to="/adras" class="fw-bold text-dark text-decoration-none fs-4">
        Admin Panel
      </NuxtLink>

      <div class="d-flex align-items-center gap-4">
        <nav>
          <ul class="list-unstyled d-flex gap-4 mb-0">
            <li><NuxtLink to="/adras/hero-manage" class="text-dark text-decoration-none">Ana Sehife</NuxtLink></li>
            <li><NuxtLink to="/adras/manage" class="text-dark text-decoration-none">Gəlinliklər</NuxtLink></li>
            <li><NuxtLink to="/adras/create" class="text-dark text-decoration-none">Yeni Əlavə Et</NuxtLink></li>
          </ul>
        </nav>
        <button @click="logout" class="btn btn-outline-danger btn-sm">Çıxış</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import {useRouter} from 'vue-router'
import Swal from 'sweetalert2'
const router = useRouter()
const logout = () => {
  Swal.fire({
    title: 'Çıxmaq istəyirsiniz?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Bəli, çıx!',
    cancelButtonText: 'İmtina'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('admin_token')
      Swal.fire({
        icon: 'success',
        title: 'Çıxış edildi!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        router.push('/admin/login')
      })
    }
  })
}
</script>

<style scoped>
.admin-header {
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
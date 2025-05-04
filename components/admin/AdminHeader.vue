<template>
  <header class="admin-header bg-light shadow-sm py-3 mb-4">
    <div class="container d-flex justify-content-between align-items-center flex-wrap">
      <NuxtLink to="/admin" class="fw-bold text-dark text-decoration-none fs-4">
        Admin Panel
      </NuxtLink>

      <!-- Mobile toggle button -->
      <button class="d-md-none btn btn-outline-secondary" @click="toggleMenu">
        ☰
      </button>

      <div class="d-flex d-md-column align-items-center gap-4 flex-wrap justify-content-between w-100 mt-3 d-md-flex" :class="{'d-none': !menuOpen && isMobile}">
        <nav class=" w-md-auto">
          <ul class="list-unstyled d-flex justify-content-center flex-column flex-md-row gap-3 mb-0">
            <li><NuxtLink to="/admin/hero-manage" class="text-dark text-decoration-none">Ana Səhifə</NuxtLink></li>
            <li><NuxtLink to="/admin/manage" class="text-dark text-decoration-none">Gəlinliklər</NuxtLink></li>
            <li><NuxtLink to="/admin/create" class="text-dark text-decoration-none">Yeni Əlavə Et</NuxtLink></li>
          </ul>
        </nav>
        <button @click="logout" class="btn btn-outline-danger btn-sm">Çıxış</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue'

const router = useRouter()
const menuOpen = ref(false)
const isMobile = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

onMounted(() => {
  isMobile.value = window.innerWidth < 768
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
    if (!isMobile.value) menuOpen.value = true
  })
})

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
  .btn-outline-secondary {
    font-size: 1.5rem;
    padding: 0.25rem 0.75rem;
  }

  ul {
    padding-left: 0;
  }
  @media (max-width: 600px) {
    .d-md-column{
      flex-direction: column!important;
    }
    nav{
      width: 100%;
    }

  }

  @media (min-width: 768px) {

    .d-md-flex {
      display: flex !important;
    }

    .d-none {
      display: none !important;
    }
  }
}
</style>
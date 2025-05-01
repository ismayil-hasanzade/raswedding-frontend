<template>
  <header class="header border-bottom shadow-sm position-fixed w-100 bg-white z-3 top-0">
    <div class="container d-flex justify-content-between align-items-center py-2">
      <NuxtLink to="/" class="d-flex align-items-center">
        <img class="logo" src="/images/PDF.svg" alt="Logo"/>
      </NuxtLink>
      <button
          class="d-md-none border-0 bg-transparent fs-3"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <i class="bi" :class="isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'"></i>
      </button>
      <nav class="d-none d-md-block">
        <ul class="list-unstyled d-flex gap-4 mb-0">
          <li>
            <NuxtLink to="/" class="text-dark text-decoration-none">Ana səhifə</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/catalog" class="text-dark text-decoration-none">Gəlinliklər</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" class="text-dark text-decoration-none">Əlaqə</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Mobil menyu -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu bg-white d-md-none p-4 border-top">
        <ul class="list-unstyled d-flex flex-column gap-3 mb-0">
          <li>
            <NuxtLink to="/" @click="closeMenu" class="text-dark text-decoration-none">Ana səhifə</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/catalog" @click="closeMenu" class="text-dark text-decoration-none">Gəlinliklər</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" @click="closeMenu" class="text-dark text-decoration-none">Əlaqə</NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup>
import {ref} from 'vue'

const isMobileMenuOpen = ref(false)

const closeMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
<style scoped lang="scss">
.header {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    height: auto;
    width: 190px;
    object-fit: contain;
  }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 2;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
}
</style>
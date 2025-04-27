<template>
  <div class="page-wrapper d-flex flex-column min-vh-100">
    <HeaderComponent />
    <main class="flex-grow-1">
      <NuxtPage />
    </main>
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>
<style lang="scss">
.first_section{
  margin-top: 80px;
}
.detail-btn {
  background-color: #d4a373;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c28859;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex-grow: 1;
  }
}
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  // Global body font
  body {
    font-family: 'Poppins', sans-serif;
  }

  // Hero başlıq
  .hero-title, h1 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    font-size: 3rem;
  }

  // Alt başlıqlar
  h2, h3 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 500;
  }

  // Menyu
  nav a, .btn {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    letter-spacing: 0.5px;
  }


</style>
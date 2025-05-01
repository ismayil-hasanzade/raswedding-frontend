<template>
  <section class="py-5 first_section">
    <div class="container">
      <h1 class="text-center mb-4">Admin Panel</h1>
      <div class="row g-4">
        <div class="col-md-6">
          <NuxtLink to="/adras/create" class="btn btn-primary w-100 py-3">
            ➕ Gəlinlik Əlavə Et
          </NuxtLink>
        </div>
        <div class="col-md-6">
          <NuxtLink to="/pages/adras/manage" class="btn btn-secondary w-100 py-3">
            📋 Gəlinlikləri İdarə Et
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
definePageMeta({
  layout: 'adras',
  middleware: 'auth'
})
</script>
<style>
.first_section {
  margin-top: 80px;
}
</style>

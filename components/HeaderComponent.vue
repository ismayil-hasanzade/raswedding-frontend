<template>
  <header class=" header border-bottom shadow-sm position-fixed w-100 bg-white z-3 top-0">
    <div class="container d-flex justify-content-between align-items-center py-3">
      <NuxtLink to="/" class="text-decoration-none fw-bold fs-4 text-dark">
        <img class="float-start w-25" src="~/public/images/PDF.svg" alt="">
      </NuxtLink>
      <nav>
        <ul class="list-unstyled d-flex gap-4 mb-0">
          <li><NuxtLink to="/" class="text-dark text-decoration-none">Ana səhifə</NuxtLink></li>
          <li><NuxtLink to="/catalog" class="text-dark text-decoration-none">Gəlinliklər</NuxtLink></li>
          <li><NuxtLink to="/contact" class="text-dark text-decoration-none">Əlaqə</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<style scoped lang="scss">
.header{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

</style>
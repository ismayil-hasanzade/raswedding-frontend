<template>
  <footer class="bg-dark text-white py-4 ">
    <div class="container">
      <div class="row">
        <!-- Sol: logo və qısa məlumat -->
        <div class="col-md-4 mb-3">
          <h5 class="fw-bold">Ras Wedding</h5>
          <p class="small">Ən gözəl gününüz üçün xəyalınızdakı gəlinliyi bizdən kiralayın.</p>
        </div>

        <!-- Orta: Naviqasiya -->
        <div class="col-md-4 mb-3">
          <h6>Keçidlər</h6>
          <ul class="list-unstyled">
            <li><NuxtLink to="/" class="text-white text-decoration-none">Ana səhifə</NuxtLink></li>
            <li><NuxtLink to="/catalog" class="text-white text-decoration-none">Gəlinliklər</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-white text-decoration-none">Əlaqə</NuxtLink></li>
          </ul>
        </div>

        <!-- Sağ: Əlaqə -->
        <div class="col-md-4 mb-3">
          <h6>Əlaqə</h6>
          <p class="mb-1">📍 Bakı, Azərbaycan</p>
          <p class="mb-1">📞 +994 50 123 45 67</p>
          <p class="mb-0">📧 info@gelinlik.az</p>
        </div>
      </div>

      <div class="text-center mt-4 small">
        © {{ new Date().getFullYear() }} raswedding.az – Bütün hüquqlar qorunur.
      </div>
    </div>
  </footer>
</template>
<style scoped lang="scss">
footer {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  background: #f8f4f0;
  padding: 30px 0;
  color: #333;
}

</style>
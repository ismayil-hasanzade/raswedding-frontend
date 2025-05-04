<template>
  <footer class="bg-dark text-white py-4">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-3">
          <img src="/public/images/logo.png" alt="footer-logo" class="mb-3 footer-logo"/>
<!--          <p class="small">Ən gözəl gününüz üçün xəyalınızdakı gəlinliyi bizdən kiralayın.</p>-->
        </div>
        <div class="col-md-4 mb-3">
          <h6>Keçidlər</h6>
          <ul class="list-unstyled">
            <li><NuxtLink to="/" class="text-white text-decoration-none">Ana səhifə</NuxtLink></li>
            <li><NuxtLink to="/catalog" class="text-white text-decoration-none">Gəlinliklər</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-white text-decoration-none">Əlaqə</NuxtLink></li>
          </ul>
        </div>
        <div class="col-md-4 mb-3">
          <h6>Əlaqə</h6>
          <p class="mb-1">📍 Bakı, Mikayıl Rəfili küç.</p>
          <p class="mb-1">📞 +994 51 487 68 68</p>
<!--          <p class="mb-3">📧 info@gelinlik.az</p>-->
          <div class="d-flex gap-3 social-icons">
            <a href="https://www.instagram.com/raswedding_" target="_blank" class="text-white fs-4">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="https://wa.me/+994514876868" target="_blank" class="text-white fs-4">
              <i class="bi bi-whatsapp"></i>
            </a>
            <a href="https://www.tiktok.com/@raswedding_" target="_blank" class="text-white fs-4">
              <i class="bi bi-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="text-center mt-4 small">
        © {{ new Date().getFullYear() }} raswedding.az – Created By Ismayil Hasanzade
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
.footer-logo {
    width: 200px;
    height: auto;
  }
  .social-icons {
    margin-top: 20px;
    a {
      transition: all 0.3s ease;
      &:hover {
        color: #d4a373;
        transform: translateY(-2px);
      }
    }
  }
}
@media (max-width: 768px) {
  footer {
    //display: flex;
    .footer-logo {
      width: 150px;
    }
  }
}
</style>
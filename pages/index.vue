<template>
  <section class="hero-section text-white d-flex align-items-center justify-content-center">
    <div class="container text-center d-flex align-items-center justify-content-center">
      <video class="" autoplay muted loop id="myVideo">
        <source src="../public/videos/new.mp4" type="video/mp4">
      </video>
      <div class="content">
        <h1 class="text-center">Sizin Xəyallarınız Bizim Tasarımlarımızda</h1>
        <p class="lead mb-4">Ən gözəl gününüz üçün ən gözəl seçimlər.</p>
        <NuxtLink to="/catalog" class="btn btn-light btn-lg px-4">Gəlinliklərə Bax</NuxtLink>
      </div>
    </div>
  </section>
  <section id="PopularProducts" class="py-5 bg-light">
    <div class="container">
      <h2 class="text-center mb-4">Populyar Gəlinliklər</h2>
      <Swiper
          :space-between="20"
          :breakpoints="{
          320: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 2 },
          1200: { slidesPerView: 3 }
        }"
          :loop="false"
          :modules="modules"
          :navigation="true"
          :slides-per-view="2"
          :autoplay="false"
          :draggable="true"
          class="pb-4"
      >
        <SwiperSlide v-for="(dress, index) in popularDresses" :key="index">
          <div class="card h-100 shadow-sm">
            <div
                class="image_container"
                :style="{ backgroundImage: `url(${dress.image})` }"
                @mousemove="handleZoom"
                @mouseleave="resetZoom"
            />

            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ dress.title }}</h5>
              <p class="card-text">{{ dress.description }}</p>
              <NuxtLink :to="`/catalogs/${dress.slug}`" class="btn detail-btn mt-auto">
                Detallara Bax
              </NuxtLink>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

    </div>
  </section>
  <section id="how-it-works" class="py-5">
    <div class="container">
      <h2 class="text-center mb-5">İcarə Necə İşləyir?</h2>
      <div class="row text-center g-4">
        <!-- Addım 1 -->
        <div class="col-md-4">
          <div class="icon-step mb-3">
            <i class="bi bi-search-heart-fill"></i>
          </div>
          <h5 class="fw-bold">1. Gəlinliyi Seç</h5>
          <p>Seçimlərini kataloqdan incələ və ürəyincə olan modeli tap.</p>
        </div>

        <!-- Addım 2 -->
        <div class="col-md-4">
          <div class="icon-step mb-3">
            <i class="bi bi-whatsapp"></i>
          </div>
          <h5 class="fw-bold">2. Əlaqə Saxla</h5>
          <p>WhatsApp və ya əlaqə forması ilə bizə müraciət et.</p>
        </div>

        <!-- Addım 3 -->
        <div class="col-md-4">
          <div class="icon-step mb-3">
            <i class="bi bi-gift-fill"></i>
          </div>
          <h5 class="fw-bold">3. Gəlinliyi Təslim Al</h5>
          <p>Razılaşdırılmış tarixdə gəlinliyini qəbul et və möhtəşəm görün.</p>
        </div>
      </div>
    </div>
  </section>


</template>
<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {Autoplay, Navigation, Pagination, Scrollbar} from "swiper/modules";
const modules = [Navigation, Scrollbar, Pagination, Autoplay];

const handleZoom = (e) => {
  const target = e.target
  const rect = target.getBoundingClientRect()

  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100

  target.style.backgroundPosition = `${x}% ${y}%`
}

const resetZoom = e => {
  const target = e.target
  target.style.backgroundPosition = 'center'
}
const popularDresses = [
  {
    title: 'Zərif Dantel Gəlinlik',
    description: 'Romantik və klassik dantel detallı model.',
    image: '/images/481075489_122145455762455318_200917837088695722_n.jpeg',
    slug: 'zerif-dantel'
  },
  {
    title: 'Minimal İpək Gəlinlik',
    description: 'Sadəliyin və zərifliyin təcəssümü.',
     image: '/images/481075489_122145455762455318_200917837088695722_n.jpeg',
    slug: 'minimal-ipek'
  },
  {
    title: 'Qollu A-Kəsim Model',
    description: 'Daha formal və möhtəşəm görüntü üçün.',
     image: '/images/481075489_122145455762455318_200917837088695722_n.jpeg',
    slug: 'a-kesim'
  },
  {
    title: 'Tül və İşıltılı Detallar',
    description: 'Yumşaq tül və parlaq naxışlarla dizayn.',
     image: '/images/481075489_122145455762455318_200917837088695722_n.jpeg',
    slug: 'tul-parlaq'
  },
  {
    title: 'Tül və İşıltılı Detallar',
    description: 'Yumşaq tül və parlaq naxışlarla dizayn.',
    image: '/images/481075489_122145455762455318_200917837088695722_n.jpeg',
    slug: 'tul-parlaq'
  }

]
</script>

<style scoped lang="scss">
#PopularProducts{
  @media (max-width: 768px) {
    .image_container {
      background-size: cover !important;
      background-position: center !important;
      pointer-events: none;
    }
  }
  .image_container {
    height: 500px;
    background-size: 120%;
    background-position: center;
    transition: background-position 0.5s ease;
    //border-radius: 10px;
    cursor: zoom-in;
    overflow: hidden;
    &:hover {
      background-size: 160%;
    }
  }
  .card{
    overflow: hidden;
    border-radius:20px;
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

  }
  ::v-deep(.swiper-button-prev),
  ::v-deep(.swiper-button-next) {
    top: 45%;
    bottom: 45%;
    display: block;
    //color: #d4a373;
    color: white;
    z-index: 10;
  }

}
.hero-section {
  margin-top: 80px;
  height: 80vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 900;

  .container {
    #myVideo {
      object-fit: cover;
      //border: 1px solid red;
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;
      min-width: 100%;
      min-height: 100%;
      width: 100%;
    }

    .content {
      position: absolute;
      height: max-content;
      padding: 20px 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      color: #f1f1f1;
      width: 100%;
    }
  }

}
#how-it-works {
  background-color: #fff;


  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
  }

  .icon-step {
    font-size: 3rem;
    color: #d4a373; // Qızılı ton
  }

  p {
    font-family: 'Poppins', sans-serif;
    color: #555;
  }
}

</style>

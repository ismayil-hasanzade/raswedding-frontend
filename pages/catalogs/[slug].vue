<template>
  <section class="product-detail py-5">
    <div class="container">
      <div v-if="dress" class="row align-items-center g-5">
        <!-- Şəkil -->
        <div class="col-md-6">
          <div class="image-wrapper shadow rounded overflow-hidden">
            <img :src="dress.image" :alt="dress.title" class="img-fluid w-100" />
          </div>
        </div>

        <!-- Məlumat -->
        <div class="col-md-6">
          <h1 class="product-title mb-3">{{ dress.title }}</h1>
          <p class="product-desc mb-3">{{ dress.description }}</p>
          <p><strong>Material:</strong> {{ dress.material }}</p>
          <p><strong>Ölçülər:</strong> {{ dress.size }}</p>

          <NuxtLink to="/contact" class="btn contact-btn mt-4">İcarə üçün Əlaqə Saxla</NuxtLink>
        </div>
      </div>

      <div v-else>
        <p class="text-center">Gəlinlik tapılmadı.</p>
      </div>
    </div>
  </section>
</template>


<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug

const allDresses = [
  {
    title: 'Zərif Dantel Gəlinlik',
    description: 'Romantik və klassik dantel detallı model.',
    image: '/images/481075489_122145455762455318_200917837088695722_n.jpeg',
    slug: 'zerif-dantel',
    size: 'S, M, L',
    material: 'Dantel və Tül'
  },
  {
    title: 'Minimal İpək Gəlinlik',
    description: 'Sadəliyin və zərifliyin təcəssümü.',
    image: '/images/dress2.jpg',
    slug: 'minimal-ipek',
    size: 'M, L',
    material: 'İpək'
  },
  {
    title: 'Qollu A-Kəsim Model',
    description: 'Daha formal və möhtəşəm görüntü üçün.',
    image: '/images/dress3.jpg',
    slug: 'a-kesim',
    size: 'XS, S, M',
    material: 'Saten'
  },
  {
    title: 'Tül və İşıltılı Detallar',
    description: 'Yumşaq tül və parlaq naxışlarla dizayn.',
    image: '/images/dress4.jpg',
    slug: 'tul-parlaq',
    size: 'S, M, L',
    material: 'Tül və Payet'
  }
]
const dress = allDresses.find((item) => item.slug === slug)
</script>
<style scoped>
  section{
    margin-top: 80px;
  }
  .product-detail {
    font-family: 'Poppins', sans-serif;

    .product-title {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 700;
      font-size: 2.5rem;
      color: #222;
    }

    .product-desc {
      font-size: 1.1rem;
      color: #555;
    }

    .image-wrapper {
      max-height: 600px;
    }

    .contact-btn {
      background-color: #d4a373;
      color: white;
      border: none;
      padding: 0.6rem 1.4rem;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        background-color: #c28859;
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      }
    }
  }

</style>

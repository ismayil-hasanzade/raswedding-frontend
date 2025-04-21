<template>
  <section class="py-5">
    <div class="container">
      <h1 class="text-center mb-5">Bütün Gəlinliklər</h1>
      <div class="row g-4">
        <div
            v-for="(dress, index) in allDresses"
            :key="index"
            class="col-sm-6 col-md-4 col-lg-3"
        >
          <div class="card h-100 shadow-sm">
            <img :src="dress.image" class="card-img-top" alt="Gəlinlik" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ dress.title }}</h5>
              <p class="card-text">{{ dress.description }}</p>
              <NuxtLink
                  :to="`catalogs/${dress.slug}`"
                  class="btn btn-outline-primary mt-auto"
              >
                Detallara Bax
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
onMounted(()=>{
  console.log('sdd')
})
const allDresses = [
  {
    title: 'Zərif Dantel Gəlinlik',
    description: 'Romantik və klassik dantel detallı model.',
    image: '/images/dress1.jpg',
    slug: 'zerif-dantel'
  },
  {
    title: 'Minimal İpək Gəlinlik',
    description: 'Sadəliyin və zərifliyin təcəssümü.',
    image: '/images/dress2.jpg',
    slug: 'minimal-ipek'
  },
  {
    title: 'Qollu A-Kəsim Model',
    description: 'Daha formal və möhtəşəm görüntü üçün.',
    image: '/images/dress3.jpg',
    slug: 'a-kesim'
  },
  {
    title: 'Tül və İşıltılı Detallar',
    description: 'Yumşaq tül və parlaq naxışlarla dizayn.',
    image: '/images/dress4.jpg',
    slug: 'tul-parlaq'
  },
  // İstəsən daha çox dress əlavə edə bilərsən

]
</script>
<style scoped>
section{
  margin-top: 80px;
}
</style>
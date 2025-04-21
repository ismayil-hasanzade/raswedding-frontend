<template>
  <section class="py-5">
    <div class="container">
      <h1 class="text-center mb-4">Bütün Gəlinliklər</h1>

      <!-- Mobil Filter Button -->
      <div class="d-md-none text-end mb-3">
        <button class="btn btn-outline-primary" @click="isFilterOpen = true">
          <i class="bi bi-funnel-fill"></i> Filter
        </button>
      </div>

      <!-- Axtarış -->
      <div class="row mb-4">
        <div class="col-md-6 mx-auto">
          <input
              type="text"
              class="form-control"
              v-model="searchText"
              placeholder="Axtarış..."
          />
        </div>
      </div>

      <!-- Layout: Sol Filter + Sağ Kartlar -->
      <div class="row">
        <!-- Sol Sidebar (sticky) -->
        <div class="col-md-2 d-none d-md-block">
          <div class="position-sticky top-0 filter-sidebar">
            <h6 class="fw-bold mb-3">Material</h6>
            <div v-for="mat in materials" :key="mat" class="form-check mb-2">
              <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`material-${mat}`"
                  :value="mat"
                  v-model="selectedMaterials"
              />
              <label class="form-check-label" :for="`material-${mat}`">{{ mat }}</label>
            </div>

            <h6 class="fw-bold mt-4 mb-3">Ölçü</h6>
            <div v-for="sz in sizes" :key="sz" class="form-check mb-2">
              <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`size-${sz}`"
                  :value="sz"
                  v-model="selectedSizes"
              />
              <label class="form-check-label" :for="`size-${sz}`">{{ sz }}</label>
            </div>

            <button class="btn btn-outline-danger mt-3" @click="resetFilters">
              Filterləri Təmizlə
            </button>
          </div>
        </div>

        <!-- Gəlinlik Kartları -->
        <div class="col-md-10">
          <div class="row g-4">
            <div
                v-for="(dress, index) in visibleDresses"
                :key="index"
                class="col-sm-6 col-lg-4"
            >
              <div class="card h-100 shadow-sm">
                <img :src="dress.image" class="card-img-top" alt="Gəlinlik" />
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">{{ dress.title }}</h5>
                  <p class="card-text">{{ dress.description }}</p>
                  <NuxtLink
                      :to="`/kataloq/${dress.slug}`"
                      class="btn btn-outline-primary mt-auto"
                  >
                    Detallara Bax
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Load More -->
          <div class="text-center mt-4" v-if="visibleCount < filteredDresses.length">
            <button class="btn btn-outline-secondary px-4" @click="loadMore">
              Daha Çox Göstər
            </button>
          </div>
        </div>
      </div>

      <!-- Offcanvas (Mobil) -->
      <transition name="slide">
        <div v-if="isFilterOpen" class="offcanvas-filter">
          <div class="offcanvas-content bg-white p-4 shadow">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0">Filterlər</h5>
              <button class="btn-close" @click="isFilterOpen = false"></button>
            </div>

            <div class="mb-3">
              <h6 class="fw-bold">Material</h6>
              <div v-for="mat in materials" :key="mat" class="form-check">
                <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`m-${mat}`"
                    :value="mat"
                    v-model="selectedMaterials"
                />
                <label class="form-check-label" :for="`m-${mat}`">{{ mat }}</label>
              </div>
            </div>

            <div class="mb-3">
              <h6 class="fw-bold">Ölçü</h6>
              <div v-for="sz in sizes" :key="sz" class="form-check">
                <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`s-${sz}`"
                    :value="sz"
                    v-model="selectedSizes"
                />
                <label class="form-check-label" :for="`s-${sz}`">{{ sz }}</label>
              </div>
            </div>

            <button class="btn btn-outline-danger w-100" @click="resetFilters">
              Filterləri Təmizlə
            </button>
          </div>
          <div class="offcanvas-backdrop" @click="isFilterOpen = false"></div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const isFilterOpen = ref(false)
const visibleCount = ref(8)
const selectedMaterials = ref([])
const selectedSizes = ref([])
const searchText = ref('')

const allDresses = [
  {
    title: 'Zərif Dantel Gəlinlik',
    description: 'Romantik və klassik dantel detallı model.',
    image: '/images/1.jpeg',
    slug: 'zerif-dantel',
    size: ['S', 'M'],
    material: 'Dantel'
  },
  {
    title: 'Minimal İpək Gəlinlik',
    description: 'Sadəliyin və zərifliyin təcəssümü.',
    image: '/images/2.jpeg',
    slug: 'minimal-ipek',
    size: ['M', 'L'],
    material: 'İpək'
  },
  {
    title: 'Qollu A-Kəsim Model',
    description: 'Daha formal və möhtəşəm görüntü üçün.',
    image: '/images/3.jpeg',
    slug: 'a-kesim',
    size: ['XS', 'S', 'M'],
    material: 'Saten'
  },
  {
    title: 'Boho Tərzi Gəlinlik',
    description: 'Azad və sadə ruhlu gəlinlər üçün.',
    image: '/images/4.jpeg',
    slug: 'boho-terzi',
    size: ['M', 'L'],
    material: 'Tül'
  }
]

const materials = [...new Set(allDresses.map(d => d.material))]
const sizes = [...new Set(allDresses.flatMap(d => d.size))]

const filteredDresses = computed(() =>
    allDresses.filter(d =>
        (!selectedMaterials.value.length || selectedMaterials.value.includes(d.material)) &&
        (!selectedSizes.value.length || d.size.some(size => selectedSizes.value.includes(size))) &&
        (
            d.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
            d.description.toLowerCase().includes(searchText.value.toLowerCase())
        )
    )
)

const visibleDresses = computed(() =>
    filteredDresses.value.slice(0, visibleCount.value)
)

const loadMore = () => {
  visibleCount.value += 4
}

const resetFilters = () => {
  selectedMaterials.value = []
  selectedSizes.value = []
  searchText.value = ''
  visibleCount.value = 8
  isFilterOpen.value = false
}
</script>

<style scoped lang="scss">
section {
  margin-top: 80px;
}
.card-img-top {
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
}
.position-sticky {
  position: sticky;
  top: 100px;
}
.filter-sidebar {
  background: #fff;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 10px;
}

// Offcanvas
.offcanvas-filter {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 1050;
  display: flex;
  justify-content: flex-end;

  .offcanvas-content {
    width: 80%;
    max-width: 300px;
    height: 100%;
    overflow-y: auto;
    position: relative;
    z-index: 1051;
  }

  .offcanvas-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1050;
  }
}

// Animation
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
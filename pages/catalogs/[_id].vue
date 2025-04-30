<template>
  <section class="product-detail py-5">
    <div class="container">
      <div v-if="dress" class="row d-flex align-items-center">
        <div class="col-md-6">
          <div
              class="image-wrapper image_container shadow rounded overflow-hidden"
              :style="{ backgroundImage: `url(${dress.image})` }"
              @mousemove="handleZoom"
              @mouseleave="resetZoom"
          >
          </div>
        </div>
        <div class="col-md-6">
          <h1 class="product-title mb-3">{{ dress.title }}</h1>
          <p class="product-desc mb-3">{{ dress.description }}</p>
          <p><strong>Material:</strong> {{ dress.material }}</p>
          <p><strong>Ölçülər:</strong> {{ sizes }}</p>
          <NuxtLink to="/contact" class="btn contact-btn mt-4">İcarə üçün Əlaqə Saxla</NuxtLink>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Gəlinlik tapılmadı.</p>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'

const config = useRuntimeConfig();
const route = useRoute()
const id = route.params._id as string;
const dress = ref<any>(null)
const handleZoom = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const rect = target.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  target.style.backgroundPosition = `${x}% ${y}%`
}
const resetZoom = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  target.style.backgroundPosition = 'center'
}
const sizes = computed(() => {
  if (dress.value && Array.isArray(dress.value.sizes)) {
    return dress.value.sizes.join(', ')
  }
  return ''
})

const fetchDresses = async () => {
  try {
    const response = await fetch(`${config.public.apiBaseUrl}/dresses/${id}`)
    const data = await response.json()
    console.log(data)
    dress.value = data
  } catch (error) {
    console.error('Gəlinlikləri çəkə bilmədim:', error)
  }
}
onMounted(fetchDresses)
</script>
<style scoped>
section {
  margin-top: 80px;
}

@media (max-width: 768px) {
  .image_container {
    background-size: cover !important;
    background-position: center !important;
    pointer-events: none;
  }
}

.image_container {
  height: 600px;
  background-size: 100%;
  background-position: center;
  transition: background-position 0.5s ease;
  cursor: zoom-in;
  overflow: hidden;
  width: 80%;

  &:hover {
    background-size: 160%;
  }
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

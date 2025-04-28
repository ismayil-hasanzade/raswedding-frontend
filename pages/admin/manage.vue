<template>
  <section class="py-5 first_section">
    <div class="container">
      <h2 class="text-center mb-4">Gəlinlikləri İdarə Et</h2>

      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Yüklənir...</span>
        </div>
      </div>

      <div v-else>
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

        <div v-if="filteredDresses.length > 0" class="row g-4">
          <div v-for="dress in filteredDresses" :key="dress._id" class="col-md-4">
            <div class="card h-100 shadow-sm">
              <img
                  v-if="dress.image"
                  :src="dress.image"
                  class="card-img-top"
                  alt="Gəlinlik şəkli"
                  style="height: 300px; object-fit: cover;"
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ dress.title }}</h5>
                <p class="card-text">{{ dress.material }}</p>

                <div class="mt-auto d-flex justify-content-between gap-2">
                  <NuxtLink
                      :to="`/admin/edit/${dress._id}`"
                      class="btn btn-outline-primary btn-sm w-50"
                  >
                    ✏️ Edit
                  </NuxtLink>
                  <button
                      @click="deleteDress(dress._id)"
                      class="btn btn-outline-danger btn-sm w-50"
                  >
                    🗑️ Sil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center">
          <p>Heç bir gəlinlik tapılmadı.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
import Swal from 'sweetalert2'
import { ref, computed, onMounted } from 'vue'

const dresses = ref([])
const loading = ref(true)
const searchText = ref('')


const deleteDress = async (id) => {
  const result = await Swal.fire({
    title: 'Əminsiniz?',
    text: "Bu gəlinliyi silmək istəyirsiniz?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Bəli, sil!',
    cancelButtonText: 'Xeyr'
  })

  if (result.isConfirmed) {
    try {
      const res = await fetch(`http://localhost:5001/api/dresses/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        dresses.value = dresses.value.filter(dress => dress._id !== id)
        Swal.fire('Silindi!', 'Gəlinlik uğurla silindi ✅', 'success')
      } else {
        Swal.fire('Xəta!', 'Silinərkən xəta baş verdi ❌', 'error')
      }
    } catch (error) {
      console.error('Silinmə zamanı xəta:', error)
      Swal.fire('Xəta!', 'Serverdə problem oldu ❌', 'error')
    }
  }
}
// Axtarış üçün computed
const filteredDresses = computed(() => {
  if (!searchText.value.trim()) {
    return dresses.value
  }
  return dresses.value.filter(dress =>
      dress.title.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

const fetchDresses = async () => {
  loading.value = true
  try {
    const res = await fetch('http://localhost:5001/api/dresses')
    dresses.value = await res.json()
  } catch (error) {
    console.error('Server xətası:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchDresses)
</script>
<template>
  <section class="py-5">
    <div class="container">
      <h2 class="text-center mb-4">Hero Məlumatlarını İdarə Et</h2>
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Yüklənir...</span>
        </div>
      </div>
      <div v-else>
        <form @submit.prevent="submitForm" class="row g-4" enctype="multipart/form-data">
          <div class="col-12">
            <label class="form-label">Video Seç</label>
            <input @change="handleFileChange" ref="fileInput" type="file" accept="video/*" class="form-control" />
          </div>
          <div class="col-12">
            <label class="form-label">Başlıq 1</label>
            <input v-model="form.content1" type="text" class="form-control" />
          </div>
          <div class="col-12">
            <label class="form-label">Başlıq 2</label>
            <input v-model="form.content2" type="text" class="form-control" />
          </div>
          <div v-if="progress > 0" class="col-12">
            <div class="progress" style="height: 20px;">
              <div
                  class="progress-bar"
                  role="progressbar"
                  :style="{ width: progress + '%' }"
                  :aria-valuenow="progress"
                  aria-valuemin="0"
                  aria-valuemax="100"
              >
                {{ progress }}%
              </div>
            </div>
          </div>
          <div class="col-12 text-center mt-3">
            <button type="submit" class="btn btn-success px-5 py-2">
              {{ formHasData ? 'Yadda saxla (Yenilə)' : 'Yadda saxla (Əlavə et)' }}
            </button>
          </div>
        </form>
        <div v-if="form.video && typeof form.video === 'string'" class="mt-4 text-center">
          <video controls width="400" :src="form.video"></video>
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const form = ref({
  video: '',
  content1: '',
  content2: ''
})
const config = useRuntimeConfig();
const loading = ref(true)
const fileInput = ref(null)
const progress = ref(0)
const formHasData = ref(false)  // 🔥 Yoxlayacağıq Hero mövcuddurmu

const fetchHero = async () => {
  loading.value = true
  try {
    const res = await fetch(`${config.public.apiBaseUrl}/hero`)
    const data = await res.json()
    if (data && (data.content1 || data.content2 || data.video)) {
      form.value.video = data.video
      form.value.content1 = data.content1
      form.value.content2 = data.content2
      formHasData.value = true  // 🔥 Hero məlumatı tapıldı
    }
  } catch (error) {
    console.error('Hero məlumatı tapılmadı', error)
  } finally {
    loading.value = false
  }
}

const handleFileChange = (e) => {
  form.value.video = e.target.files[0]
}

const submitForm = async () => {
  const formData = new FormData()

  if (form.value.video instanceof File) {
    formData.append('video', form.value.video)
  }

  formData.append('content1', form.value.content1)
  formData.append('content2', form.value.content2)

  try {
    const res = await axios({
      method: formHasData.value ? 'put' : 'post',   // 🔥 PUT və ya POST seçirik
      url: `${config.public.apiBaseUrl}/hero`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        progress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      }
    })

    if (res.status === 200 || res.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Uğurlu!',
        text: formHasData.value ? 'Hero məlumatı uğurla yeniləndi ✅' : 'Hero məlumatı uğurla əlavə edildi ✅',
        showConfirmButton: false,
        timer: 2000
      })
      await fetchHero()
      fileInput.value.value = null
      progress.value = 0
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Xəta!',
        text: 'Əməliyyat zamanı xəta baş verdi ❌',
        timer: 2000
      })
    }
  } catch (error) {
    console.error('Server xəta', error)
    Swal.fire({
      icon: 'error',
      title: 'Xəta!',
      text: 'Serverlə əlaqə problemi! ❌',
      timer: 2000
    })
    progress.value = 0
  }
}
onMounted(fetchHero)
</script>
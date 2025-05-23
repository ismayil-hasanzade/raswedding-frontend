<template>
  <section class="py-5 first_section">
    <div class="container">
      <h2 class="text-center mb-4">Gəlinlik Redaktəsi</h2>
      <form class="row g-4" enctype="multipart/form-data">
        <div class="col-md-6">
          <label for="title" class="form-label">Başlıq</label>
          <input v-model="form.title" type="text" :class="{'is-invalid':!isValid.title}" class="form-control"
                 placeholder="Minimal İpək Gəlinlik"/>
        </div>
        <div class="col-md-6">
          <label for="material" class="form-label">Material</label>
          <input v-model="form.material" type="text" class="form-control" :class="{'is-invalid':!isValid.material}"
                 placeholder="İpək"/>
        </div>
        <div class="col-12">
          <label for="description" class="form-label">Təsvir</label>
          <textarea v-model="form.description" class="form-control" :class="{'is-invalid':!isValid.description}"
                    rows="4" placeholder="Sadəliyin və zərifliyin təcəssümü"></textarea>
        </div>
        <!-- Cari şəkil göstər -->
        <div class="col-md-6">
          <label for="image" class="form-label">Şəkil</label>
          <div v-if="form.image" class="mb-2">
            <img :src="form.image" class="img-fluid rounded" alt="Cari şəkil"
                 style="height:200px; object-fit:cover;"/>
          </div>
          <input @change="handleFileChange" ref="fileInputRef" type="file" accept="image/*" class="form-control"
                 :class="{'is-invalid': !isValid.image}" placeholder="File"/>
        </div>
        <!-- Ölçülər seçimi -->
        <div class="col-md-6">
          <label class="mb-2">Ölçülər</label>
          <div class="d-flex flex-wrap gap-3">
            <div v-for="size in availableSizes" :key="size" class="form-check">
              <input
                  type="checkbox"
                  class="form-check-input"
                  :id="size"
                  :value="size"
                  v-model="form.sizes"
              />
              <label class="form-check-label" :for="size">{{ size }}</label>
            </div>
          </div>
          <p v-if="!isValid.sizes" class="text-danger">Ölçü Əlavə edin</p>
        </div>

        <div class="col-12 d-flex align-items-center gap-2">
          <input v-model="form.popularity" type="checkbox" id="popularity"/>
          <label for="popularity">Populyar gəlinlik</label>
        </div>

        <div class="col-12 text-center">
          <button @click.prevent="submitForm" type="submit" class="btn btn-success px-5 py-2">Yadda saxla</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
import Swal from 'sweetalert2'
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()
const id = route.params.id
const loading = ref(true)
const fileInputRef = ref(null)
const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const config = useRuntimeConfig()

const form = ref({
  title: '',
  description: '',
  material: '',
  image: '',
  sizes: [],
  popularity: false
})
const isValid = ref({
  title: true,
  description: true,
  material: true,
  image: true,
  sizes: true
})

const handleFileChange = (e) => {
  form.value.newImage = e.target.files[0]
}

const fetchDress = async () => {
  loading.value = true
  try {
    const res = await fetch(`${config.public.apiBaseUrl}/dresses/${id}`)
    const data = await res.json()
    form.value = {
      title: data.title,
      description: data.description,
      material: data.material,
      image: data.image,
      sizes: data.sizes || [],
      popularity: data.popularity
    }
  } catch (error) {
    console.error('Server xətası:', error)
  } finally {
    loading.value = false
  }
}


const submitForm = async () => {
  const keys = Object.keys(isValid.value)
  let valid = true
  keys.forEach(key => {
    if (key !== 'image') {
      isValid.value[key] = form.value[key] !== '' && form.value[key] !== null
    }
    if (key === 'sizes' && (!form.value.sizes || !form.value.sizes.length)) {
      isValid.value[key] = false
    }
    valid = valid && isValid.value[key]
  })
  if (!valid) return;

  const formData = new FormData()
  formData.append('title', form.value.title)
  formData.append('description', form.value.description)
  formData.append('material', form.value.material)
  formData.append('popularity', form.value.popularity ? 'true' : 'false')
  form.value.sizes.forEach(size => formData.append('sizes', size))
  if (form.value.newImage) {
    formData.append('image', form.value.newImage)
  }

  try {
    const res = await fetch(`${config.public.apiBaseUrl}/dresses/${id}`, {
      method: 'PUT',
      body: formData
    })
    if (res.ok) {
      const data = await res.json()

      // Əvəzedici alert deyil, modern SweetAlert2 göstər
      await Swal.fire({
        icon: 'success',
        title: 'Uğurlu!',
        text: data.message || 'Gəlinlik uğurla yeniləndi ✅',
        timer: 2000,
        showConfirmButton: false
      })

      await router.push('/admin/manage')
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Xəta!',
        text: 'Yeniləmə zamanı xəta baş verdi ❌',
      })
    }
  } catch (error) {
    console.error('Server xətası:', error)
    await Swal.fire({
      icon: 'error',
      title: 'Xəta!',
      text: 'Server xətası baş verdi ❌',
    })
  }
}

onMounted(fetchDress)
</script>
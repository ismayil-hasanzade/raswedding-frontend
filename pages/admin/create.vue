<template>
  <section class="py-5 first_section">
    <div class="container">
      <h2 class="text-center mb-4">Yeni Gəlinlik Əlavə Et</h2>
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
        <div class="col-md-6">
          <label for="image" class="form-label">Şəkil</label>
          <input @change="handleFileChange" ref="fileInputRef" type="file" accept="image/*" class="form-control"
                 :class="{'is-invalid': !isValid.image}" placeholder="File"/>
        </div>
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
          <button @click.prevent="submitForm" type="submit" class="btn btn-success px-5 py-2">Əlavə et</button>
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
import {ref} from 'vue'
import Swal from 'sweetalert2'
const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const fileInputRef = ref(null)

const form = ref({
  title: '',
  description: '',
  material: '',
  image: null,
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
  form.value.image = e.target.files[0]
}


const submitForm = async () => {
  const keys = Object.keys(isValid.value)
  let valid = true
  keys.forEach(key => {
    isValid.value[key] = form.value[key] !== '' && form.value[key] !== null;
    if (key === 'image' && !form.value.image) {
      isValid.value[key] = false;
    }
    if (key === 'sizes' && !form.value.sizes.length) {
      isValid.value[key] = false;
    }
    valid = valid && isValid.value[key];
  })
  if (!valid) return;

  const formData = new FormData()
  formData.append('title', form.value.title)
  formData.append('description', form.value.description)
  formData.append('material', form.value.material)
  formData.append('popularity', form.value.popularity ? 'true' : 'false')
  form.value.sizes.forEach(size => formData.append('sizes', size))
  formData.append('image', form.value.image)

  try {
    const res = await fetch('http://localhost:5001/api/dresses', {
      method: 'POST',
      body: formData
    })
    if (res.ok) {
      const data = await res.json()

      await Swal.fire({
        icon: 'success',
        title: 'Uğurlu!',
        text: data.message || 'Gəlinlik uğurla əlavə edildi ✅',
        timer: 2000,
        showConfirmButton: false
      })

      // Formu sıfırla
      fileInputRef.value.value = null
      form.value = {title: '', description: '', material: '', image: null, sizes: [], popularity: false}
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Xəta!',
        text: 'Əlavə olunmadı ❌'
      })
    }
  } catch (error) {
    console.error('Server xətası', error)
    await Swal.fire({
      icon: 'error',
      title: 'Xəta!',
      text: 'Server xətası baş verdi ❌'
    })
  }
}
</script>
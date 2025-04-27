<template>
  <section class="py-5 first_section">
    <div class="container">
      <h2 class="text-center mb-4">Admin Giriş</h2>

      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="login" class="p-4 shadow rounded bg-light">
            <div class="mb-3">
              <label class="form-label">İstifadəçi Adı</label>
              <input v-model="username" type="text" class="form-control" placeholder="admin"/>
            </div>
            <div class="mb-3">
              <label class="form-label">Şifrə</label>
              <input v-model="password" type="password" class="form-control" placeholder="••••••"/>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary px-4">Giriş</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import Swal from 'sweetalert2'

const username = ref('')
const password = ref('')
const router = useRouter()
definePageMeta({
  layout: 'login'
})
const login = () => {
  if (username.value === 'admin' && password.value === '123456') {
    localStorage.setItem('admin_token', 'raswedding_admin')

    Swal.fire({
      icon: 'success',
      title: 'Uğurlu giriş!',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      router.push('/admin')
    })

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Xəta!',
      text: 'İstifadəçi adı və ya şifrə səhvdir!'
    })
  }
}
</script>
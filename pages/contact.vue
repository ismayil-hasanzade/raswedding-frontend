<template>
  <section class="py-5">
    <div class="container">
      <h1 class="text-center mb-4">Bizimlə Əlaqə</h1>
      <div class="row g-4">
        <!-- Əlaqə məlumatları -->
        <div class="col-md-6">
          <h5>Əlaqə Məlumatları</h5>
          <p><strong>Ünvan:</strong> Bakı, Nərimanov r., Fətəli Xan Xoyski küç.</p>
          <p><strong>Telefon:</strong> <a href="tel:+99451487668">📞 +994 51 487 68 68</a></p>
          <p><strong>Email:</strong> <a href="mailto:info@gelinlik.az">info@gelinlik.az</a></p>
          <p><strong>Instagram:</strong> <a href="https://www.instagram.com/raswedding_/" target="_blank">@raswedding_</a></p>
          <div class="ratio ratio-4x3 mt-3">
            <iframe
                src="https://maps.google.com/maps?q=baku%20azerbaijan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <!-- Əlaqə forması -->
        <div class="col-md-6">
          <h5>Form vasitəsilə müraciət edin</h5>
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label class="form-label">Ad və Soyad</label>
              <input v-model="form.name" :class="{'is-invalid' : !isValid.name}" type="text" class="form-control"/>
            </div>
            <div class="mb-3">
              <label class="form-label">Telefon</label>
              <input v-model="form.phone" v-mask="'+994 ## ### ## ##'" :class="{'is-invalid' : !isValid.phone}" class="form-control"/>
            </div>
            <div class="mb-3">
              <label class="form-label">Mesaj</label>
              <textarea v-model="form.message" rows="4" :class="{'is-invalid':!isValid.message}"
                        class="form-control"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Göndər</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref} from 'vue'
import {TheMask} from "vue-the-mask";

const form = ref({
  name: '',
  phone: '',
  message: ''
})
const isValid = ref({
  name: true,
  phone: true,
  message: true
})

const submitForm = async () => {
  const keys = Object.keys(isValid.value)
  let valid = true
  keys.forEach(key => {
    isValid.value[key] = form.value[key].trim() !== '' && form.value[key] !== null;
    if (key==='phone') {
      isValid.value[key] = form.value[key].length === 17;
    }
    valid = valid && isValid.value[key];
  })

  if (!valid) return;

  // API çağırışı üçün hazır
  // await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(form.value)
  // })

  alert(`Təşəkkür edirik, ${form.value.name}! Müraciətiniz göndərildi.`)

  form.value = {
    name: '',
    phone: '',
    message: ''
  }
}

</script>
<style scoped lang="scss">
section {
  margin-top: 80px;
  font-family: 'Poppins', sans-serif;

  h1, h5 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
    color: #333;
  }

  label {
    font-weight: 500;
    color: #444;
    margin-bottom: 6px;
  }

  input,
  textarea {
    border-radius: 8px;
    padding: 0.6rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #d4a373;
      outline: none;
      box-shadow: 0 0 0 0.2rem rgba(212, 163, 115, 0.25);
    }
  }

  .is-invalid {
    border: 1px solid red !important;
  }

  .btn {
    background-color: #d4a373;
    border: none;
    color: white;
    font-weight: 500;
    padding: 0.6rem 1.4rem;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #c28859;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .ratio iframe {
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }
}

</style>

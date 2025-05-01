// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL
    }
  },
  app: {
    head: {
      title:'RAS Wedding - Xoşbəxtliyinizi bizimlə paylaşın',
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
              "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/rel.jpg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
        }
      ]
    }
  },
  modules: ['@nuxtjs/sitemap'],
  // sitemap: {
  //   hostname: 'https://raswedding.az',
  //   routes: ['/catalog', '/haqqimizda', '/elaqe'],
  // },
  compatibilityDate: '2024-11-01',

  devtools: { enabled: false },
  css: ['bootstrap/dist/css/bootstrap.min.css', 'bootstrap-icons/font/bootstrap-icons.css','@/assets/scss/_theme.scss'],
  plugins: ['@/plugins/bootstrap.client',]
})

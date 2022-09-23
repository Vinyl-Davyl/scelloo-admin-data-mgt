// import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default({
    // buildModules: [
    //     '@nuxt/postcss8',
    // ],
    build: {
        postcss: {
          postcssOptions: require('./postcss.config.js'),
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        },
    },
    css: [
        '@/assets/css/main.css',
    ],
})

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vScrollReveal } from './directives/scrollReveal.js'
import './assets/main.css'

createApp(App).use(router).directive('scroll-reveal', vScrollReveal).mount('#app')

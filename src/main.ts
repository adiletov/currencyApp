import { createApp } from 'vue'
import './styles/app.scss'
import App from './App.vue'
import router from "./router";
import store from "@/store/index";



createApp(App)
    .use(store)
    .use(router)
    .mount('#app')

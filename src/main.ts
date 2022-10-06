import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./assets/scss/index.scss"
import 'virtual:svg-icons-register'
import "../src/utils/permission"

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import installIcon from "./icons"
import axios from "axios";

// @ts-ignore
import vue3videoPlay from "vue3-video-play"
import 'vue3-video-play/dist/style.css' // 引入css
import Particles from 'particles.vue3';

// @ts-ignore
import VueAnimateNumber from 'vue-animate-number'
const app = createApp(App)
//服务器前缀设置
const baseURL = process.env.NODE_ENV === "development" ? '/api' : ''
//配置全局axios
axios.defaults.baseURL = baseURL //配置前缀url
axios.defaults.withCredentials = true //携带cookie
app.config.globalProperties.$axios = axios;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.use(vue3videoPlay)
app.use(VueAnimateNumber)
installIcon(app)
app.use(store).use(Particles).use(router).mixin({
    data() {
        return {baseURL}
    },
}).mount('#app')

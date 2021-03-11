import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import axios from './plugins/axios'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store'

const app = createApp(App).use(store)

app.use(router)
app.use(axios)
app.use(Antd)

app.mount('#app')

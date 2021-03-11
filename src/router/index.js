import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import crc from 'crc'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/room/:number/:hashcode',
    //{{crc.crc32(number).toString(16)}}
    name: 'room-schedule',
    component: () => import('../views/Room.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

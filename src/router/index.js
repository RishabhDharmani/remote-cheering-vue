import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    components: {
      default: () => import('@/views/About.vue'),
      sidebar: () => import('@/components/Sidebar.vue')   
    }
  },
  {
    path: '/record',
    components: {
      
      default: () => import('@/views/Record.vue'),
      sidebar: () => import('@/components/Sidebar.vue')
    }
  },
  {
    path: '/history',
    components: {
      default: () => import('@/views/History.vue'),
      sidebar: () => import('@/components/Sidebar.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

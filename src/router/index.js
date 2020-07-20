import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//creating routes for navigation
  const routes = [
  {
    //About page routes
    path: '/',
    components: {
      default: () => import('@/views/About.vue'),
      sidebar: () => import('@/components/Sidebar.vue')   
    }
  },
  {
    //Recording page routes
    path: '/record',
    components: {
      
      default: () => import('@/views/Record.vue'),
      sidebar: () => import('@/components/Sidebar.vue')
    }
  },
  {
    //History page routes
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

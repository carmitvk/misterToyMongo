import Vue from 'vue'
import VueRouter from 'vue-router'

import toyDetails from '../views/toyDetails.vue'
import toyEdit from '../views/toyEdit.vue'
import toyApp from '../views/toyApp.vue'
import about from '../views/about.vue'
import home from '../views/home.vue'
import dashboard from '../views/dashboard.vue'
import reviewEdit from '../views/reviewEdit.vue'
import login from '../views/login.vue'
import userDetails from '../views/userDetails.vue'


Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/toys',
    name: 'toyApp',
    component: toyApp
  },

  {
    path: '/toy/edit/:toyId?',
    component: toyEdit
  },
  {
    path: '/toy/:toyId',
    component: toyDetails,
  },
  {
    path: '/about',
    component: about,
  },
  {
    path: '/dashboard',
    component: dashboard,
  },

  {
    path: '/toy/:toyId/review/',
    // path: '/review/:reviewId?',
    component: reviewEdit
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  }
]

const router = new VueRouter({
  routes
})

export default router

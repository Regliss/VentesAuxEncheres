import Vue from 'vue'
import VueRouter from 'vue-router'
import Account from '../views/Account.vue'
import Login from '../views/Login.vue'
import ProductsCRUD from '../views/ProductsCRUD.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter(to, from, next) {
      if (!localStorage.getItem('token')) {
        next({
          name:"Login"
        })
      }
      else {
        next();
      }
    }
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {
      if (localStorage.getItem('token')) {
        next({
          name:"Account"
        })
      }
      else {
        next();
      }
    }
  },
  {
    path: '/productsCRUD',
    name: 'ProductsCRUD',
    component: ProductsCRUD,
    beforeEnter(to, from, next) {
      if (!localStorage.getItem('token')) {
        next({
          name:"Login"
        })
      }
      else {
        next();
      }
    }
  },
]

const router = new VueRouter({
  routes
})

export default router

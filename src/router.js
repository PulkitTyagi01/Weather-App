import { createRouter, createWebHistory } from 'vue-router'

import LoginView from './components/auth/LoginView.vue'
import SignupView from './components/auth/SignupView.vue'

import WeatherApp from './components/pages/WeatherApp.vue'
import WeatherCard from './components/pages/WeatherCard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login', meta: { requiresUnAuth: true } },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
      meta: { requiresUnAuth: true },
    },
    {
      path: '/register',
      name: 'SignupView',
      component: SignupView,
      meta: { requiresUnAuth: true },
    },
    {
      path: '/weather',
      name: 'WeatherApp',
      component: WeatherApp,
      meta: { requiresAuth: true },
    },
    {
      path: '/weather/:cityName',
      name: 'WeatherCard',
      component: WeatherCard,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const checkAuth = localStorage.getItem('userId')

  if (to.meta.requiresAuth) {
    if (checkAuth != null) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (checkAuth != null) {
      if (to.meta.requiresUnAuth) {
        console.log('weather')
        next('/weather')
      }
    } else {
      next()
    }
  }
})

export default router

//--------------------------------------------------------------------------------------------
// beforeRouteLeave(to, from, next) {
//     const autoCheck = loacalStorage.getItem('userId')
//     if (autoCheck) {
//       next(); // Allow leaving the route
//     } else {
//       next(false); // Prevent leaving the route
//     }
//   }

// router.beforeEach((to, from, next)=>{
//     const checkUser = localStorage.getItem('userId')
//     if (to.meta.requiresUnAuth){
//         if(checkUser != null){
//             next('weather')
//         }
//     }
// })

// router.beforeEach((to, from, next) => {
//     const checkAuth = localStorage.getItem('userId');

//     if (to.meta.requiresAuth) {
//       if (checkAuth != null) {
//         next();
//       } else {
//         next('/login');
//       }
//     } else if (to.meta.requiresUnAuth && from.name === 'WeatherCard' && checkAuth != null) {
//       console.log('weather details');
//       next('/details');
//     } else {
//       console.log('weather');
//       next('/weather');
//     }
//   });

// router.beforeEach((to, from, next)=>{
//     const checkUser = localStorage.getItem('userId')
//     if(checkUser != null){
//         if(to.meta.requiresUnAuth){
//             next(false)
//         }
//     }
// })

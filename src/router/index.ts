import { createRouter, createWebHashHistory } from 'vue-router'
import { auth } from '@/firebase.js'
import { onAuthStateChanged } from 'firebase/auth'

let currentUser: any = null
let isAuthResolved = false

const getCurrentUser = () => {
  return new Promise((resolve) => {
    if (isAuthResolved) {
      resolve(currentUser)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      currentUser = user
      isAuthResolved = true
      unsubscribe()
      resolve(user)
    })
  })
}

// Re-evaluate on subsequent auth state changes (e.g. sign in / sign out)
onAuthStateChanged(auth, (user) => {
  currentUser = user
  isAuthResolved = true
})

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/MarketingLanding.vue'),
      meta: {
        title: 'Cognitive Metrics AI — Next-Gen Performance Platform',
      },
    },
    {
      path: '/marketing',
      name: 'Marketing',
      component: () => import('../views/MarketingLanding.vue'),
      meta: {
        title: 'Cognitive Metrics AI — Next-Gen Performance Platform',
      },
    },
    {
      path: '/performance',
      name: 'PerformanceOverview',
      component: () => import('../views/Performance/OverviewDashboard.vue'),
      meta: {
        title: 'Cognitive Performance Center',
        requiresAuth: true,
      },
    },
    {
      path: '/performance/team-directory',
      name: 'TeamDirectory',
      component: () => import('../views/Performance/TeamDirectory.vue'),
      meta: {
        title: 'Team Directory',
        requiresAuth: true,
      },
    },
    {
      path: '/performance/employees/:id',
      name: 'EmployeeDetail',
      component: () => import('../views/Performance/EmployeeDetail.vue'),
      meta: {
        title: 'Employee Cognitive Profile',
        requiresAuth: true,
      },
    },
    {
      path: '/performance/review-generator',
      name: 'ReviewGenerator',
      component: () => import('../views/Performance/ReviewGenerator.vue'),
      meta: {
        title: 'AI Review Generator',
        requiresAuth: true,
      },
    },
    {
      path: '/performance/goals',
      name: 'PerformanceGoals',
      component: () => import('../views/Performance/Goals.vue'),
      meta: {
        title: 'Performance Goals',
        requiresAuth: true,
      },
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('../views/Others/Calendar.vue'),
      meta: {
        title: 'Calendar',
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: {
        title: 'Profile',
        requiresAuth: true,
      },
    },
    {
      path: '/form-elements',
      name: 'Form Elements',
      component: () => import('../views/Forms/FormElements.vue'),
      meta: {
        title: 'Form Elements',
        requiresAuth: true,
      },
    },
    {
      path: '/basic-tables',
      name: 'Basic Tables',
      component: () => import('../views/Tables/BasicTables.vue'),
      meta: {
        title: 'Basic Tables',
        requiresAuth: true,
      },
    },
    {
      path: '/line-chart',
      name: 'Line Chart',
      component: () => import('../views/Chart/LineChart/LineChart.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/bar-chart',
      name: 'Bar Chart',
      component: () => import('../views/Chart/BarChart/BarChart.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import('../views/UiElements/Alerts.vue'),
      meta: {
        title: 'Alerts',
        requiresAuth: true,
      },
    },
    {
      path: '/avatars',
      name: 'Avatars',
      component: () => import('../views/UiElements/Avatars.vue'),
      meta: {
        title: 'Avatars',
        requiresAuth: true,
      },
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('../views/UiElements/Badges.vue'),
      meta: {
        title: 'Badge',
        requiresAuth: true,
      },
    },
    {
      path: '/buttons',
      name: 'Buttons',
      component: () => import('../views/UiElements/Buttons.vue'),
      meta: {
        title: 'Buttons',
        requiresAuth: true,
      },
    },
    {
      path: '/images',
      name: 'Images',
      component: () => import('../views/UiElements/Images.vue'),
      meta: {
        title: 'Images',
        requiresAuth: true,
      },
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/UiElements/Videos.vue'),
      meta: {
        title: 'Videos',
        requiresAuth: true,
      },
    },
    {
      path: '/blank',
      name: 'Blank',
      component: () => import('../views/Pages/BlankPage.vue'),
      meta: {
        title: 'Blank',
        requiresAuth: true,
      },
    },
    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
      },
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: {
        title: 'Signup',
      },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser()
  if (to.meta.title) {
    document.title = `${to.meta.title} | Cognitive Metrics AI`
  }

  // If user is NOT logged in and trying to access protected routes, show marketing landing
  if (!user && to.meta.requiresAuth) {
    next({ path: '/' })
    return
  }

  // If user IS logged in and visiting home page, direct to performance dashboard
  if (user && to.path === '/') {
    next({ path: '/performance' })
    return
  }

  next()
})

export default router

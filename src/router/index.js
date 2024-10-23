import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PortfolioGridView from '@/views/PortfolioGridView.vue'
import ContactsView from '@/views/ContactsView.vue'
import ServicesView from '@/views/ServicesView.vue'
import PortfolioDetailsView from '@/views/PortfolioDetailsView.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Página Inicial',
    },
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioGridView,
  },
  {
    path: '/portfolio/:id',
    name: 'details',
    component: PortfolioDetailsView,
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsView,
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// // Guardião de rota para rolar para o topo
// router.afterEach(() => {
//   window.scrollTo(0, 0)
// })

export default router

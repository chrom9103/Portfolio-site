import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import WorksView from '../views/WorksView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/works',
      name: 'works',
      component: WorksView,
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/ArticlesView.vue'),
    },
    {
      path: '/articles/:uid',
      name: 'article-detail',
      component: () => import('../views/ArticleDetailView.vue'),
    },
    {
      path: '/:path(.*)*',
      component: NotFound
    },
  ],
})

export default router
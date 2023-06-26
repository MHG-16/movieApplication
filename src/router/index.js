// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
  },
  {
    path: "/movie/:id",
    name: 'Movie',
    component: () => import("@/views/MovieDetails")
  },
  {
    path: "/actors",
    name: "Actors",
    component: () => import("@/views/ActorsView")
  },
  {
    path: "/actor/:id",
    name: "Actor",
    component: () => import("@/views/ActorsDetailsView")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

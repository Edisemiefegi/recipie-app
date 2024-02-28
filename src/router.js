import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';
import Dashboard from './views/Dashboard.vue'; // Import your Vue components
import Recipie from './views/Recipie.vue'; // Import your Vue components

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipie',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/recipie/:id',
    name: 'Recipie',
    component: Recipie
  },
  // Add more routes here as needed
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

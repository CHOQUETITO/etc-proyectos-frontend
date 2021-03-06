import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */'../components/auth/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../components/dashboard'),
  },
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "dashboard" */ '../components/dashboard'),
  },
  {
    path: '/personas',
    name: 'Personas',
    component: () => import(/* webpackChunkName: "usuarios" */ '../components/personas'),
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: () => import(/* webpackChunkName: "usuarios" */ '../components/usuarios'),
  },
  {
    path: '/profile',
    name: 'Cuenta',
    component: () => import(/* webpackChunkName: "cuenta" */ '../components/cuenta'),
  },
  {
    path: '/proyectos',
    name: 'Proyectos',
    component: () => import(/* webpackChunkName: "Proyectos" */ '../components/proyectos'),
  },
  {
    path: '/empresas',
    name: 'Empresas',
    component: () => import(/* webpackChunkName: "Empresas" */ '../components/empresas'),
  },
  {
    path: '/poas',
    name: 'Poas',
    component: () => import(/* webpackChunkName: "Poas" */ '../components/poas'),
  },
  {
    path: '/cronogramas',
    name: 'Cronogramas',
    component: () => import(/* webpackChunkName: "Cronogramas" */ '../components/cronogramas'),
  },
  {
    path: '/reportes',
    name: 'Reportes',
    component: () => import(/* webpackChunkName: "Cronogramas" */ '../components/reportes'),
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "notFound" */ '../layout/AppNotFound.vue'),
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;

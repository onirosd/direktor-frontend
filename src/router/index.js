import Vue from "vue";
import VueRouter from "vue-router";
import First from "../views/register/First.vue";
import Second from "../views/register/Second.vue";
import Third from "../views/register/Third.vue";
import SuccessRegister from "../views/register/SuccessRegister.vue";
import Home from "../views/Home.vue";
import Welcome from "../views/start/Welcome.vue";
import Project from "../views/start/Project.vue";
import Restrictions from "../views/execution/Restrictions.vue";
import WhiteProject from "../views/execution/WhiteProject.vue";
import Graphic from "../views/execution/Graphic.vue";
import Login from "../views/autentication/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/autentication/login",
    name: "login",
    component: Login,
    meta: { layout: 'login' },
  },
  {
    path: "/register/first",
    name: "first-register",
    component: First,
    meta: { layout: 'register' },
  },
  {
    path: "/register/second",
    name: "second-register",
    component: Second,
    meta: { layout: 'register' },
  },
  {
    path: "/register/third",
    name: "third-register",
    component: Third,
    meta: { layout: 'register' },
  },
  {
    path: "/register/success",
    name: "success-register",
    component: SuccessRegister,
    meta: { layout: 'success-register' },
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { layout: 'dashboard' },
  },
  {
    path: "/start/welcome",
    name: "welcome",
    component: Welcome,
    meta: { layout: 'welcome' },
  },
  {
    path: "/start/create_project",
    name: "create_project",
    component: Project,
    meta: { layout: 'dashboard' },
  },
  {
    path: "/execution/restrictions_analysis",
    name: "restrictions_analysis",
    component: Restrictions,
    meta: { layout: 'dashboard' },
  },
  {
    path: "/execution/restrictions_analysis/white_project",
    name: "white_project",
    component: WhiteProject,
    meta: { layout: 'dashboard' },
  },
  {
    path: "/execution/graphic_advance",
    name: "graphic_advance",
    component: Graphic,
    meta: { layout: 'dashboard' },
  },
];

const router = new VueRouter({
  routes,
});

export default router;

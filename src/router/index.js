import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../layout/index.vue"),
    redirect: "home",
    children: [
      {
        path: "home",
        component: () => import("../views/home/index.vue"),
      },
      {
        path: "merchandiselist",
        component: () => import("../views/merchandiselist/index.vue"),
      },
      {
        path: "classification",
        component: () => import("../views/classification/index.vue"),
      },
      {
        path: "merchandiseAdd",
        component: () => import("../views/merchandiseAdd/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/login/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  /* 必须调用 `next` */
  if (store.getters.getActive == false && to.path != "/login") {
    next("/login");
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;

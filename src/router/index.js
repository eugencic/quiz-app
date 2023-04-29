import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import QuizView from "../views/QuizView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/quiz/:id",
    name: "quiz",
    component: QuizView,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const userData = localStorage.getItem("userData");
  if (requiresAuth && !userData) {
    if (to.path === "/signup") {
      next();
    } else {
      next("/signup");
    }
  } else {
    const user = JSON.parse(userData);
    if (user && user.userId && user.userId !== "undefined" && user.date && user.time) {
      const currentDate = new Date();
      const savedDate = new Date(user.date + " " + user.time);
      if (currentDate.toDateString() === savedDate.toDateString()) {
        if (currentDate.getTime() - savedDate.getTime() >= 2 * 60 * 1000) {
          // 12 * 60 * 60 * 1000;
          localStorage.clear();
          if (to.path === "/signup") {
            next();
          } else {
            next("/signup");
          }
        } else {
          next();
        }
      } else {
        localStorage.clear();
        if (to.path === "/signup") {
          next();
        } else {
          next("/signup");
        }
      }
    } else {
      localStorage.clear();
      if (to.path === "/signup") {
        next();
      } else {
        next("/signup");
      }
    }
  }
});

export default router;

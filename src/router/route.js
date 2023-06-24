
import auth from "@/middleware/auth";
import login from "@/views/auth/login/index.vue";
import guest from "@/middleware/guest";

const routes = [
  {
    path: "/",
    name: "Login",
    component: login, 
    meta: {
      middleware: [guest],
    }
  },

  {
    path: "/auth/callback",
    name: "AuthCallback",
    component: () => import("@/views/auth/common/callback.vue"),
  },

  {
    path: "/app",
    name: "Layout",
    redirect: "/app/home",
    component: () => import("@/Layout/index.vue"),
    meta: {
      middleware: [auth],
      groupParent: "app",


    },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/index.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/publics.vue"),
      },
      {
        path: "my-dashboard",
        name: "my-dashboard",
        component: () => import("@/views/dashboard/customs.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "metabase",
        name: "metabase",
        component: () => import("@/views/metabase/index.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "add-project",
        name: "Agregar proyecto personal",
        component: () => import("@/views/home/projects.vue")
      },
      {
        path: "explore/projects",
        name: "Explorar proyectos",
        component: () => import("@/views/explore/index.vue")
      },
    ],
  },
];

export default routes;

import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const publicRoutes = [
  {
    path: "login",
    name: "Login",
    component: () => import("@/views/auth/LoginView.vue"),
    meta: { guest: true },
  },
];

const adminRoutes = [
  {
    path: "",
    redirect: "dashboard",
  },
  {
    path: "dashboard",
    name: "Dashboard",
    component: () => import("@/views/admin/DashboardView.vue"),
  },
  {
    path: "memberships",
    name: "memberships",
    component: () => import("@/views/admin/MembershipsView.vue"),
  },
  {
    path: "consumers",
    name: "consumers",
    component: () => import("@/views/admin/ConsumerListView.vue"),
  },
  {
    path: "consumer/:id/:action(add|edit|view)",
    name: "Consumer Profile",
    component: () => import("@/views/admin/ConsumerProfile.vue"),
  },
  {
    path: "billings",
    name: "billings",
    component: () => import("@/views/admin/BillingListView.vue"),
  },
  {
    path: "billings/:id/:action(add|edit|view)",
    name: "Billing Form",
    component: () => import("@/views/admin/BillingForm.vue"),
  },
  {
    path: "collections",
    name: "collections",
    component: () => import("@/views/admin/CollectionListView.vue"),
  },
  {
    path: "expenses",
    name: "expenses",
    component: () => import("@/views/admin/ExpensesListView.vue"),
  },
  {
    path: "settings",
    name: "settings",
    component: () => import("@/views/admin/Settings.vue"),
  },
  {
    path: "users",
    name: "users",
    component: () => import("@/views/admin/UserList.vue"),
  },
  {
    path: "user-roles",
    name: "roles",
    component: () => import("@/views/admin/RoleList.vue"),
  },
  {
    path: "reports",
    component: () => import("@/views/admin/Reports.vue"),
    children: [
      {
        path: "",
        name: "Reports",
      },
    ],
  },
];

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/PublicLayout.vue"),
    children: publicRoutes,
  },
  {
    path: "/admin",
    component: () => import("@/layouts/DashboardLayout.vue"),
    meta: { requiresAuth: true },
    children: adminRoutes,
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  if (to.path === "/") {
    if (isAuthenticated) {
      next("/admin/dashboard");
    } else {
      next("/login");
    }
    return;
  }

  if (requiresAuth && !isAuthenticated) {
    next("/login");
    return;
  }

  if (to.meta.guest && isAuthenticated) {
    next("/admin/dashboard");
    return;
  }
  next();
});

export default router;

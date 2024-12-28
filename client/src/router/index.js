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
    meta: { requiresAuth: true },
  },
  {
    path: "dashboard",
    name: "Dashboard",
    component: () => import("@/views/admin/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "memberships",
    name: "memberships",
    component: () => import("@/views/admin/MembershipsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "consumers",
    name: "consumers",
    component: () => import("@/views/admin/ConsumerListView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "consumer/:id/:action(add|edit|view)",
    name: "Consumer Profile",
    component: () => import("@/views/admin/ConsumerProfile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "billings",
    name: "billings",
    component: () => import("@/views/admin/BillingListView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "billings/:id/:action(add|edit|view)",
    name: "Billing Form",
    component: () => import("@/views/admin/BillingForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "collections",
    name: "collections",
    component: () => import("@/views/admin/CollectionListView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "expenses",
    name: "expenses",
    component: () => import("@/views/admin/ExpensesListView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "settings",
    name: "settings",
    component: () => import("@/views/admin/Settings.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "users",
    name: "users",
    component: () => import("@/views/admin/UserListView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "user-roles",
    name: "roles",
    component: () => import("@/views/admin/RoleList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "reports",
    component: () => import("@/views/admin/Reports.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Reports",
        meta: { requiresAuth: true },
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
  const isAuthenticated = store.getters["users/isAuthenticated"];

  if (to.path === "/" && isAuthenticated) {
    next("/admin/dashboard");
  } else if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && isAuthenticated) {
    next("/admin/dashboard");
  } else {
    next();
  }
});

export default router;

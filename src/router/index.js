import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import UserProfile from "../components/UserProfile.vue";
import RepositoryList from "../components/RepositoryList.vue";
import UserActivity from "../components/UserActivity.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { title: "GitHub Profile Viewer - Search" },
    },
    {
      path: "/user/:username",
      name: "UserProfile",
      component: UserProfile,
      meta: { title: "User Profile" },
      props: true,
    },
    {
      path: "/user/:username/repositories",
      name: "Repositories",
      component: RepositoryList,
      meta: { title: "Repositories" },
      props: true,
    },
    {
      path: "/user/:username/activity",
      name: "Activity",
      component: UserActivity,
      meta: { title: "Activity" },
      props: true,
    },
    // Catch-all route for 404 pages
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../components/NotFound.vue"),
      meta: { title: "Page Not Found" },
    },
  ],
});

// Update document title based on route meta
router.beforeEach((to, from, next) => {
  const baseTitle = "GitHub Profile Viewer";
  const title = to.meta?.title ? `${to.meta.title} - ${baseTitle}` : baseTitle;
  document.title = title;
  next();
});

export default router;

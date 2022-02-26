import { createRouter, createWebHistory } from "vue-router";
import { authCheckGuard } from "@/utils/guard";
const Auth = () => import("@/views/Auth.vue");
const Me = () => import("@/views/Me.vue");
const MeHome = () => import("@/views/MeHome.vue");
const MeNotes = () => import("@/views/MeNotes.vue");
const MeNotesItems = () => import("@/views/MeNotesItems.vue");
const MeBookmarks = () => import("@/views/MeBookmarks.vue");
const MeSettings = () => import("@/views/MeSettings.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "auth",
      component: Auth,
      meta: {
        layout: "auth",
        requiresAnon: true,
      },
    },
    {
      path: "/me",
      name: "me",
      component: Me,
      redirect: { name: "me-home" },
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/main",
          name: "me-home",
          component: MeHome,
        },
        {
          path: "/notes",
          name: "me-notes",
          component: MeNotes,
        },
        {
          path: "/notes/:id",
          name: "me-notes-id",
          component: MeNotesItems,
          props: (route) => ({ id: Number(route.params.id) }),
        },
        {
          path: "/bookmarks",
          name: "me-bookmarks",
          component: MeBookmarks,
        },
        {
          path: "/settings",
          name: "me-settings",
          component: MeSettings,
        },
      ],
    },
  ],
});

router.beforeEach(authCheckGuard);

export default router;

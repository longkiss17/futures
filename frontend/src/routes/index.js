import { createRouter, createWebHistory } from "vue-router";

import Redirect from "@/components/Redirect.vue";
import Auth from "@/components/Auth.vue";
import Index from "@/components/Index.vue";
import MapleStoryIssue from "@/components/MapleStory/Issue/Index.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Index,
      name: "Index",
      children: [
        {
          path: "/maplestory",
          component: MapleStoryIssue,
          children: [
            {
              path: "/maplestory/calendar",
              component: MapleStoryIssue,
              name: "MapleStoryIssue",
            },
          ],
        },
      ],
    },
    { path: "/auth", component: Auth, name: "auth" },
  ],
});

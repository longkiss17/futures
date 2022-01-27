import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Assignment from "@/components/Assignment/Index";
import Chart from "@/components/Assignment/Chart";
import Bank from "@/components/Assignment/Bank";
import TossAnalytics from "@/components/Assignment/TossAnalytics";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/assignment",
      name: "Assignment",
      component: Assignment
    },
    {
      path: "/bank",
      name: "Bank",
      component: Bank
    },
    {
      path: "/toss",
      name: "TossAnalytics",
      component: TossAnalytics
    }
  ]
});

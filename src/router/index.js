import { createRouter, createWebHistory } from "vue-router";
import FirstStep from "../views/FirstStep.vue";
import SecondStep from "../views/SecondStep.vue";
import ThirdStep from "../views/ThirdStep.vue";
import FourthStep from "../views/FourthStep.vue";

const routes = [
  {
    path: "",
    redirect: { path: "/registration/first-step" },
  },
  {
    path: "/registration/first-step",
    name: "first-step",
    component: FirstStep,
  },
  {
    path: "/registration/second-step/:type",
    name: "second-step",
    component: SecondStep,
    params: {
      type: "",
    },
  },
  {
    path: "/registration/third-step",
    name: "third-step",
    component: ThirdStep,
  },
  {
    path: "/registration/fourth-step",
    name: "fourth-step",
    component: FourthStep,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

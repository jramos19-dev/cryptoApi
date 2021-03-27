import { createRouter, createWebHistory } from "vue-router"

import Home from "./views/Home.vue"
import Details from "./views/Details.vue"
import { currency } from "./helpers/useCurrencies"
import { cleanCurrency, getCurrency } from "./helpers/useCurrencies"

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/:id",
    component: Details,
    beforeEnter: (to, from) => {
      cleanCurrency()
      getCurrency(to.params.id)
      return true
    },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

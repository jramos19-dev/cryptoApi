<template>
  <h1 class="text-center text-gray-100 text-2xl">Cryptos</h1>

  <div
    class="mt-8 mx-auto grid gap-3 justify-items-center :sm grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
  >
    <router-link
      v-for="currency in currencies"
      :key="currency.asset"
      class="bg-green-300 w-64 h-64 text-red-600 font-bold text-center"
      :to="`/${currency.blockfactsTicker}`"
      >{{ currency.blockfactsTicker }}</router-link
    >
  </div>
</template>

<script setup>
import { onMounted } from "vue"

import { currencies, getCurrencies } from "../helpers/useCurrencies"

onMounted(() => {
  getCurrencies()
})
</script>

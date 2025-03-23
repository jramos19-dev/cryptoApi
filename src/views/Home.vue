<template>
  <div class="py-8">
    <h1 class="text-center text-3xl font-bold mb-8">Cryptocurrency Tracker</h1>

    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <router-link
        v-for="coin in currencies"
        :key="coin.uuid"
        :to="`/${coin.uuid}`"
        class="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-200"
      >
        <div class="flex items-center space-x-4">
          <img :src="coin.iconUrl" :alt="coin.name" class="w-12 h-12" />
          <div>
            <h2 class="font-bold text-xl">{{ coin.name }}</h2>
            <p class="text-gray-400">{{ coin.symbol }}</p>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-lg">${{ parseFloat(coin.price).toFixed(2) }}</p>
          <p :class="[
            'text-sm',
            parseFloat(coin.change) > 0 ? 'text-green-500' : 'text-red-500'
          ]">
            {{ coin.change }}% (24h)
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { currencies, getCurrencies } from "../helpers/useCurrencies"

onMounted(() => {
  getCurrencies()
})
</script>

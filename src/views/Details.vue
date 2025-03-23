<template>
  <div v-if="currency" class="py-8">
    <div class="bg-gray-800 rounded-lg p-6">
      <div class="flex items-center space-x-6 mb-6">
        <img :src="currency.iconUrl" :alt="currency.name" class="w-16 h-16" />
        <div>
          <h1 class="text-4xl font-bold">{{ currency.name }}</h1>
          <p class="text-xl text-gray-400">{{ currency.symbol }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-gray-700 p-4 rounded-lg">
          <h3 class="text-lg text-gray-400 mb-2">Price</h3>
          <p class="text-2xl font-bold">${{ parseFloat(currency.price).toFixed(2) }}</p>
        </div>

        <div class="bg-gray-700 p-4 rounded-lg">
          <h3 class="text-lg text-gray-400 mb-2">24h Change</h3>
          <p :class="[
            'text-2xl font-bold',
            parseFloat(currency.change) > 0 ? 'text-green-500' : 'text-red-500'
          ]">
            {{ currency.change }}%
          </p>
        </div>

        <div class="bg-gray-700 p-4 rounded-lg">
          <h3 class="text-lg text-gray-400 mb-2">Market Cap</h3>
          <p class="text-2xl font-bold">${{ parseFloat(currency.marketCap).toLocaleString() }}</p>
        </div>
      </div>

      <div class="mt-8 bg-gray-700 p-6 rounded-lg">
        <h2 class="text-2xl font-bold mb-4">Price History (7 Days)</h2>
        <PriceChart :coinId="currency.uuid || route.params.id" />
      </div>

      <div class="mt-8">
        <h2 class="text-2xl font-bold mb-4">Description</h2>
        <p class="text-gray-300">{{ currency.description || 'No description available.' }}</p>
      </div>
    </div>

    <router-link 
      to="/" 
      class="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
    >
      Back to List
    </router-link>
  </div>
  <div v-else class="py-8 text-center">
    <p class="text-xl">Loading...</p>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { currency, getCurrency, cleanCurrency } from "../helpers/useCurrencies"
import PriceChart from "../components/PriceChart.vue"

const route = useRoute()

onMounted(() => {
  console.log('Details view mounted, id:', route.params.id)
  cleanCurrency()
  getCurrency(route.params.id)
})

watch(currency, (newCurrency) => {
  console.log('Currency data updated:', newCurrency)
})
</script>

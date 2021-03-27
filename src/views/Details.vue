<template>
  <div
    v-if="currency"
    class="text-gray-100 text-center grid justify-items-center"
  >
    <h1>Details of Crypto Id: {{ id }}</h1>

    <div class="mt-6 grid bg-green-500 w-72 h-72">
      <p>More information about {{ currency.blockfactsTicker }}</p>
      <ul>
        <Li> Name: {{ currency.asset }} </Li>
        <li>Type: {{ currency.type }}</li>
      </ul>
    </div>
  </div>

  <div v-else class="text-2xl text-gray-100 text-center">Loading....</div>
</template>

<script setup>
import { useRoute } from "vue-router"
import { currency } from "../helpers/useCurrencies"

const id = useRoute().params.id
</script>

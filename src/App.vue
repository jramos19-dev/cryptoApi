<template>
  <div class="container mx-auto px-4">
    <header class="py-4">
      <h1 class="text-3xl font-bold text-white">Crypto Tracker</h1>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background-color: #1a202c;
  color: #e2e8f0;
}
</style>

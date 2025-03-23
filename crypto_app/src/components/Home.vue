<template>
  <div class="home">
    <h1>Cryptocurrency Dashboard</h1>
    <Search @search="handleSearch" />
    <div class="crypto-list" v-if="cryptocurrencies.length">
      <!-- Add your cryptocurrency list rendering logic here -->
    </div>
    <div v-else class="no-results">
      No cryptocurrencies found
    </div>
  </div>
</template>

<script>
import Search from './Search.vue'

export default {
  name: 'Home',
  components: {
    Search
  },
  data() {
    return {
      cryptocurrencies: [],
      filteredCryptocurrencies: []
    }
  },
  methods: {
    handleSearch(query) {
      if (!query) {
        this.filteredCryptocurrencies = this.cryptocurrencies
        return
      }
      
      this.filteredCryptocurrencies = this.cryptocurrencies.filter(crypto => 
        crypto.name.toLowerCase().includes(query.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(query.toLowerCase())
      )
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #2d3748;
  margin-bottom: 30px;
}

.crypto-list {
  margin-top: 30px;
}

.no-results {
  text-align: center;
  color: #718096;
  margin-top: 30px;
  font-size: 18px;
}
</style>

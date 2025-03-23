<template>
  <div class="search-container">
    <div class="search-wrapper">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="Search cryptocurrencies..."
        class="search-input"
      />
      <span class="search-icon">
        <i class="fas fa-search"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery)
    }
  }
}
</script>

<style scoped>
.search-container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 0 20px;
}

.search-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #fff;
  color: #2d3748;
}

.search-input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
}

.search-input::placeholder {
  color: #a0aec0;
}
</style>

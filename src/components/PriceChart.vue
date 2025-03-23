<template>
  <div class="chart-container">
    <Line v-if="loaded" :data="chartData" :options="chartOptions" />
    <div v-else class="text-center text-gray-500">Loading chart data...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const props = defineProps({
  coinId: {
    type: String,
    required: true
  }
})

const loaded = ref(false)
const chartData = ref({
  labels: [],
  datasets: [{
    label: 'Price (USD)',
    data: [],
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 2,
    fill: true,
    tension: 0.4
  }]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}

const fetchChartData = async () => {
  try {
    loaded.value = false
    console.log('Fetching data for coin:', props.coinId)
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${props.coinId}/market_chart?vs_currency=usd&days=7&interval=daily`)
    const data = await response.json()
    
    if (data.prices && Array.isArray(data.prices)) {
      chartData.value.labels = data.prices.map(price => {
        const date = new Date(price[0])
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      })
      
      chartData.value.datasets[0].data = data.prices.map(price => price[1])
      loaded.value = true
      console.log('Chart data loaded:', chartData.value)
    } else {
      console.error('Invalid data format received:', data)
    }
  } catch (error) {
    console.error('Error fetching chart data:', error)
  }
}

onMounted(() => {
  console.log('PriceChart mounted, coinId:', props.coinId)
  fetchChartData()
})

watch(() => props.coinId, (newId) => {
  console.log('CoinId changed to:', newId)
  fetchChartData()
})
</script>

<style scoped>
.chart-container {
  height: 300px;
  width: 100%;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
}
</style> 
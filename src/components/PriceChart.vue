<template>
  <div class="chart-container">
    <Line v-if="loaded" :data="chartData" :options="chartOptions" />
    <div v-else class="flex items-center justify-center h-full text-gray-500">
      <div class="text-center">
        <div class="mb-2">Loading price history...</div>
        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import axios from 'axios'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const props = defineProps({
  coinId: {
    type: String,
    required: true
  }
})

const loaded = ref(false)
const error = ref('')

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'x-access-token': import.meta.env.VITE_COINRANKING_API_KEY,
  },
})

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
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(context) {
          return `$${context.parsed.y.toFixed(2)}`
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        callback: function(value) {
          return '$' + value.toFixed(2)
        },
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  }
}

const fetchChartData = async () => {
  try {
    error.value = ''
    loaded.value = false
    console.log('Fetching price history for coin:', props.coinId)
    
    const response = await api.get(`/coin/${props.coinId}/history`, {
      params: {
        timePeriod: '7d'
      }
    })
    
    const history = response.data.data.history
    if (history && Array.isArray(history)) {
      chartData.value.labels = history.map(point => {
        const date = new Date(point.timestamp * 1000)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      })
      
      chartData.value.datasets[0].data = history.map(point => parseFloat(point.price))
      loaded.value = true
      console.log('Chart data loaded:', chartData.value)
    } else {
      error.value = 'No price history available'
      console.error('Invalid history data format:', response.data)
    }
  } catch (error) {
    error.value = 'Failed to load price history'
    console.error('Error fetching price history:', error)
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
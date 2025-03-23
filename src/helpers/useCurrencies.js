import { ref } from "vue"
import axios from "axios"

export const searchCurrency = ref("")

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'x-access-token': import.meta.env.VITE_COINRANKING_API_KEY,
  },
})

export const currencies = ref([])
export const currency = ref()

export const getCurrencies = async () => {
  try {
    const response = await api.get('/coins')
    currencies.value = response.data.data.coins
  } catch (error) {
    console.error('Error fetching currencies:', error)
  }
}

export const getCurrency = async (id) => {
  try {
    const response = await api.get(`/coin/${id}`)
    currency.value = response.data.data.coin
  } catch (error) {
    console.error('Error fetching currency details:', error)
  }
}

export const cleanCurrency = () => (currency.value = null)

import { ref } from "vue"
import axios from "axios"

export const searchCurrency = ref("")

const api = axios.create({
  baseURL: "https://api.blockfacts.io/api/v1/assets",
  headers: {
    "X-API-KEY": import.meta.env.apiKey,
    "X-API-SECRET": import.meta.env.secret,
  },
})

export const currencies = ref([])
export const currency = ref()

export const getCurrencies = async () => {
  try {
    const response = await api()
    currencies.value = response.data
  } catch (error) {
    console.log(error)
  }
}

export const getCurrency = async (id) => {
  try {
    const response = await api(id)
    currency.value = response.data
  } catch (error) {
    console.log(error)
  }
}

export const cleanCurrency = () => (currency.value = null)

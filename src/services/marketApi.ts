import { ref, onUnmounted } from 'vue'

const API_URL = 'http://market.beijingzxj.com/v2/quote?key=3fc63b650f'

let pollTimer: ReturnType<typeof setInterval> | null = null
let isPolling = false

export interface PriceItem {
  display?: string
  hgDisplay?: string
  high: number
  huigou: number
  low: number
  name: string
  scale: number
  sort: number
  xiaoshou: number
  xsDisplay?: string
}

export interface CategoryPrices {
  [key: string]: PriceItem
}

export interface MarketData {
  baiyin?: {
    display: string
    name: string
    prices: CategoryPrices
    sort: number
  }
  bajin?: {
    display: string
    name: string
    prices: CategoryPrices
    sort: number
  }
  bojin?: {
    display: string
    name: string
    prices: CategoryPrices
    sort: number
  }
  huangjin?: {
    display: string
    name: string
    prices: CategoryPrices
    sort: number
  }
  international?: {
    display: string
    name: string
    prices: CategoryPrices
    sort: number
  }
  sge?: {
    display: string
    name: string
    prices: CategoryPrices
    sort: number
  }
  time?: string
  trade?: boolean
  id?: string
}

export function useMarketApi(onMessage: (data: MarketData) => void) {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchData() {
    if (isLoading.value) return

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`请求失败: ${response.status}`)
      }

      const data: MarketData = await response.json()
      onMessage(data)
    } catch (err) {
      console.error('获取行情数据失败:', err)
      error.value = err instanceof Error ? err.message : '获取数据失败'
    } finally {
      isLoading.value = false
    }
  }

  function startPolling(intervalMs = 3000) {
    if (isPolling) return

    isPolling = true
    fetchData()
    pollTimer = setInterval(fetchData, intervalMs)
  }

  function stopPolling() {
    isPolling = false
    if (pollTimer) {
      clearInterval(pollTimer)
      pollTimer = null
    }
  }

  startPolling()

  onUnmounted(() => {
    stopPolling()
  })

  return { isLoading, error, fetchData, startPolling, stopPolling }
}

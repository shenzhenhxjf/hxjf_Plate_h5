import { ref, onUnmounted } from 'vue'
// @ts-ignore - pako 没有类型定义
import pako from 'pako'
// @ts-ignore - stomp.js 没有类型定义
import Stomp from 'stompjs'

interface WsMessage {
  time?: string
  trade?: number
  delayTrade?: number
  huangjin?: any
  baiyin?: any
  bajin?: any
  bojin?: any
  [key: string]: unknown
}

const WS_URL = import.meta.env.VITE_APP_WS_API as string

const STOMP_HEADER = {
  login: 'username',
  passcode: 'password'
}

const TOPIC = '/price/all'

let client: Stomp.Client | null = null
let reconnectTimer: ReturnType<typeof setTimeout> | null = null
let reconnectAttempts = 0
const MAX_RECONNECT = 10

export function useMarketWebSocket(onMessage: (data: WsMessage) => void) {
  const isConnected = ref(false)

  function connect() {
    if (client?.connected) return

    // 创建 WebSocket 连接
    const ws = new WebSocket(WS_URL)

    // 使用 STOMP 协议包装 WebSocket
    client = Stomp.over(ws)

    // 禁用 STOMP 的自动重连（我们使用自己的重连逻辑）
    client.reconnect = false

    // 连接 headers
    const headers = {
      login: STOMP_HEADER.login,
      passcode: STOMP_HEADER.passcode
    }

    client.connect(
      headers,
      () => {
        console.log('STOMP 连接成功')
        isConnected.value = true
        reconnectAttempts = 0

        // 订阅主题
        client?.subscribe(TOPIC, (res: { body?: string }) => {
          // console.log('订阅回调原始数据:', res)

          try {
            // body 是 base64 编码的 gzip 压缩数据
            if (res.body) {
              // console.log('body 内容:', res.body)

              // 1. base64 解码
              const binaryString = atob(res.body)
              const bytes = new Uint8Array(binaryString.length)
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i)
              }

              // 2. gzip 解压
              const decompressed = pako.ungzip(bytes, { to: 'string' })
              // console.log('解压后数据:', decompressed)

              // 3. JSON 解析
              const data = JSON.parse(decompressed)
              console.log('解析后数据:', data)
              onMessage(data)
              return
            }
          } catch (err) {
            console.error('数据解析失败:', err)
          }
        })

        console.log('已订阅主题:', TOPIC)
      },
      (error: string) => {
        console.error('STOMP 连接失败:', error)
        isConnected.value = false
        scheduleReconnect()
      }
    )

    ws.onclose = () => {
      console.log('WebSocket 连接关闭')
      isConnected.value = false
      scheduleReconnect()
    }

    ws.onerror = (err) => {
      console.error('WebSocket 错误:', err)
    }
  }

  function scheduleReconnect() {
    if (reconnectAttempts >= MAX_RECONNECT) {
      console.error('达到最大重连次数，停止重连')
      return
    }

    reconnectAttempts++
    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts - 1), 60000)
    console.log(`${delay}ms 后尝试第 ${reconnectAttempts} 次重连...`)

    reconnectTimer = setTimeout(() => {
      disconnect()
      connect()
    }, delay)
  }

  function disconnect() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }

    if (client) {
      client.disconnect(() => {
        console.log('STOMP 连接已断开')
      })
      client = null
    }

    isConnected.value = false
  }

  connect()

  onUnmounted(() => {
    disconnect()
  })

  return { isConnected }
}

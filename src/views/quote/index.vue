<script setup lang="ts">
import { reactive } from 'vue'
import { useMarketWebSocket } from '@/services/websocket'
import ScreenScale  from '@/components/scaleContainer.vue'
import logoImage from '@/assets/logo/logo.png'
import rightImage from '@/assets/card_content.png'
import goldImage from '@/assets/one.png'

interface ProductItem {
  category: string
  price: number | string
  code: string
  source?: 'huangjin' | 'sge'
}

useMarketWebSocket((data: any) => {
  console.log('收到行情数据:', data)

  // 处理上金所数据
  const sgePrices = data?.sge?.prices
  // 处理国内黄金数据
  const huangjinPrices = data?.huangjin?.prices

  if (sgePrices || huangjinPrices) {
    console.log('上金所行情:', sgePrices)
    console.log('国内黄金行情:', huangjinPrices)

    productsConfig.data.forEach((item) => {
      // 根据数据来源获取价格
      const priceData = item.source === 'huangjin'
          ? huangjinPrices?.[item.code]
          : sgePrices?.[item.code]

      console.log(`查找 ${item.code} (来源:${item.source}):`, priceData)
      if (priceData) {
        item.price = priceData.xiaoshou ?? priceData.huigou ?? '--'
        console.log(`更新 ${item.category}:`, item.price)
      }
    })
  }
})

// 格式化价格为两位小数
const formatPrice = (price: any) => {
  if (price === '--' || !price) return '--'
  const num = parseFloat(String(price))
  return isNaN(num) ? '--' : num.toFixed(2)
}

const productsConfig = reactive({
  title: '行情数据',
  columns: [
    { key: 'category', label: '品类' },
    { key: 'price', label: '销售价(元/克)' },
  ],
  data: [
    { category: '黄金销售价', price: '--', code: 'huangjin9999', source: 'huangjin' },
    { category: '黄金(T+D)', price: '--', code: 'huangjinTD', source: 'sge' },
    { category: '黄金99.99', price: '--', code: 'huangjin99_99', source: 'sge' },
    { category: '黄金99.95', price: '--', code: 'huangjin99_95', source: 'sge' },
    { category: '白银(T+D)', price: '--', code: 'baiyinTD', source: 'sge' },

  ] as ProductItem[],
})
</script>

<template>
  <ScreenScale>
    <div class="quote-container">
      <div class="content">
        <div class="gold_price_title">黄金销售价</div>
        <div class="gold_price_value">
          <span class="price_value">{{ formatPrice(productsConfig.data[0].price) }}</span>
          <span class="price_value_unit">元/克</span>
        </div>
      </div>
    </div>
  </ScreenScale>
</template>

<style scoped lang="scss">
.quote-container {
  position: relative;
  width: 1080px;
  height: 1920px;
  overflow: hidden;
  background: #F5F5F5;
}

.quote-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("@/assets/new_h5_bg/new_bg.png") center center / cover no-repeat;
  z-index: 0;

}

.content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}

</style>

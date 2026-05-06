<script setup lang="ts">
import { reactive } from 'vue'
import { useMarketApi } from '@/services/marketApi'

interface ProductItem {
  category: string
  price: number | string
  code: string
  source?: 'huangjin' | 'sge'
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

useMarketApi((data) => {
  const sgePrices = data?.sge?.prices
  const huangjinPrices = data?.huangjin?.prices

  if (sgePrices || huangjinPrices) {
    productsConfig.data.forEach((item) => {
      const priceData =
          item.source === 'huangjin'
              ? huangjinPrices?.[item.code]
              : sgePrices?.[item.code]

      if (priceData) {
        item.price = priceData.xiaoshou ?? priceData.huigou ?? '--'
      }
    })
  }
})

const formatPrice = (price: any) => {
  if (price === '--' || price === null || price === undefined || price === '') return '--'

  const num = Number(price)
  return Number.isNaN(num) ? '--' : num.toFixed(2)
}
</script>

<template>
  <div class="quote-container">
    <div class="price-box">
      <span class="price-value">
        {{ formatPrice(productsConfig.data[0].price) }}
      </span>
      <span class="price-unit">元/克</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.quote-container {
  --design-width: 1920;
  --design-height: 1080;

  --price-top: 270;
  --price-font: 240;
  --unit-font: 80;
  --unit-gap: 16;

  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  background-image: url('https://thhjg-open.oss-cn-shenzhen.aliyuncs.com/public/9ed5c7f1-cb2f-4b57-9973-4b30ed37f0d5');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}

.price-box {
  position: absolute;
  top: calc(var(--price-top) / var(--design-height) * 100vh);
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: baseline;
  justify-content: center;
  white-space: nowrap;
}

.price-value {
  font-weight: 600;
  font-size: calc(var(--price-font) / var(--design-width) * 100vw);
  line-height: 1;
  color: #ffffff;
}

.price-unit {
  margin-left: calc(var(--unit-gap) / var(--design-width) * 100vw);
  font-weight: 400;
  font-size: calc(var(--unit-font) / var(--design-width) * 100vw);
  line-height: 1;
  color: #ffffff;
}
</style>

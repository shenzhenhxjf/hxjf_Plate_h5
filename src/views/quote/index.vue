<!--<script setup lang="ts">-->
<!--import { reactive, ref } from 'vue'-->
<!--import { useMarketWebSocket } from '@/services/websocket'-->
<!--import ScreenScale  from '@/components/scaleContainer.vue'-->
<!--import { PRICE_COLORS } from '@/utils/colorUtils'-->

<!--interface ProductItem {-->
<!--  category: string-->
<!--  price: number | string-->
<!--  code: string-->
<!--  source?: 'huangjin' | 'sge'-->
<!--}-->

<!--// 保存上一个价格用于比较涨跌-->
<!--const prevPrices = reactive<Record<string, number | string>>({})-->

<!--// 当前黄金销售价颜色-->
<!--const goldPriceColor = ref<string>(PRICE_COLORS.RISE)-->

<!--useMarketWebSocket((data: any) => {-->
<!--  console.log('收到行情数据:', data)-->

<!--  // 处理上金所数据-->
<!--  const sgePrices = data?.sge?.prices-->
<!--  // 处理国内黄金数据-->
<!--  const huangjinPrices = data?.huangjin?.prices-->

<!--  if (sgePrices || huangjinPrices) {-->
<!--    console.log('上金所行情:', sgePrices)-->
<!--    console.log('国内黄金行情:', huangjinPrices)-->

<!--    productsConfig.data.forEach((item) => {-->
<!--      // 根据数据来源获取价格-->
<!--      const priceData = item.source === 'huangjin'-->
<!--          ? huangjinPrices?.[item.code]-->
<!--          : sgePrices?.[item.code]-->

<!--      console.log(`查找 ${item.code} (来源:${item.source}):`, priceData)-->
<!--      if (priceData) {-->
<!--        const newPrice = priceData.xiaoshou ?? priceData.huigou ?? '&#45;&#45;'-->

<!--        // 更新价格时计算颜色（红涨绿跌）-->
<!--        if (item.code === 'huangjin9999' && typeof newPrice === 'number' && typeof prevPrices[item.code] === 'number') {-->
<!--          const currentPrice = prevPrices[item.code] as number-->

<!--          if (goldPriceColor.value === PRICE_COLORS.RISE) {-->
<!--            // 红色状态：价格下跌则变绿-->
<!--            if (newPrice < currentPrice) {-->
<!--              goldPriceColor.value = PRICE_COLORS.FALL-->
<!--            }-->
<!--          } else {-->
<!--            // 绿色状态：只要价格上涨就变红-->
<!--            if (newPrice > currentPrice) {-->
<!--              goldPriceColor.value = PRICE_COLORS.RISE-->
<!--            }-->
<!--          }-->
<!--        }-->

<!--        prevPrices[item.code] = item.price-->
<!--        item.price = newPrice-->
<!--        console.log(`更新 ${item.category}:`, item.price)-->
<!--      }-->
<!--    })-->
<!--  }-->
<!--})-->

<!--// 格式化价格为两位小数-->
<!--const formatPrice = (price: any) => {-->
<!--  if (price === '&#45;&#45;' || !price) return '&#45;&#45;'-->
<!--  const num = parseFloat(String(price))-->
<!--  return isNaN(num) ? '&#45;&#45;' : num.toFixed(2)-->
<!--}-->

<!--const productsConfig = reactive({-->
<!--  title: '行情数据',-->
<!--  columns: [-->
<!--    { key: 'category', label: '品类' },-->
<!--    { key: 'price', label: '销售价(元/克)' },-->
<!--  ],-->
<!--  data: [-->
<!--    { category: '黄金销售价', price: '&#45;&#45;', code: 'huangjin9999', source: 'huangjin' },-->
<!--    { category: '黄金(T+D)', price: '&#45;&#45;', code: 'huangjinTD', source: 'sge' },-->
<!--    { category: '黄金99.99', price: '&#45;&#45;', code: 'huangjin99_99', source: 'sge' },-->
<!--    { category: '黄金99.95', price: '&#45;&#45;', code: 'huangjin99_95', source: 'sge' },-->
<!--    { category: '白银(T+D)', price: '&#45;&#45;', code: 'baiyinTD', source: 'sge' },-->

<!--  ] as ProductItem[],-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--  <ScreenScale>-->
<!--    <div class="quote-container">-->
<!--      <div class="one">-->
<!--        <div class="gold_price_title">黄金销售价</div>-->
<!--        <div class="gold_price_value">-->
<!--          <span class="price_value" :style="{ color: goldPriceColor }">{{ formatPrice(productsConfig.data[0].price) }}</span>-->
<!--          <span class="price_value_unit">元/克</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </ScreenScale>-->
<!--</template>-->

<!--<style scoped lang="scss">-->
<!--.quote-container {-->
<!--  position: relative;-->
<!--  width: 1080px;-->
<!--  height: 1920px;-->
<!--  overflow: hidden;-->
<!--  background: #F5F5F5;-->
<!--}-->

<!--.quote-container::before {-->
<!--  content: '';-->
<!--  position: absolute;-->
<!--  inset: 80px 0 0 0;-->
<!--  background: url("https://can-open-resource-shenzhenhxjf.oss-cn-shenzhen.aliyuncs.com/public/f39b31be-4e37-4662-90d7-00da85d054ab") center center / cover no-repeat;-->
<!--  z-index: 0;-->

<!--}-->

<!--.content {-->
<!--  position: relative;-->
<!--  z-index: 1;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->
<!--.gold_price_title {-->
<!--  width: 320px;-->
<!--  height: 64px;-->
<!--  font-family: PingFang SC, PingFang SC;-->
<!--  font-weight: 500;-->
<!--  font-size: 64px;-->
<!--  color: #333333;-->
<!--  line-height: 24px;-->
<!--  text-align: center;-->
<!--  font-style: normal;-->
<!--  text-transform: none;-->
<!--}-->
<!--.one {-->
<!--  position: relative;-->
<!--  z-index: 1;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  gap: 75px;-->
<!--  margin-top: -55px;-->
<!--}-->
<!--.price_value {-->
<!--  font-family: PingFang SC, PingFang SC;-->
<!--  font-weight: 600;-->
<!--  font-size: 170px;-->
<!--  color: #F92424;-->
<!--  line-height: 48px;-->
<!--  text-align: center;-->
<!--  font-style: normal;-->
<!--  text-transform: none;-->
<!--}-->
<!--.price_value_unit {-->
<!--  font-size: 40px;-->
<!--}-->

<!--</style>-->

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMarketWebSocket } from '@/services/websocket'
import { PRICE_COLORS } from '@/utils/colorUtils'

interface ProductItem {
  category: string
  price: number | string
  code: string
  source?: 'huangjin' | 'sge'
}

// 保存上一个价格用于比较涨跌
const prevPrices = reactive<Record<string, number | string>>({})

// 当前黄金销售价颜色
const goldPriceColor = ref<string>(PRICE_COLORS.RISE)

useMarketWebSocket((data: any) => {
  console.log('收到行情数据:', data)

  const sgePrices = data?.sge?.prices
  const huangjinPrices = data?.huangjin?.prices

  if (sgePrices || huangjinPrices) {
    console.log('上金所行情:', sgePrices)
    console.log('国内黄金行情:', huangjinPrices)

    productsConfig.data.forEach((item) => {
      const priceData =
          item.source === 'huangjin'
              ? huangjinPrices?.[item.code]
              : sgePrices?.[item.code]

      console.log(`查找 ${item.code} (来源:${item.source}):`, priceData)

      if (priceData) {
        const newPrice = priceData.xiaoshou ?? priceData.huigou ?? '--'

        if (
            item.code === 'huangjin9999' &&
            typeof newPrice === 'number' &&
            typeof prevPrices[item.code] === 'number'
        ) {
          const currentPrice = prevPrices[item.code] as number

          if (goldPriceColor.value === PRICE_COLORS.RISE) {
            if (newPrice < currentPrice) {
              goldPriceColor.value = PRICE_COLORS.FALL
            }
          } else {
            if (newPrice > currentPrice) {
              goldPriceColor.value = PRICE_COLORS.RISE
            }
          }
        }

        prevPrices[item.code] = item.price
        item.price = newPrice
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
  <div class="quote-container">
    <div class="one">
      <div class="gold_price_title">黄金销售价</div>

      <div class="gold_price_value">
        <span class="price_value" :style="{ color: goldPriceColor }">
          {{ formatPrice(productsConfig.data[0].price) }}
        </span>
        <span class="price_value_unit">元/克</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.quote-container {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background: #f5f5f5;
}

.quote-container::before {
  content: '';
  position: absolute;
  top: 4.2vh;
  right: 0;
  bottom: 0;
  left: 0;
  background: url("https://can-open-resource-shenzhenhxjf.oss-cn-shenzhen.aliyuncs.com/public/f39b31be-4e37-4662-90d7-00da85d054ab")
  center center / cover no-repeat;
  z-index: 0;
}

.one {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4vh;
  padding: 0 5vw;
  box-sizing: border-box;
}

.gold_price_title {
  width: 100%;
  text-align: center;
  font-weight: 500;
  font-size: clamp(28px, 5vw, 64px);
  color: #333333;
  line-height: 1.2;
}

.gold_price_value {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1vw;
}

.price_value {
  font-weight: 600;
  font-size: clamp(56px, 14vw, 170px);
  line-height: 1;
  text-align: center;
}

.price_value_unit {
  font-size: clamp(20px, 3.6vw, 40px);
  line-height: 1.2;
  color: #333333;
  margin-bottom: 1vh;
}
</style>

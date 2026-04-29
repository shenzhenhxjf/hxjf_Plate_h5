<!--<script setup lang="ts">-->
<!--import { reactive } from 'vue'-->
<!--import { useMarketWebSocket } from '@/services/websocket'-->
<!--import ScreenScale  from '@/components/scaleContainer.vue'-->
<!--import logoImage from '@/assets/logo/logo.png'-->
<!--import rightImage from '@/assets/card_content.png'-->
<!--import goldImage from '@/assets/one.png'-->

<!--interface ProductItem {-->
<!--  category: string-->
<!--  price: number | string-->
<!--  code: string-->
<!--  source?: 'huangjin' | 'sge'-->
<!--}-->

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
<!--        item.price = priceData.xiaoshou ?? priceData.huigou ?? '&#45;&#45;'-->
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
<!--      <div class="content">-->
<!--        <div class="left_container">-->
<!--          <div class="left_content">-->
<!--            <div class="left_content_top">-->
<!--              <div class="logo_image">-->
<!--                <img :src="logoImage" alt="海峡金" class="image"/>-->
<!--              </div>-->


<!--              &lt;!&ndash;              <div class="gold_price">&ndash;&gt;-->
<!--              &lt;!&ndash;                <div class="gold_price_title">黄金销售价</div>&ndash;&gt;-->
<!--              &lt;!&ndash;                <div class="gold_price_value">&ndash;&gt;-->
<!--              &lt;!&ndash;                  <span class="price_value">{{ formatPrice(productsConfig.data[0].price) }}</span>&ndash;&gt;-->
<!--              &lt;!&ndash;                  <span class="price_value_unit">元/克</span>&ndash;&gt;-->
<!--              &lt;!&ndash;                </div>&ndash;&gt;-->
<!--              &lt;!&ndash;              </div>&ndash;&gt;-->

<!--              <div class="gold_price">-->
<!--                <div class="one">-->
<!--                  <div class="gold_price_title">黄金销售价</div>-->
<!--                  <div class="gold_price_value">-->
<!--                    <span class="price_value">{{ formatPrice(productsConfig.data[0].price) }}</span>-->
<!--                    <span class="price_value_unit">元/克</span>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="gold_image">-->
<!--                  <img :src="goldImage" alt="黄金" class="one_image"/>-->
<!--                </div>-->

<!--                <div class="one">-->
<!--                  <div class="gold_price_title">黄金代入库价</div>-->
<!--                  <div class="gold_take_up_value">-->
<!--                    <span class="price_value_one">{{ formatPrice(productsConfig.data[0].price as any - 4 )}}</span>-->
<!--                    <span class="price_value_unit">元/克</span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="left_content_bottom">-->
<!--              <div class="bottom_table">-->
<!--                <div class="table_title">-->
<!--                  <span class="main_title">上海黄金交易所 (SGE)</span>-->
<!--                  <span class="minor_title">数据实时更新</span>-->
<!--                </div>-->
<!--                <div class="table_content">-->
<!--                  <div class="table_header">-->
<!--                    <div v-for="col in productsConfig.columns" :key="col.key" class="table-header-content" >-->
<!--                      {{ col.label}}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  &lt;!&ndash;                  <div class="table_divider"></div>&ndash;&gt;-->
<!--                  <div class="table_body">-->
<!--                    <div v-for=" (item, index) in productsConfig.data" :key="item.category" v-show="index !== 0" class="table-row">-->
<!--                      <div class="table-cell">{{ item.category }}</div>-->
<!--                      <div class="table-cell price-cell">{{ formatPrice(item.price) }}</div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="right_container">-->
<!--          <img :src="rightImage" alt="海峡金" class="image_content"/>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </ScreenScale>-->
<!--</template>-->

<!--<style scoped lang="scss">-->
<!--.quote-container {-->
<!--  width: 1920px;-->
<!--  height: 1080px;-->
<!--  background-image: url("@/assets/bg_logo/hjxbg.png");-->
<!--  background-size: cover;-->
<!--  background-position: center center;-->
<!--  background-repeat: no-repeat;-->
<!--}-->

<!--.content {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  display: flex;-->
<!--  padding: 142px 30px 0 30px;-->
<!--  gap: 10px;-->
<!--  box-sizing: border-box;-->
<!--}-->
<!--.left_container {-->
<!--  width: 1225px;-->
<!--  height: calc(100% - 38px);-->
<!--  background-color: #fff;-->
<!--  border-radius: 8px;-->
<!--}-->
<!--.right_container {-->
<!--  width: 620px;-->
<!--  height: calc(100% - 38px);-->
<!--  //background-color: blue;-->
<!--}-->
<!--.image_content {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  object-fit: cover;-->
<!--}-->

<!--.left_content_top {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  flex-direction: column;-->
<!--}-->
<!--.logo_image {-->
<!--  margin: 40px 0 30px 0;-->
<!--}-->

<!--.logo_image .image {-->
<!--  width: 280px;-->
<!--  height: 125px-->
<!--}-->
<!--//.gold_price {-->
<!--//  width: 1080px;-->
<!--//  height: 172px;-->
<!--//  background: #F8F8F8;-->
<!--//  border-radius: 12px 12px 12px 12px;-->
<!--//  border: 1px solid #DDDDDD;-->
<!--//  display: flex;-->
<!--//  flex-direction: column;-->
<!--//  align-items: center;-->
<!--//  justify-content: center;-->
<!--//  gap: 20px;-->
<!--//}-->
<!--//.gold_price_title {-->
<!--//  width: 120px;-->
<!--//  height: 24px;-->
<!--//  font-family: PingFang SC, PingFang SC;-->
<!--//  font-weight: 500;-->
<!--//  font-size: 24px;-->
<!--//  color: #333333;-->
<!--//  line-height: 24px;-->
<!--//  text-align: center;-->
<!--//  font-style: normal;-->
<!--//  text-transform: none;-->
<!--//}-->
<!--.gold_price_value {-->

<!--}-->
<!--//.price_value {-->
<!--//  font-family: PingFang SC, PingFang SC;-->
<!--//  font-weight: 600;-->
<!--//  font-size: 48px;-->
<!--//  color: #F92424;-->
<!--//  line-height: 48px;-->
<!--//  text-align: center;-->
<!--//  font-style: normal;-->
<!--//  text-transform: none;-->
<!--//}-->


<!--/*添加代入库*/-->
<!--.gold_price {-->
<!--  width: 1080px;-->
<!--  height: 172px;-->
<!--  background: #F8F8F8;-->
<!--  border-radius: 12px;-->
<!--  border: 1px solid #DDDDDD;-->
<!--  display: flex;-->
<!--  //flex-direction: column;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  gap: 100px;-->
<!--}-->
<!--.gold_image .one_image {-->
<!--  width: 80px;-->
<!--  height: auto;-->
<!--}-->
<!--.gold_price_title {-->
<!--  width: 145px;-->
<!--  height: 24px;-->
<!--  font-family: PingFang SC, PingFang SC;-->
<!--  font-weight: 500;-->
<!--  font-size: 24px;-->
<!--  color: #333333;-->
<!--  line-height: 24px;-->
<!--  text-align: center;-->
<!--  font-style: normal;-->
<!--  text-transform: none;-->
<!--}-->
<!--.one {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  gap: 12px;-->
<!--}-->
<!--.price_value {-->
<!--  font-family: PingFang SC, PingFang SC;-->
<!--  font-weight: 600;-->
<!--  font-size: 48px;-->
<!--  color: #F92424;-->
<!--  line-height: 48px;-->
<!--  text-align: center;-->
<!--  font-style: normal;-->
<!--  text-transform: none;-->
<!--}-->
<!--.price_value_one {-->
<!--  font-family: PingFang SC, PingFang SC;-->
<!--  font-weight: 600;-->
<!--  font-size: 48px;-->
<!--  color: #006400;-->
<!--  line-height: 48px;-->
<!--  text-align: center;-->
<!--  font-style: normal;-->
<!--  text-transform: none;-->
<!--}-->
<!--/*添加代入库*/-->

<!--.left_content_bottom {-->
<!--  margin-top: 50px;-->
<!--}-->
<!--.bottom_table {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  padding: 0 60px;-->
<!--}-->
<!--.table_title {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--}-->
<!--.table_title .main_title {-->
<!--  font-family: PingFang SC, PingFang SC;-->
<!--  font-weight: 500;-->
<!--  font-size: 24px;-->
<!--  color: #333333;-->
<!--  line-height: 24px;-->
<!--  text-align: left;-->
<!--  font-style: normal;-->
<!--  text-transform: none;-->
<!--}-->
<!--.table_title .minor_title {-->
<!--  //width: 152px;-->
<!--  //height: 36px;-->
<!--  background-color: #EAF4FF;-->
<!--  padding: 6px 16px;-->
<!--  margin-left: 20px;-->
<!--  border-radius: 8px;-->

<!--  font-family: PingFang SC, PingFang SC;-->
<!--  font-weight: 400;-->
<!--  font-size: 20px;-->
<!--  color: #20518A;-->
<!--  line-height: 20px;-->
<!--  text-align: left;-->
<!--  font-style: normal;-->
<!--  text-transform: none;-->
<!--}-->
<!--.table_content {-->
<!--  //margin-top:30px;-->
<!--  padding: 0 30px;-->
<!--}-->
<!--.table_header {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->

<!--  font-family: PingFang SC, PingFang SC;-->
<!--  font-weight: 500;-->
<!--  font-size: 20px;-->
<!--  color: #666666;-->
<!--  line-height: 20px;-->
<!--  text-align: left;-->
<!--  font-style: normal;-->
<!--  text-transform: none;-->

<!--  border-bottom: 2px solid #E5E5E5;-->


<!--}-->
<!--.table-header-content {-->
<!--  padding: 27px;-->
<!--}-->
<!--.table_body {-->

<!--}-->
<!--.table-row {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  padding: 24px;-->
<!--  border-bottom: 2px solid #E5E5E5;-->
<!--}-->
<!--.table-cell {-->
<!--  font-family: PingFang SC, PingFang SC;-->
<!--  font-weight: 500;-->
<!--  font-size: 35px;-->
<!--  color: #1A1A1A;-->
<!--  line-height: 24px;-->
<!--  text-align: left;-->
<!--  font-style: normal;-->
<!--  text-transform: none;-->
<!--}-->
<!--.price-cell {-->
<!--  color: #F92424;-->
<!--}-->

<!--</style>-->
<script setup lang="ts">
import { reactive } from 'vue'
import { useMarketWebSocket } from '@/services/websocket'

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

useMarketWebSocket((data: any) => {
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
  /*
    设计稿尺寸：1920 x 1080
  */
  --design-width: 1920;
  --design-height: 1080;

  /* 控制价格位置和大小 */
  --price-top: 270;
  --price-font: 240;
  --unit-font: 80;
  --unit-gap: 16;

  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  background-image: url('@/assets/hxj_quote/hxj_quote.png');
  background-repeat: no-repeat;
  background-position: center center;

  /*
    100% 100%：背景完整铺满，不裁切，但可能轻微拉伸
  */
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

<script setup lang="ts">
import { reactive } from 'vue'
import { useMarketWebSocket } from '@/services/websocket'
import ScreenScale from '@/components/scaleContainer.vue'
import logoImage from '@/assets/logo/logo.png'
import rightImage from '@/assets/card_content.png'

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
    { key: 'price', label: '销售价(克/元)' },
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
        <div class="left_container">
          <div class="left_content">
            <div class="left_content_top">
              <div class="logo_image">
                <img :src="logoImage" alt="海峡金" class="image"/>
              </div>
              <div class="gold_price">
                <div class="gold_price_title">黄金销售价</div>
                <div class="gold_price_value">
                  <span class="price_value">{{ formatPrice(productsConfig.data[0].price) }}</span>
                  <span class="price_value_unit">元/克</span>
                </div>
              </div>
            </div>
            <div class="left_content_bottom">
              <div class="bottom_table">
                <div class="table_title">
                  <span class="main_title">上海黄金交易所 (SGE)</span>
                  <span class="minor_title">数据实时更新</span>
                </div>
                <div class="table_content">
                  <div class="table_header">
                    <div v-for="col in productsConfig.columns" :key="col.key" class="table-header-content" >
                      {{ col.label}}
                    </div>
                  </div>
<!--                  <div class="table_divider"></div>-->
                  <div class="table_body">
                    <div v-for=" (item, index) in productsConfig.data" :key="item.category" v-show="index !== 0" class="table-row">
                      <div class="table-cell">{{ item.category }}</div>
                      <div class="table-cell price-cell">{{ formatPrice(item.price) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right_container">
          <img :src="rightImage" alt="海峡金" class="image_content"/>
        </div>
      </div>
    </div>
  </ScreenScale>
</template>

<style scoped lang="scss">
.quote-container {
  width: 1920px;
  height: 1080px;
  background-image: url("@/assets/bg_logo/hjxbg.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 142px 30px 0 30px;
  gap: 10px;
  box-sizing: border-box;
}
.left_container {
  width: 1225px;
  height: calc(100% - 38px);
  background-color: #fff;
  border-radius: 8px;
}
.right_container {
  width: 620px;
  height: calc(100% - 38px);
  background-color: blue;
}
.image_content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.left_content_top {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.logo_image {
  margin: 40px 0 30px 0;
}

.logo_image .image {
  width: 280px;
  height: 125px
}
.gold_price {
  width: 1080px;
  height: 172px;
  background: #F8F8F8;
  border-radius: 12px 12px 12px 12px;
  border: 1px solid #DDDDDD;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.gold_price_title {
  width: 120px;
  height: 24px;
  font-family: PingFang SC, PingFang SC;
  font-weight: 500;
  font-size: 24px;
  color: #333333;
  line-height: 24px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
.gold_price_value {

}
.price_value {
  font-family: PingFang SC, PingFang SC;
  font-weight: 600;
  font-size: 48px;
  color: #F92424;
  line-height: 48px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
.left_content_bottom {
  margin-top: 90px;
}
.bottom_table {
  display: flex;
  flex-direction: column;
  padding-left: 60px;
  //gap: 30px;
}
.table_title .main_title {
  font-family: PingFang SC, PingFang SC;
  font-weight: 500;
  font-size: 24px;
  color: #333333;
  line-height: 24px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.table_title .minor_title {
  width: 152px;
  height: 36px;
  background-color: #EAF4FF;
  padding: 6px 16px;
  margin-left: 20px;
  border-radius: 8px;

  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 20px;
  color: #20518A;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.table_content {
  margin-top:30px;
  padding: 0 30px;
}
.table_header {
  display: flex;
  justify-content: space-between;

  font-family: PingFang SC, PingFang SC;
  font-weight: 500;
  font-size: 20px;
  color: #666666;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-transform: none;

  border-bottom: 2px solid #E5E5E5;


}
.table-header-content {
  padding: 27px;
}
.table_body {

}
.table-row {
  display: flex;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 2px solid #E5E5E5;
}
.table-cell {
  font-family: PingFang SC, PingFang SC;
  font-weight: 500;
  font-size: 24px;
  color: #1A1A1A;
  line-height: 24px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.price-cell {
  color: #F92424;
}







</style>

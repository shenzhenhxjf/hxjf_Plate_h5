<script setup lang="ts">
import { reactive } from 'vue'
// import HeaderNavbar from '@/components/headerNavBar/index.vue'
// import bgImage from '@/assets/bg_logo/hjxbg.png'
import introImage from '@/assets/card_content.png'
import logoImage from '@/assets/logo/logo.png'
// import qrcodeImage from '@/assets/one.png'
import goldBarImage from '@/assets/one.png'
import { useMarketWebSocket } from '@/services/websocket'

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
  <div class="quote-container">
<!--    <img :src="bgImage" class="bg-image" alt=""/>-->
    <!-- 顶部导航 -->
    <!--  <HeaderNavbar />-->

    <!-- 行情数据标题 -->
    <div class="content">
      <div class="quote-content">
        <!-- 报价 -->
        <div class="products-section">
          <!-- Logo -->
          <div class="logo-wrapper">
            <img :src="logoImage" alt="海峡金" class="section-logo" />
          </div>

          <!-- 主要价格显示区域 -->
          <div class="main-price-container">
            <div class="crad">
              <div class="price-label">黄金销售价</div>
              <div class="price-display">
                <span class="price-value">{{ formatPrice(productsConfig.data[0].price) }}</span>
                <span class="price-unit">元/克</span>
              </div>
            </div>
            <div class="gold-bar-container">
              <img :src="goldBarImage" alt="金条" class="gold-bar-image" />
            </div>
            <div class="card_content">
              <div class="price-label">黄金代入库价</div>
              <div class="price-display">
                <span class="price-value">{{ formatPrice((productsConfig?.data[0]?.price as any - 4)) }}</span>
                <span class="price-unit">元/克</span>
              </div>
            </div>
          </div>

          <!-- 数据源信息 -->
          <div class="data-source">
            <span>上海黄金交易所 (SGE)</span>
            <span>数据实时更新</span>
          </div>

          <!-- 详细列表表格 -->
          <div class="products-table">
            <div class="table-header">
              <div v-for="col in productsConfig.columns" :key="col.key" class="table-header-cell">
                {{ col.label }}
              </div>
            </div>
            <div class="table-body">
              <div v-for="(item, index) in productsConfig.data" :key="item.category" v-show="index !== 0" class="table-row">
                <div class="table-cell">{{ item.category }}</div>
                <div class="table-cell price-cell">{{ formatPrice(item.price) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
          <img :src="introImage" alt="" class="intro-image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.quote-container {
  min-height: 100vh;
  position: relative;
  padding: 2px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  background-image: url("../../assets/bg_logo/hjxbg.png");
  background-size: cover;
  background-position: center;
  //background-size: 100% auto;

}

.content {
  display: flex;
  justify-content: space-between;
  margin: 12vh 0 0 0;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  height: 86vh;

}

.quote-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: 100%;
}


.card-qrcode {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-qrcode .qrcode-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
}


.card {
  width: 40%;
  height: 86vh;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  overflow: hidden;

}
.intro-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 8px;
}



.products-section {
  background: #f5f5f5;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* 主要价格显示区域 */
.main-price-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 20px 32px;
  background: #DDDDDD;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
  gap: 40px;
}

.crad,
.card_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.gold-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 20px;
}

.gold-bar-image {
  height: 100px;
  width: auto;
  object-fit: contain;
}

.price-label {
  font-size: 18px;
  color: #666;
  font-weight: 500;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.price-display {
  display: flex;
  align-items: baseline;
  gap: 8px;
  justify-content: center;
}

.price-value {
  font-size: 32px;
  font-weight: 700;
  color: #e53e3e;
  line-height: 1;
}

.price-unit {
  font-size: 18px;
  color: #666;
  font-weight: 500;
}

.card_content .price-value {
  color: #52c41a;
}

/* 数据源信息 */
.data-source {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 32px;
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  color: #999;
  flex-shrink: 0;
  gap:10px;
}

.data-source span:last-child {
  color: #20518A;
}

.table-wrapper {
  flex: 1;
  overflow: auto;
  width: 100%;
  max-height: 100vh;
}

.products-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid #f0f0f0;
}

.table-header-cell {
  padding: 20px 55px;
  text-align: left;
  font-weight: 600;
  color: #333;
  font-size: 35px;
}

.table-header-cell:last-child {
  text-align: right;
}

.table-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  gap: 12px;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid #f8f9ff;
  transition: background 0.2s;
}

.table-row:hover {
  background: #f8f9ff;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 4px 40px;
  color: #333;
  font-size: 45px;
  display: flex;
  align-items: center;
}

.table-cell:last-child {
  text-align: right;
  justify-content: flex-end;
}

.price-cell {
  font-weight: 700;
  color: #e53e3e !important;
  font-size: 45px;
}

/* Logo 样式 */
.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.section-logo {
  height: 50px;
  width: auto;
  object-fit: contain;
}
</style>

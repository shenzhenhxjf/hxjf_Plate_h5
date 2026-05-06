<!--<template>-->
<!--  <ScreenScale>-->
<!--    <div class="quote-container">-->
<!--      <div class="content">-->
<!--        <div class="gold_price">-->
<!--          <span class="price_value">{{ formatPrice(goldPrice) }}</span>-->
<!--          <span class="price_value_unit">元/克</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </ScreenScale>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import ScreenScale from '@/components/scaleContainer.vue'-->
<!--import { useMarketApi } from '@/services/marketApi'-->

<!--const goldPrice = ref<number>(0)-->

<!--useMarketApi((data) => {-->
<!--  const priceData = data?.huangjin?.prices?.huangjin9999-->
<!--  if (priceData) {-->
<!--    goldPrice.value = priceData.xiaoshou ?? priceData.huigou ?? 0-->
<!--  }-->
<!--})-->

<!--const formatPrice = (price: number) => {-->
<!--  if (!price) return '&#45;&#45;'-->
<!--  return price.toFixed(2)-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--.quote-container {-->
<!--  width: 1920px;-->
<!--  height: 1080px;-->
<!--  background-image: url("@/assets/hxj_quote/hxj_quote.png");-->
<!--  background-size: cover;-->
<!--  background-position: center center;-->
<!--  background-repeat: no-repeat;-->
<!--}-->

<!--.content {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  display: flex;-->
<!--  flex-direction: row;-->
<!--  align-items: flex-start;-->
<!--  justify-content: center;-->
<!--  padding-top: 300px;-->
<!--}-->

<!--.price_value {-->
<!--  font-weight: 600;-->
<!--  font-size: 240px;-->
<!--  color: #ffffff;-->
<!--}-->

<!--.price_value_unit {-->
<!--  font-weight: 400;-->
<!--  font-size: 80px;-->
<!--  color: #ffffff;-->
<!--}-->
<!--</style>-->

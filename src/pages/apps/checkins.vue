<script setup>
import FrontNavigation from '@/views/apps/homepage/FrontNavigation.vue'
import HomePageHeader from '@/views/apps/homepage/HomePageHeader.vue'
import CheckinsArrivalCard from '@/views/dashboards/checkins/CheckinsArrivalCard.vue'
import CheckinsLateRankingCard from '@/views/dashboards/checkins/CheckinsLateRankingCard.vue'
</script>

<template>
  <!-- ANCHOR - Header -->
  <HomePageHeader class="mb-5" />

  <VRow class="d-flex justify-center">
    <VCol
      cols="2"
      class="px-8"
    >
      <FrontNavigation />
    </VCol>
    <VCol cols="10">
      <VRow>
        <!-- 👉 Source Visits -->
        <VCol
          cols="12"
          sm="6"
          lg="6"
        >
          <CheckinsArrivalCard />
        </VCol>
        <VCol
          cols="12"
          sm="6"
          lg="6"
        >
          <CheckinsLateRankingCard />
        </VCol>
      </VRow>
    
      <!-- 👉 Source Visits -->
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>


<route lang="yaml">
meta:
  layout: blank
</route>

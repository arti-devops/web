<script setup>
import CheckinsArrivalCard from '@/views/dashboards/checkins/CheckinsArrivalCard.vue'

//import CheckinsLateRankingCard from '@/views/dashboards/checkins/CheckinsLateRankingCard.vue'
</script>

<template>
  <VRow class="">
    <!-- 👉 Source Visits -->
    <VCol
      cols="12"
      sm="6"
      lg="6"
    >
      <CheckinsArrivalCard />
    </VCol>

    <!-- 👉 Source Visits -->
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>

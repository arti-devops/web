<script setup>
import { bus } from '@/plugins/eventBus'
import { currentDateYmd, getFirstDateOfMonth, getLastDateOfMonth } from '@/plugins/helpers'
import CheckinsArrivalCard from '@/views/dashboards/checkins/CheckinsArrivalCard.vue'
import CheckinsLateRankingCard from '@/views/dashboards/checkins/CheckinsLateRankingCard.vue'
import { useCheckinStore } from '@/views/dashboards/checkins/useCheckinStore'

const logs = ref()
const checkinStore = useCheckinStore()
const selectedDate = ref(currentDateYmd())
const lastDateOfMonth = ref(currentDateYmd())

const statisticsHorizontal = ref()


function statisticsData(nbr, nba, txr, txa) {
  return [
    {
      title: 'NB Retards',
      color: 'success',
      icon: 'tabler-run',
      stats: String(nbr),
    },
    {
      title: 'NB Absances',
      color: 'error',
      icon: 'tabler-user-x',
      stats: String(nba),
    },
    {
      title: 'Tx des Absences',
      color: 'warning',
      icon: 'tabler-chart-pie-2',
      stats: String(txr).substring(0, 5) + '%',
    },
    {
      title: 'Tx des Retards',
      color: 'warning',
      icon: 'tabler-chart-pie-2',
      stats: String(txa).substring(0, 5) + '%',
    },
  ]
}

function fetchData(){
  checkinStore.fetchCheckin(getFirstDateOfMonth(selectedDate.value), 
    getLastDateOfMonth(selectedDate.value))
    .then(response => {
      logs.value = response.data

      const nbWDCounter = ref(0)
      const nbLogsCounter = ref(0)
      const nbLatesCounter = ref(0)
      const nbAbsencesCounter = ref(0)
      for (let i = 0; i < logs.value.length; i++) {
        nbLogsCounter.value += logs.value[i].log_month_count
        nbWDCounter.value += logs.value[i].log_month_working_days
        nbLatesCounter.value += logs.value[i].log_month_late_count
        nbAbsencesCounter.value += logs.value[i].log_month_absence_count
      }
      statisticsHorizontal.value = statisticsData(nbLatesCounter.value, 
        nbAbsencesCounter.value, 
        parseFloat((nbAbsencesCounter.value / nbWDCounter.value)).toFixed(4)*100,
        parseFloat((nbLatesCounter.value / nbWDCounter.value)).toFixed(4)*100)
    })
}

function listenerRC(d) {
  if(getLastDateOfMonth(d) != lastDateOfMonth.value){
    selectedDate.value = d
    lastDateOfMonth.value = getLastDateOfMonth(d)
    statisticsHorizontal.value = statisticsData(0, 0, 0, 0)
    fetchData()
  }
}

fetchData()
statisticsHorizontal.value = statisticsData()
bus.on(listenerRC)
</script>

<template>
  <VRow class="">
    <!-- 👉 Horizontal Cards -->
    <VCol
      v-for="statistics in statisticsHorizontal"
      :key="statistics.title"
      cols="12"
      sm="6"
      md="3"
    >
      <CardStatisticsHorizontal v-bind="statistics" />
    </VCol>
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

    <!-- 👉 Source Visits -->
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>

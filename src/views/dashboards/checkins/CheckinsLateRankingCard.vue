<script setup>
import { bus } from '@/plugins/eventBus'
import { currentDateYmd, getFirstDateOfMonth, getLastDateOfMonth, resolveLocalDateVariantMY, zerofill } from '@/plugins/helpers'
import { useCheckinStore } from '@/views/dashboards/checkins/useCheckinStore'
import { ref } from 'vue'


const log = ref()

const noDataToLoad = ref(false)
const dataIsLoading = ref(true)

const checkinStore = useCheckinStore()
const selectedDate = ref(currentDateYmd())
const lastDateOfMonth = ref(currentDateYmd())

const monthLateCount = ref(0)
const monthLateRate = ref(0)

const optionActions = [
  { title: "Actualiser",
    action: updateData, 
  },
  { title: "Télécharger",
    action: null, 
  },
]

function fetchData(){
  checkinStore.fetchCheckin(getFirstDateOfMonth(selectedDate.value), getLastDateOfMonth(selectedDate.value))
    .then(response => {
      log.value = response.data

      const logs = ref(response.data)

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
      monthLateCount.value = nbLatesCounter.value
      monthLateRate.value = parseFloat((nbLatesCounter.value / nbWDCounter.value)).toFixed(4)*100
      
      dataIsLoading.value = false
      noDataToLoad.value = false
    }).catch(error => {
      noDataToLoad.value = true
      dataIsLoading.value = false
      console.log("NO DATA")
    })
}

function resolveLateCountStatus(c) {
  if (c > 4) return "error"
  if (c > 0 && c <= 4) return "warning"
  
  return "secondary"
}

function updateData(){
  log.value = null
  fetchData()
}

function listenerRC(d) {
  if(getLastDateOfMonth(d) != lastDateOfMonth.value){
    selectedDate.value = d
    lastDateOfMonth.value = getLastDateOfMonth(d)
    updateData()
    noDataToLoad.value = true
    dataIsLoading.value = true
  }
}

const statisticsHorizontal = computed(() => [
  {
    title: 'NB Retards',
    color: 'warning',
    icon: 'tabler-run',
    stats: String(monthLateCount.value),
  },
  {
    title: 'Tx des Retards',
    color: 'success',
    icon: 'tabler-chart-pie',
    stats: String(monthLateRate.value).substring(0, 5) + '%',
  },
])

fetchData()
bus.on(listenerRC)
</script>

<template>
  <VRow>
    <!-- 👉 Horizontal Cards -->
    <VCol cols="12">
      <VRow>
        <VCol
          v-for="statistics in statisticsHorizontal"
          :key="statistics.title"
          cols="6"
          sm="6"
          md="6"
        >
          <CardStatisticsHorizontal v-bind="statistics" />
        </VCol>
      </VRow>
    </VCol>
    
    <!-- 👉 Data Cards -->
    <VCol cols="12">
      <VCard
        title="Nombre des retards"
        subtitle="Liste des employés selon les retards"
      >
        <template #append>
          <div class="mt-n4 me-n2">
            <span
              v-if="selectedDate"
              class="text-sm text-disabled capitalize-first-letter"
            >Mois de {{ resolveLocalDateVariantMY(selectedDate) }}</span>
            <VBtn
              icon
              color="default"
              size="x-small"
              variant="plain"
            >
              <VIcon
                size="22"
                icon="tabler-dots-vertical"
              />

              <VMenu activator="parent">
                <VList>
                  <VListItem
                    v-for="(item, index) in optionActions"
                    :key="index"
                    :value="index"
                    @click="item.action"
                  >
                    <VListItemTitle>{{ item.title }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </div>
        </template>

        <VCardText v-if="!dataIsLoading">
          <VList class="card-list">
            <VListItem
              v-for="(late, index) in log"
              :key="late.log_member_id"
            >
              <template #prepend>
                <VAvatar
                  variant="tonal"
                  color="secondary"
                  size="34"
                  rounded
                >
                  <span>{{ index + 1 }}</span>
                </VAvatar>
              </template>

              <VListItemTitle class="font-weight-medium">
                <RouterLink
                  :to="{ name: 'apps-user-view-id', params: { id: late.log_member_id} }"
                  class="font-weight-medium user-list-name"
                >
                  {{ late.log_member_name }} 
                </RouterLink>
              </VListItemTitle>
              <VListItemSubtitle class="opacity-100 text-disabled">
                {{ late.log_month_absence_count }} absence(s)
              </VListItemSubtitle>

              <template #append>
                <div class="d-flex align-center">
                  <VChip
                    label
                    :color="resolveLateCountStatus(late.log_month_late_count)"
                  >
                    {{ zerofill(late.log_month_late_count) }}
                  </VChip>
                </div>
              </template>
            </VListItem>
          </VList>
          <span v-if="noDataToLoad"> Aucune donnée disponible pour cette date</span>
        </VCardText>
        <VCardText
          v-else
          cols="12"
          sm="6"
          lg="6"
        >
          <VProgressCircular
            indeterminate
            color="primary"
          />
        </VCardText>
      </VCard>
    </VCol>
  </vrow>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 19px;
}

.capitalize-first-letter::first-letter {
  text-transform: capitalize;
}
</style>

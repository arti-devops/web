<script setup>
import { bus } from '@/plugins/eventBus'
import { currentDateYmd, getLastDateOfMonth, getWorkDaysInMonth, getFirstAndLastWorkDaysInMonth, resolveLocalDateVariantMY, zerofill } from '@/plugins/helpers'

import { useCheckinStore } from '@/views/dashboards/checkins/useCheckinStore'
import { ref } from 'vue'

const checkinStore = useCheckinStore()
let lateData = ref()
const lateDate = ref()
const selectedDate = ref(currentDateYmd())
const log = ref()

const workDays = getFirstAndLastWorkDaysInMonth(selectedDate)


// function fetchData(){
//   checkinStore.fetchCheckin(selectedDate.value).then(response => {
//     let late = response.data.late.late_occurence
//     if(Array.isArray(late) && late.length > 0){ lateData.value = late }
//     lateDate.value = response.data.late.late_date
//   })
// }
function fetchData(){
  checkinStore.fetchCheckin('2023-05-01', '2023-05-30').then(response => {
    log.value = response.data
    
  })
}

function resolveLateCountStatus(c) {
  if (c > 4) return "error"
  if (c > 0 && c <= 4) return "warning"
  
  return "secondary"
}

function updateData(){
  lateData.value = null
  fetchData()
}

const optionActions = [
  { title: "Actualiser",
    action: updateData, 
  },
  { title: "Télécharger",
    action: null, 
  },
]

fetchData()

function listenerRC(d) {
  if(getLastDateOfMonth(d) != lateDate.value){
    selectedDate.value = d
    updateData()
  }
  console.log(`selectedDate: ${selectedDate.value}`)
}
bus.on(listenerRC)
console.log(selectedDate.value)
</script>

<template>
  <VCard
    title="Nombre des retards"
    subtitle="Liste des employés selon les retards"
  >
    <template #append>
      <div class="mt-n4 me-n2">
        <span class="text-sm text-disabled capitalize-first-letter">Mois de {{ resolveLocalDateVariantMY(lateDate) }}</span>
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

    <VCardText v-if="log">
      <VList class="card-list">
        <VListItem
          v-for="(late, index) in log"
          :key="late.positionId"
        >
          <template #prepend>
            <VAvatar
              variant="tonal"
              :color="secondary"
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
            {{ getWorkDaysInMonth('2023-05-09') }} absences
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
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 19px;
}

.capitalize-first-letter::first-letter {
  text-transform: capitalize;
}
</style>

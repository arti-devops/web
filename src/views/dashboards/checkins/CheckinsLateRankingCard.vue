<script setup>
import { bus } from '@/plugins/eventBus'
import { currentDateYmd, getLastDateOfMonth, getWorkDaysInMonth, resolveLocalDateVariantMY, zerofill } from '@/plugins/helpers'

import { useCheckinStore } from '@/views/dashboards/checkins/useCheckinStore'
import { ref } from 'vue'

const checkinStore = useCheckinStore()
let lateData = ref()
const lateDate = ref()
const selectedDate = ref(currentDateYmd())

function fetchData(){
  checkinStore.fetchCheckin(selectedDate.value).then(response => {
    let late = response.data.late.late_occurence
    if(Array.isArray(late) && late.length > 0){ lateData.value = late }
    lateDate.value = response.data.late.late_date
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

    <VCardText v-if="lateData">
      <VList class="card-list">
        <VListItem
          v-for="(late, index) in lateData"
          :key="late.positionId"
        >
          <template #prepend>
            <VAvatar
              variant="tonal"
              :color="resolveLateCountStatus(late.monthLateCount)"
              size="34"
              rounded
            >
              <span>{{ index + 1 }}</span>
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            <RouterLink
              :to="{ name: 'apps-user-view-id', params: { id: late.positionId } }"
              class="font-weight-medium user-list-name"
            >
              {{ late.lastName }} {{ late.fisrtName }}
            </RouterLink>
          </VListItemTitle>
          <VListItemSubtitle class="opacity-100 text-disabled">
            {{ getWorkDaysInMonth(lateDate) - late.monthLogCount }} absences
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center">
              <VChip
                label
                :color="resolveLateCountStatus(late.monthLateCount)"
              >
                {{ zerofill(late.monthLateCount) }}
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

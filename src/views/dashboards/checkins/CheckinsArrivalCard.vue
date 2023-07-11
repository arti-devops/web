<script setup>
import { bus } from '@/plugins/eventBus'

import { currentDateYmd, fullTimeToHourMinuteFormatter, resolveLocalDateVariantLong } from '@/plugins/helpers'
import { avatarText } from '@core/utils/formatters'

import { useCheckinStore } from '@/views/dashboards/checkins/useCheckinStore'
import { ref } from 'vue'

const checkinStore = useCheckinStore()
let checkinData = ref()
const logDate = ref()
const lateCount = ref(0)
const logCount = ref(0)
const selectedDate = ref(currentDateYmd())
const dlog = ref()

function sortObjectsByCheckIn(array) {
  return array.sort((a, b) => {
    // Convert checkIn time strings to total seconds
    const timeA = a.checkIn.split(':').reduce((acc, val) => (acc * 60) + +val, 0)
    const timeB = b.checkIn.split(':').reduce((acc, val) => (acc * 60) + +val, 0)

    if (timeA > timeB) {
      return -1
    }
    if (timeA < timeB) {
      return 1
    }
    
    return 0
  })
}

function getFullName(checkin){
  return checkin.log_member_name
}

function fetchData(){
  checkinStore.fetchCheckin(selectedDate.value).then(response => {
    let checkin = response.data.checkins.checkins.checkins
    if(Array.isArray(checkin) && checkin.length > 0){
      checkinData.value = sortObjectsByCheckIn(checkin)
      let metaData = response.data.checkins.checkins.metadata
      lateCount.value = metaData.late_count
      logCount.value = metaData.log_count
    }else{
      lateCount.value = 0
      logCount.value = 0
    }
    logDate.value = response.data.checkins.log_date
  })}

function fetchDailyLog() {
  checkinStore.fetchDailyLog('2023-05-09').then(response => {
    dlog.value = response.data
  })
}

function updateDate(){
  checkinData = ref()
  fetchData()
}
  
const optionActions = [
  { title: "Actualiser",
    action: updateDate, 
  },
  { title: "Télécharger",
    action: null, 
  },
]

fetchData()

fetchDailyLog()

function listenerAC(d) {
  selectedDate.value = d
  updateDate()
  console.log(`selectedDate: ${selectedDate.value}`)
}
bus.on(listenerAC)
console.log(selectedDate.value)
</script>

<template>
  <VCard
    title="Pointages"
    :subtitle="lateCount + ' retards sur ' + logCount + ' présences'"
  >
    <template #append>
      <div class="mt-n4 me-n2">
        <span class="text-sm text-disabled">{{ resolveLocalDateVariantLong(logDate) }}</span>

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

    <VCardText v-if="dlog">
      <VList class="card-list">
        <VListItem
          v-for="logs in dlog"
          :key="logs.log_member_id"
        >
          <template #prepend>
            <VAvatar
              rounded
              size="34"
              :color="secondary"
              variant="tonal"
            >
              <span class="font-weight-semibold">
              
                {{ avatarText('P A') }}
              </span>
            </VAvatar>
          </template>

          <VListItemTitle class="font-weight-medium">
            <RouterLink
              :to="{ name: 'apps-user-view-id', params: { id: logs.log_member_id } }"
              class="font-weight-medium user-list-name"
            >
              {{ getFullName(logs) }}
            </RouterLink>
          </VListItemTitle>
          <VListItemSubtitle class="opacity-100 text-disabled">
            {{ logs.log_count }} pointage(s)
          </VListItemSubtitle>

          <template #append>
            <div class="d-flex align-center">
              <VChip 
                label
                :color="logs.log_time_islate ? 'error' : 'secondary'"
              >
                {{ fullTimeToHourMinuteFormatter(logs.log_time) }}
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
</style>

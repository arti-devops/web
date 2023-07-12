<script setup>
import { bus } from '@/plugins/eventBus'
import { currentDateYmd, fullTimeToHourMinuteFormatter } from '@/plugins/helpers'
import { useCheckinStore } from '@/views/dashboards/checkins/useCheckinStore'
import { avatarText } from '@core/utils/formatters'
import { ref } from 'vue'

const checkinStore = useCheckinStore()
const selectedDate = ref(currentDateYmd())
const dlog = ref()

function fetchDailyLog() {
  checkinStore.fetchDailyLog('2023-05-09').then(response => {
    dlog.value = response.data
  })
}

function updateDate(){
  checkinData = ref()
  fetchData()
}

function listenerAC(d) {
  selectedDate.value = d
  updateDate()
}

fetchDailyLog()
bus.on(listenerAC)
</script>

<template>
  <VCard
    :title="'Pointages du ' + selectedDate"
    :subtitle="0 + ' retards sur ' + 0 + ' présences'"
  >
    <template #append>
      <div class="mt-n4 me-n2">
        <AppDateTimePicker
          v-model="selectedDate"
          append-inner-icon="tabler-calendar"
          :config="{ dateFormat: 'd M Y',}"
          style="width: 157px;"
        />
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
              color="secondary"
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
              {{ logs.log_member_name }}
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

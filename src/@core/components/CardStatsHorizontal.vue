<script setup>
const props = defineProps({
  stats: {
    type: Object,
    required: true,
  },
})

const statisticsHorizontal = [
  {
    title: 'Statut',
    color: 'error',
    icon: 'tabler-cpu',
  },
  {
    title: 'Tâches',
    color: 'success',
    icon: ' tabler-users',
  },
  {
    title: 'FCFA',
    color: 'warning',
    icon: 'tabler-wallet',
  },
  {
    title: 'Progression',
    color: 'success',
    icon: 'tabler-progress-check',
  },
]
</script>

<template>
  <VRow>
    <VCol
      v-for="statistics in statisticsHorizontal"
      :key="statistics.title"
      cols="12"
      lg="3"
      sm="4"
      md="6"
    >
      <VCard>
        <VCardText class="d-flex align-center justify-space-between">
          <div>
            <div class="d-flex align-center flex-wrap">
              <span class="text-h6 font-weight-semibold">{{ statistics.stats }}</span>
            </div>
            <span class="text-body-2">{{ statistics.title }}</span>
          </div>

          <VAvatar
            :icon="statistics.icon"
            :color="statistics.color"
            :size="42"
            variant="tonal"
          />
        </VCardText>
      </vcard>
    </VCol>
  </VRow>
</template>

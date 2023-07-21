<script setup>
const statistics = [
  {
    title: 'Genre',
    stats: 'M',
    icon: 'tabler-chart-pie-2',
    color: 'primary',
  },
  {
    title: 'email',
    stats: 'test@arti.ci',
    icon: 'tabler-mail',
    color: 'info',
  },
  {
    title: 'Poste Actuel',
    stats: 'DSI',
    icon: 'tabler-shopping-cart',
    color: 'error',
  },
  {
    title: 'Service',
    stats: 'SDSI',
    icon: 'tabler-currency-dollar',
    color: 'success',
  },
  {
    title: 'Direction',
    stats: 'DSI',
    icon: 'tabler-currency-dollar',
    color: 'success',
  },
  {
    title: 'Type de contrat',
    stats: 'CDI',
    icon: 'tabler-currency-dollar',
    color: 'success',
  },
]
</script>

<template>
  <VCard title="ANGOUA Guy-Charles">
    <template #append>
      <span class="text-h5 text-disabled">@mat: 1234567</span>
    </template>

    <VCardText>
      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="12"
          md="2"
        >
          <div class="d-flex">
            <VAvatar
              :color="item.color"
              variant="tonal"
              size="42"
              class="me-3"
            >
              <VIcon :icon="item.icon" />
            </VAvatar>

            <div class="d-flex flex-column">
              <span class="text-h5 font-weight-medium">{{ item.stats }}</span>
              <span class="text-sm">
                {{ item.title }}
              </span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

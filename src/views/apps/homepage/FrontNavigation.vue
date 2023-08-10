<script setup>
const items = [
  {
    title: 'Pointages',
    value: 1,
    prependIcon: 'tabler-run',
    link: 'checkins',
    disable: true,
  },
  {
    title: 'Annuaire',
    value: 2,
    prependIcon: 'tabler-device-landline-phone',
    link: 'contactlist',
  },
  {
    title: 'Imprimantes',
    value: 3,
    prependIcon: 'tabler-printer',
    link: 'printerslist',
  },
  {
    title: 'Véhicules',
    value: 4,
    prependIcon: 'tabler-car',
    link: 'cars',
  },
  {
    title: 'Support IT',
    value: 5,
    prependIcon: 'tabler-tool',
    link: 'support',
  },
]
</script>

<template>
  <VBtn
    color="warning"
    variant="plain"
    to="homepage"
    prepend-icon="tabler-arrow-back"
    class="ml-4"
  >
    &nbsp; Acceuil
  </VBtn>
  <VDivider class="mt-2 mb-4" />
  <span>Navigation</span>
  <VList
    nav
    :lines="false"
    class="mt-1"
  >
    <VListItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
    >
      <VBtn
        :to="item.link"
        :prepend-icon="item.prependIcon"
        :disabled="item.disable"
        variant="plain"
      >
        {{ item.title }}
      </VBtn>
    </VListItem>
  </VList>
</template>

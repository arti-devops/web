<script setup>
const items = [
  {
    title: 'Absentéisme',
    value: 1,
    prependIcon: 'tabler-folder',
  },
  {
    title: 'Liste des Postes',
    value: 2,
    prependIcon: 'tabler-users',
  },
  {
    title: 'Starred',
    value: 3,
    prependIcon: 'tabler-star',
  },
]
</script>

<template>
  <VBtn
    color="secodary"
    variant="text"
    to="homepage"
  >
    <VIcon
      icon="tabler-arrow-back"
      size="25"
    />
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
      <template #prepend>
        <VIcon
          :icon="item.prependIcon"
          class="me-3"
        />
      </template>

      <VListItemTitle>
        {{ item.title }}
      </VListItemTitle>
    </VListItem>
  </VList>
</template>

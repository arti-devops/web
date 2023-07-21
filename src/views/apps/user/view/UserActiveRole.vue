<script setup>
const props = defineProps({
  data: {
    type: null,
    required: true,
  },
})

const items =  {
  date: '03/06/2023',
  role: "SOUS-DIRECTEUR",
  direction: "DSI",
  service: "SDSI",
  location: "Abidjan",
  category: "Cadre",

}
</script>

<template>
  <VCard class="mb-4 border-0">
    <VCardText>
      <VList class="card-list mt-2">
        <VListItem>
          <VListItemTitle>
            <h6 class="text-h6">
              Date de nomination:
              <span class="text-body-1">
                {{ items.date }}
              </span>
            </h6>
          </VListItemTitle>
        </VListItem>
        <VListItem>
          <VListItemTitle>
            <h6 class="text-h6">
              Poste:
              <span class="text-body-1">
                {{ items.role }}
              </span>
            </h6>
          </VListItemTitle>
        </VListItem>
        <VListItem>
          <VListItemTitle>
            <h6 class="text-h6">
              Direction:
              <span class="text-body-1">
                {{ items.direction }}
              </span>
            </h6>
          </VListItemTitle>
        </VListItem>
        <VListItem>
          <VListItemTitle>
            <h6 class="text-h6">
              Service:
              <span class="text-body-1">
                {{ items.service }}
              </span>
            </h6>
          </VListItemTitle>
        </VListItem>
        <VListItem>
          <VListItemTitle>
            <h6 class="text-h6">
              Catégorie:
              <span class="text-body-1">
                {{ items.category }}
              </span>
            </h6>
          </VListItemTitle>
        </VListItem>
        <VListItem>
          <VListItemTitle>
            <h6 class="text-h6">
              Localisation:
              <span class="text-body-1">
                {{ items.location }}
              </span>
            </h6>
          </VListItemTitle>
        </VListItem>
      </vlist>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 16px;
}
</style>

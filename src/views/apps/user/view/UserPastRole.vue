<script setup>
const postitions = [
  {
    position_date: "03/06/2023",
    position_role: "SOUS-DIRECTEUR",
    position_division: "DSI",
    position_subdivision: "SOUS-DIRECTION DU SYSTEME D'INFORMATION",
    position_location: "ABIDJAN",
    position_category: "Cadre",
  },
  {
    position_date: "01/03/2023",
    position_role: "Chef de Service",
    position_division: "DSI",
    position_subdivision: "SOUS-DIRECTION DU SYSTEME D'INFORMATION",
    position_location: "ABIDJAN",
    position_category: "Cadre",
  },
]

const titles = [
  'Date de nomination',
  'Poste',
  'Direction',
  'Service',
  'Catégorie',
  'Localisation',
]
</script>

<template>
  <VCard>
    <VCardItem>
      <template #prepend>
        <VIcon icon="tabler-timeline" />
      </template>

      <VCardTitle>Evolutions</VCardTitle>
    </VCardItem>

    <VCardText>
      <VTimeline
        density="compact"
        align="start"
        truncate-line="both"
        class="v-timeline-density-compact"
      >
        <VTimelineItem
          v-for="poste in postitions"
          :key="poste.position_role"
          dot-color="primary"
          size="x-small"
        >
          <div class="d-flex justify-space-between align-center flex-wrap">
            <span class="app-timeline-title">
              {{ poste.position_role }}
            </span>
            <span class="app-timeline-meta text-h6">Date de nomination: {{ poste.position_date }}</span>
          </div>
          <p class="app-timeline-text mb-2">
            Direction: {{ poste.position_division }}
          </p>
          <p class="app-timeline-text mb-2">
            Service: {{ poste.position_subdivision }}
          </p>
          <p class="app-timeline-text mb-2">
            Catégorie: {{ poste.position_category }}
          </p>
          <p class="app-timeline-text mb-2">
            Localisation: {{ poste.position_location }}
          </p>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>

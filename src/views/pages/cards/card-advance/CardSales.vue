<script setup>
const resolveProjectStatusVariant = stat => {
  if (stat === 'SCHEDULED')
    return { status: 'Non Demarré', color: 'secondary' }
  if (stat === 'TOTAL')
    return { status: 'initiés', color: 'primary' }
  if (stat === 'In progress')
    return { status: 'En Cours', color: 'info' }
  if (stat === 'STOPPED')
    return { status: 'Suspendu', color: 'warning' }
  if (stat === 'Failled')
    return { status: 'Echec', color: 'error' }
  if (stat === 'FINISHED')
    return { status: 'Terminé', color: 'success' }
}

const stats = {

  title: 'In progress',
  value: 'En Cours',
  color: 'success',
}
</script>

<template>
  <VCard title="Développement de l'application de suivi-évaluation">
    <template #append>
      <div class="mt-n4 me-n2">
        {{ stats.value }} 
      </div>
    </template>
    <VDivider />
    <VCardTexte class="ml-5">
      Application permettant de suivre les agents et projets de l'ARTI
      <VDivider vertical />
    </VCardTexte>
    <VCard class="ml-5 mt-5 mb-2 border-0">
      <span>
        Date de debut: 01/01/2023
      </span>
      <VDivider vertical />
      <span> Date de fin: 01/03/2023</span>
    </VCard>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 19px;
}
</style>

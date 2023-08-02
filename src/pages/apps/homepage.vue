<script setup>
import ApplicationZone from '@/views/apps/homepage/ApplicationZone.vue'
import HomePageHeader from '@/views/apps/homepage/HomePageHeader.vue'

// 👉 IMAGES
import phone from '@images/svg/phone.svg'
import printer from '@images/svg/printer.svg'
import run from '@images/svg/run.svg'

//import rocket from '@images/svg/rocket.svg'

const popularArticles = [
  {
    slug: 'getting-started',
    title: 'Pointages',
    img: run,
    link: '../dashboards/checkins',
    subtitle: 'Liste des arrviées journalières et mensuelles',
  },
  {
    slug: 'first-steps',
    title: 'Liste des Postes',
    img: phone,
    link: 'contactlist',
    subtitle: 'Consulter la liste des projets et activitées',
  },
  {
    slug: 'external-content',
    title: 'Equipements',
    img: printer,
    link: '',
    subtitle: 'Consulter la liste du matériel',
  },
]
</script>

<template>
  <!-- ANCHOR - Header -->
  <HomePageHeader class="mb-5" />
  
  <!-- ANCHOR - Boxes -->
  <VCard border="0">
    <!-- 👉 Popular Articles -->
    <VCardText class="py-12">
      <h5 class="text-h3 text-center my-6">
        Applications Disponibles
      </h5>

      <ApplicationZone :articles="popularArticles" />
    </VCardText>
  </VCard>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>

<script setup>
import ApplicationZone from '@/views/apps/homepage/ApplicationZone.vue'
import HomePageHeader from '@/views/apps/homepage/HomePageHeader.vue'

// 👉 IMAGES
import phone from '@images/svg/phone.svg'
import printer from '@images/svg/printer.svg'
import run from '@images/svg/run.svg'
import car from '@images/svg/car.svg'
import tools from '@images/svg/tools.svg'

//import rocket from '@images/svg/rocket.svg'

const popularArticles = [
  {
    slug: 'getting-started',
    title: 'Pointages',
    img: run,
    link: 'checkins',
    subtitle: 'Consulter pointages',
    disable: true,
  },
  {
    slug: 'first-steps',
    title: 'Annuaire',
    img: phone,
    link: 'contactlist',
    subtitle: 'Consulter postes téléphoniques',
  },
  {
    slug: 'external-content',
    title: 'Imprimantes',
    img: printer,
    link: 'printerslist',
    subtitle: 'Consulter imprimates',
  },
  {
    slug: 'external-content',
    title: 'Véhicules',
    img: car,
    link: 'cars',
    subtitle: ' Réservation de véhicule de pool',
  },
  {
    slug: 'external-content',
    title: 'Support IT',
    img: tools,
    link: 'support',
    subtitle: 'Demande de service',
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
  action: read
  subject: Auth
</route>

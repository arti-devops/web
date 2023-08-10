<script setup>
import FrontNavigation from '@/views/apps/homepage/FrontNavigation.vue'
import HomePageHeader from '@/views/apps/homepage/HomePageHeader.vue'
</script>

<template>
  <!-- ANCHOR - Header -->
  <HomePageHeader class="mb-5" />
  <VRow class="d-flex justify-center">
    <VCol
      cols="2"
      class="px-8"
    >
      <FrontNavigation />
    </VCol>
    <!-- ANCHOR - Page content -->
    <VCol cols="10">
      <VRow>
        <VCol cols="12">
          <iframe
            src="https://outlook.office365.com/owa/calendar/TeamsDSI@arti.ci/bookings/"
            width="100%"
            height="1130%"
            scrolling="no"
            style="border: 0;"
          />
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>

<route lang="yaml">
  meta:
    layout: blank
  </route>

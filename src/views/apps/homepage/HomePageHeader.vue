<script setup>
import axios from '@axios'
import LogoARTI from '@/views/apps/homepage/logo/ARTI.png'
import UserProfileHeaderBg from '@images/pages/user-profile-header-bg.png'
</script>

<template>
  <VCard style="border-radius: 0;">
    <VImg
      :src="UserProfileHeaderBg"
      min-height="30"
      max-height="40"
      cover
    />

    <VCardText class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
      <div class="d-flex h-0">
        <VAvatar
          rounded
          size="120"
          :image="LogoARTI"
          class="user-profile-avatar mx-auto"
        />
      </div>

      <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
        <h6 class="text-h6 text-center text-sm-start font-weight-medium mb-3">
          Bienvenue sur l'intranet de l'ARTI
        </h6>

        <div class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4">
          <div class="d-flex flex-wrap justify-center justify-sm-start flex-grow-1 gap-2">
            <span class="d-flex">
              <VIcon
                size="20"
                icon="tabler-color-swatch"
                class="me-1"
              />
              <span class="text-body-1">
                informations
              </span>
            </span>

            <span class="d-flex align-center">
              <VIcon
                size="20"
                icon="tabler-map-pin"
                class="me-2"
              />
              <span class="text-body-1">
                Données
              </span>
            </span>

            <span class="d-flex align-center">
              <VIcon
                size="20"
                icon="tabler-calendar"
                class="me-2"
              />
              <span class="text-body-1">
                Plannification
              </span>
            </span>
          </div>

          <VBtn prepend-icon="tabler-login">
            S'identifier
          </VBtn>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.user-profile-avatar {
  border: 5px solid rgb(var(--v-theme-surface));
  background-color: rgb(var(--v-theme-surface)) !important;
  inset-block-start: -3rem;

  .v-img__img {
    border-radius: 0.125rem;
  }
}
</style>

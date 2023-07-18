<script setup>
import axios from '@axios'

const profileHeaderData = ref()
const knowledge = ref(57)

const fetchHeaderData = () => {
  axios.get('/pages/profile-header').then(response => {
    profileHeaderData.value = response.data
  })
}

fetchHeaderData()
</script>

<template>
  <VCard v-if="profileHeaderData">
    <VCardText class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
      <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
        <h6 class="text-h6 text-center text-sm-start mb-3">
          {{ profileHeaderData?.fullName }}
        </h6>

        <VDivider class="mb-5" />
        <p class="text-sm">
          Here stands the project description, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis praesentium nesciunt aspernatur numquam ex reprehenderit architecto itaque fugit aperiam. Culpa ad aut quo, cumque libero pariatur doloremque dignissimos id quia.
        </p>
        <div class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4">
          <div class="d-flex flex-wrap justify-center justify-sm-start flex-grow-1 gap-2">
            <span class="d-flex mt-3">
              <VIcon
                size="20"
                icon="tabler-user"
                class="me-1"
              />
              <span class="text-body-1">
                Al-Karid CISSE
              </span>
            </span>

            <VDivider class="mt-2" />
            
            <!-- ANCHOR - Direction -->
            <VBtn
              color="secodary"
              variant="text"
            >
              <VIcon
                icon="tabler-building"
                size="25"
              />
              &nbsp; DSESP
            </VBtn>
                
            <!-- ANCHOR - Start Date -->
            <VDivider vertical />
            <VBtn
              color="secondary"
              variant="text"
            >
              <VIcon
                icon="tabler-calendar"
                size="25"
              />
              &nbsp; 28 Jan. 2023
            </VBtn>
            
            <!-- ANCHOR - End Date -->
            <VDivider vertical />
            <VBtn
              color="secondary"
              variant="text"
            >
              <VIcon
                icon="tabler-calendar-due"
                size="25"
              />
              &nbsp; 1 Sept. 2023
            </VBtn>
            
            <!-- ANCHOR - Budget -->
            <VDivider vertical />
            <VBtn
              color="secondary"
              variant="text"
            >
              <VIcon
                icon="tabler-moneybag"
                size="25"
              />
              &nbsp;1 500 000 FCFA
            </VBtn>
          </div>

          <!-- ANCHOR - Status desplay -->
          <VBtn
            color="error"
            variant="outlined"
          >
            <VAvatar
              color="error"
              size="x-small"
            />
            <span>
              &nbsp;&nbsp;&nbsp;Status
            </span>
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

<script setup>
import { resolveIfDueDateIsDue, resolveLocalDateVariantShort, resolveProjectStatusVariant, resolveXOFCurrencyFormat } from '@/plugins/helpers'
import { useProjectListStore } from '@/views/apps/project/useProjectListStore'

const projectListStore = useProjectListStore()
const project = projectListStore.project
</script>

<template>
  <VCard v-if="project">
    <VCardText class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
      <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
        <h6 class="text-h6 text-center text-sm-start mb-3">
          {{ project?.project_title }}
        </h6>

        <VDivider class="mb-5" />
        <p class="text-sm">
          {{ project.project_description }}
        </p>
        <div class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4">
          <div class="d-flex flex-wrap justify-center justify-sm-start flex-grow-1 gap-2">
            <span class="d-flex mt-3">
              <VIcon
                size="20"
                icon="tabler-user"
                class="me-1"
              />
              <span
                v-if="project.project_members.length > 0"
                class="text-body-1"
              >
                {{ project.project_members[0][0].project_member_name }}
              </span>
              <span
                v-else
                class="text-body-1"
              >
                Ce projet n'a pas de Manager
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
              &nbsp; {{ project.project_direction }}
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
              &nbsp; {{ resolveLocalDateVariantShort(project.project_start_date) }}
            </VBtn>
            
            <!-- ANCHOR - End Date -->
            <VDivider vertical />
            <VBtn
              :color="resolveIfDueDateIsDue(project.project_end_date)? 'error':'secondary'"
              variant="text"
            >
              <VIcon
                icon="tabler-calendar-due"
                size="25"
              />
              &nbsp; {{ resolveLocalDateVariantShort(project.project_end_date) }}
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
              &nbsp; {{ resolveXOFCurrencyFormat(project.project_budget) }}
            </VBtn>
          </div>

          <!-- ANCHOR - Status desplay -->
          <VBtn
            :color="resolveProjectStatusVariant(project.project_status).color"
            variant="outlined"
          >
            <VAvatar
              :color="resolveProjectStatusVariant(project.project_status).color"
              size="17"
            />
            <span>
              &nbsp; {{ resolveProjectStatusVariant(project.project_status).status_name }}
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

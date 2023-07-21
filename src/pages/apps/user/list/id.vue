<script setup>
import ProjectTabResources from '@/views/apps/project/views/ProjectTabResources.vue'
import UserActiveRole  from '@/views/apps/user/view/UserActiveRole.vue'
import UserPastRole from '@/views/apps/user/view/UserPastRole.vue'
import CardStatsTrans from '@/views/pages/cards/card-statistics/CardStatsTrans.vue'

const userTab = ref(null)
const isAddNewTaskVisible = ref(false)


const tabs = [
  {
    icon: 'tabler-user-check',
    title: 'Poste actuel',
  },
  {
    icon: 'tabler-apps',
    title: 'Postes occupés',
  },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <CardStatsTrans class="mb-5" />
    </VCol>
    
    <VCol
      cols="12"
      md="12"
      lg="12"
    >
      <VCard title="Détails du Profile">
        <VTabs
          v-model="userTab"
          grow
        >
          <VTab
            v-for="tab in tabs"
            :key="tab.icon"
          >
            <VIcon
              :size="18"
              :icon="tab.icon"
              class="me-1"
            />
            <span>{{ tab.title }}</span>
          </VTab>
        </VTabs>

        <VWindow
          v-model="userTab"
          class="mt-6"
          :touch="false"
        >
          <VWindowItem>
            <UserActiveRole />
          </VWindowItem>

          <VWindowItem>
            <UserPastRole />
          </VWindowItem>
        </VWindow>
      </VCard>
    </VCol>
  </VRow>
</template>

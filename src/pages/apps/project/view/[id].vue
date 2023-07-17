<script setup>
import ProjectProfileHeader from '@/views/apps/project/views/ProjectProfileHeader.vue'
import ProjectTabTasks from '@/views/apps/project/views/ProjectTabTasks.vue'
import { useUserListStore } from '@/views/apps/user/useUserListStore'

import UserTabSecurity from '@/views/apps/user/view/UserTabSecurity.vue'

const userListStore = useUserListStore()
const route = useRoute()
const userData = ref()
const userTab = ref(null)

const tabs = [
  {
    icon: 'tabler-user-check',
    title: 'Activités',
  },
  {
    icon: 'tabler-lock',
    title: 'Ressources',
  },
]

//userListStore.fetchUser(Number(route.params.id)).then(response => {
userListStore.fetchUser(Number(5)).then(response => {
  userData.value = response.data
})
</script>

<template>
  <VRow v-if="userData">
    <VCol cols="12">
      <ProjectProfileHeader class="mb-5" />
    </VCol>
    
    <VCol
      cols="12"
      md="12"
      lg="12"
    >
      <VTabs
        v-model="userTab"
        class="v-tabs-pill"
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
          <ProjectTabTasks />
        </VWindowItem>

        <VWindowItem>
          <UserTabSecurity />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>

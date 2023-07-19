<script setup>
import AddNewTask from '@/views/apps/project/list/AddNewTask.vue'
import { useProjectListStore } from '@/views/apps/project/useProjectListStore'
import ProjectProfileHeader from '@/views/apps/project/views/ProjectProfileHeader.vue'
import ProjectTabResources from '@/views/apps/project/views/ProjectTabResources.vue'
import ProjectTabTasks from '@/views/apps/project/views/ProjectTabTasks.vue'
import { useUserListStore } from '@/views/apps/user/useUserListStore'



const isAddNewTaskVisible = ref(false)


// Add and refetch Project
const addNewProject = async projectData => {
  console.log(projectData)

  await projectListStore.addProject(projectData)
  queryProjects()
}


const projectListStore = useProjectListStore()
const router = useRoute()

const userListStore = useUserListStore()

const userData = ref()
const userTab = ref(null)

const tabs = [
  {
    icon: 'tabler-user-check',
    title: 'Activités',
  },
  {
    icon: 'tabler-apps',
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
      <VCard
        title="Détails du Projet"
        subtitle="02 activités du projet sont actuellement en cours"
      >
        <template #append>
          <div class="mt-n4 me-n2">
            <VBtn 
              color="primary"
              @click="isAddNewTaskVisible = true"
            >
              <VIcon
                icon="tabler-subtask"
                size="25"
              />
              &nbsp;Nouvelle Tâche
            </VBtn>
          </div>
        </template>
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
            <ProjectTabTasks />
          </VWindowItem>

          <VWindowItem>
            <ProjectTabResources />
          </VWindowItem>
        </VWindow>
      </VCard>
      <AddNewTask
        v-model:isDrawerOpen="isAddNewTaskVisible"
        @project-data="addNewProject"
      />
    </VCol>
  </VRow>
</template>

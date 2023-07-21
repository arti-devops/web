<script setup>
import AddNewTaskDrawer from '@/views/apps/project/list/AddNewTaskDrawer.vue'
import { useProjectListStore } from '@/views/apps/project/useProjectListStore'
import ProjectProfileHeader from '@/views/apps/project/views/ProjectProfileHeader.vue'
import ProjectTabResources from '@/views/apps/project/views/ProjectTabResources.vue'
import ProjectTabTasks from '@/views/apps/project/views/ProjectTabTasks.vue'

const router = useRoute()
const userTab = ref(null)
const isAddNewTaskVisible = ref(false)
const projectListStore = useProjectListStore()

//👉 - Snackbar
const isSnackbarTopEndVisible = ref(false)

//SECTION - Dynamic Counts variables
const project_tasks_count = ref(0)
const project_members_count = ref(0)

//❗ - Was updated, potential source of error
project_tasks_count.value = projectListStore.project.project_tasks ? projectListStore.project.project_tasks.length : 0
project_members_count.value = projectListStore.project.project_members ? projectListStore.project.project_members.length : 0


const tabs = computed(() => [
  {
    icon: 'tabler-user-check',
    title: 'Activités',
    tasksCount: project_tasks_count.value,
  },
  {
    icon: 'tabler-apps',
    title: 'Ressources',
    tasksCount: project_members_count.value,
  },
])

// !SECTION - Dynamic Counts variables

// Add and refetch Project
const addNewTask = async projectData => {
  await projectListStore.addTask(projectData)
  await projectListStore.stateProject(projectData.project_id)
  project_tasks_count.value += 1
}

const aTaskWasDeleted= () =>{
  isSnackbarTopEndVisible.value = true
}

watchEffect(tabs)
</script>

<template>
  <VRow>
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
            <VBadge
              :content="tab.tasksCount"
              :offset-x="-18"
              :offset-y="6"
            >
              <span>{{ tab.title }}</span>
            </VBadge>
          </VTab>
        </VTabs>

        <VWindow
          v-model="userTab"
          class="mt-6"
          :touch="false"
        >
          <VWindowItem>
            <ProjectTabTasks 
              v-model:selectedProject="projectListStore.project"
              v-model:tasksCount="project_tasks_count"
              @delete-event="aTaskWasDeleted"
            />
          </VWindowItem>

          <VWindowItem>
            <ProjectTabResources />
          </VWindowItem>
        </VWindow>
      </VCard>
      <AddNewTaskDrawer
        v-model:isDrawerOpen="isAddNewTaskVisible"
        :project-id="router.params.id"
        @project-data="addNewTask"
      />
      <VSnackbar
        v-model="isSnackbarTopEndVisible"
        location="top end"
        color="error"
        :timeout="800"
      >
        La tâche a été supprimée
      </VSnackbar>
    </VCol>
  </VRow>
</template>

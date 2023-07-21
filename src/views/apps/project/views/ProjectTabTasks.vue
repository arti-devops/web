<script setup>
import { resolveLocalDateVariantShort, resolveProjectStatusVariant, resolveXOFCurrencyFormat } from '@/plugins/helpers'
import UpdateTaskDrawer from '@/views/apps/project/list/UpdateTaskDrawer.vue'
import { useProjectListStore } from '@/views/apps/project/useProjectListStore'
import { VDataTable } from 'vuetify/labs/VDataTable'

// 👉 - PROPS Definition

const props = defineProps({
  selectedProject: {
    type: Object,
    required: true,
  },
  tasksCount: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits([
  'update:tasksCount',
  'deleteEvent',
])

// 👉 - Page Variables

const tasks = ref(null)
const selectedProject = ref(null)
const projectListStore = useProjectListStore()

// 👉 - Table headers

const tasksHeader = [
  {
    title: '',
    key: 'data-table-expand',
  },
  {
    title: 'Activité',
    key: 'project_task_title',
    width: 120,
    maxWidth: 120,
  },
  {
    title: 'Responsable',
    key: 'project_task_manager',
  },
  {
    title: 'Début',
    key: 'project_task_start_date',
  },
  {
    title: 'Fin',
    key: 'project_task_end_date',
  },
  {
    title: 'Status',
    key: 'project_task_status',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

// 👉 - Drawer Variables

const taskToUpdate = ref(null)
const isUpdateDrawerVisible = ref(false)

// 👉 - CRUD Functions

const selectProject = () => {
  selectedProject.value = props.selectedProject
  taskToUpdate.value = props.selectedProject
  if(selectedProject.value.project_tasks){
    tasks.value = selectedProject.value.project_tasks.flat()
  }
}

const updateTaskTrigger = taskData => {
  const TaskToUpdate = {
    project_id: selectedProject.value.project_id,
    task: taskData,
  }

  taskToUpdate.value = TaskToUpdate
  isUpdateDrawerVisible.value = true
}

const updateTask = async projectData => {
  await projectListStore.updateTask(projectData)
  projectListStore.stateProject(projectData.project_id)
  selectProject()
}

const deleteTask = async taskId => {
  const projectData = {
    project_id: selectedProject.value.project_id,
    project_task_id: taskId,
  }

  await projectListStore.deleteTask(projectData)
  projectListStore.stateProject(projectData.project_id)
  selectProject()
  emit('update:tasksCount', props.tasksCount - 1)
  emit('deleteEvent')
}

watchEffect(selectProject)
</script>

<template>
  <VRow>
    <VCol
      v-if="tasks"
      cols="12"
    >
      <!-- 👉 Recent devices -->

      <VDataTable
        :items="tasks"
        :headers="tasksHeader"
        hide-default-footer
        expand-on-click
      >
        <!-- Expanded Row Data -->
        <template #expanded-row="slotProps">
          <tr class="v-data-table__tr">
            <td :colspan="tasksHeader.length">
              <p class="my-1">
                Activité: {{ slotProps.item.raw.project_task_title }}
              </p>
              <p class="my-1">
                Budget: {{ resolveXOFCurrencyFormat(slotProps.item.raw.project_task_budget ) }}
              </p>
              <p class="my-1">
                Description: {{ slotProps.item.raw.project_task_description }}
              </p>
            </td>
          </tr>
        </template>
        
        <template #item.project_task_title="{ item }">
          <div class="d-flex align-center gap-4">
            <span
              style="max-width: 200px;"
              class="text-truncate"
            >
              {{ item.raw.project_task_title }}
            </span>
          </div>
        </template>

        <template #item.project_task_start_date="{ item }">
          {{ resolveLocalDateVariantShort(item.raw.project_task_start_date) }}
        </template>

        <template #item.project_task_end_date="{ item }">
          {{ resolveLocalDateVariantShort(item.raw.project_task_end_date) }}
        </template>

        <template #item.project_task_budget="{ item }">
          {{ resolveXOFCurrencyFormat(item.raw.project_task_budget) }}
        </template>
        
        <template #item.project_task_status="{ item }">
          <!-- 👉 - Status desplay -->
          <VAvatar
            :color="resolveProjectStatusVariant(item.raw.project_task_status).color"
            size="17"
          />
          <span>
            &nbsp;{{ resolveProjectStatusVariant(item.raw.project_task_status).status_name }}
          </span>
        </template>
        
        
        <!-- 👉 Actions -->
        <template #item.actions="{ item }">
          <VBtn
            icon
            variant="text"
            size="small"
            color="medium-emphasis"
          >
            <VIcon
              size="24"
              icon="tabler-dots-vertical"
            />

            <VMenu activator="parent">
              <VList>
                <VListItem @click="updateTaskTrigger(item.raw)">
                  <template #prepend>
                    <VIcon icon="tabler-edit" />
                  </template>
                  <VListItemTitle>Modifier</VListItemTitle>
                </VListItem>
                <VListItem @click="deleteTask(item.raw.project_task_id)">
                  <template #prepend>
                    <VIcon icon="tabler-trash" />
                  </template>
                  <VListItemTitle>Supprimer</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>
        <!-- TODO Refactor this after vuetify provides proper solution for removing default footer -->
        <template #bottom />
      </VDataTable>
      <UpdateTaskDrawer
        v-model:isDrawerOpen="isUpdateDrawerVisible"
        :task-to-update="taskToUpdate"
        @task-data="updateTask"
      />
    </VCol>
  </VRow>
</template>

      

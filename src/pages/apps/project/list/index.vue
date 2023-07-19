<script setup>
import { paginationMeta } from '@/@fake-db/utils'
import { resolveLocalDateVariantShort, resolveXOFCurrencyFormat } from '@/plugins/helpers'
import AddNewProjectDrawer from '@/views/apps/project/list/AddNewProjectDrawer.vue'
import UpdateProjectDrawer from '@/views/apps/project/list/UpdateProjectDrawer.vue'
import { useProjectListStore } from '@/views/apps/project/useProjectListStore'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const projectListStore = useProjectListStore()

const selectedProject = projectListStore.project

// CRUD and Page Variables
const projects = ref([])
const totalProjects =ref(0)
const projectToUpdate = ref({})

// Filter Variables
const totalPage = ref(1)
const searchQuery = ref('')
const selectedStatus = ref('')
const selectedDirname = ref('')

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// Table Headers

const headers = [
  { title: '', 
    key: 'data-table-expand',
  },
  {
    title: 'Projet',
    key: 'project_title',
  },
  {
    title: 'Direction',
    key: 'project_direction',
  },
  {
    title: 'Début',
    key: 'project_start_date',
    align: 'end',
  },
  {
    title: 'Fin',
    key: 'project_end_date',
    align: 'end',
  },
  {
    title: 'Budget',
    key: 'project_budget',
    align: 'end',
  },
  {
    title: 'Statut',
    key: 'project_status',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

// Filters Values
const status = [
  {
    title: 'TERMINE',
    value: 'FINISHED',
  },
  {
    title: 'EN COURS',
    value: 'IN PROGRESS',
  },
  {
    title: 'NON DEMARRE',
    value: 'PENDING',
  },
  {
    title: 'SUSPENDU',
    value: 'ON HOLD',
  },
]

const directions = [
  {
    title: "DSESP",
    value: "DSESP",
  },
  {
    title: "DCSTI",
    value: "DCSTI",
  },
  {
    title: "DRRN",
    value: "DRRN",
  },
  {
    title: "DSI",
    value: "DSI",
  },
]

// Page functions
const queryProjects = () => {
  projectListStore.queryProjects({
    q: searchQuery.value,
    dirname: selectedDirname.value,
    status: selectedStatus.value,
    options: options.value,
  }).then( response => {
    projects.value = response.data.projects
    totalPage.value = response.data.totalPages
    totalProjects.value = response.data.totalProjects
    options.value.page = response.data.page
  }).catch(error => { console.log(error)})
}

const resolveStatusStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'finished')
    return { "color": "secondary", "status_name": "Terminé" }
  if (statLowerCase === 'failed')
    return { "color": "error", "status_name": "Echec" }
  if (statLowerCase === 'on hold')
    return { "color": "warning", "status_name": "Halt" }
  if (statLowerCase === 'in progress')
    return { "color": "success", "status_name": "En cours" }
  if (statLowerCase === 'pending')
    return { "color": "primary", "status_name": "En attente" }
  
  return { "color": "secondary", "status_name": "Statut inconnu" }
}

// CRUD Functions

const isUpdateDrawerVisible = ref(false)
const isAddNewProjectDrawerVisible = ref(false)

// Add and refetch Project
const addNewProject = async projectData => {
  console.log(projectData)

  await projectListStore.addProject(projectData)
  queryProjects()
}

// Update and refresh Project
const updateProjectTrigger = projectId => {
  projectListStore.fetchProject(projectId).then(response => {
    console.log(response.data)
    projectToUpdate.value = response.data
    isUpdateDrawerVisible.value = true
  })
}

const updateProject = async projectData => {
  await projectListStore.updateProject(projectData)
  queryProjects()
}

// Delete and refetch Project
const deleteProject = async id => {
  await projectListStore.deleteProject(id)
  queryProjects()
}

const selectProject = id => {
  projectListStore.stateProject(id)
  console.log(projectListStore.project)
}

// Functions Calls
watchEffect(queryProjects)
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard title="Liste des PROJETS">
          <!-- 👉 Filters -->
          <VDivider />

          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div class="me-3 d-flex gap-3">
              <AppSelect
                :model-value="options.itemsPerPage"
                :items="[
                  { value: 10, title: '10' },
                  { value: 25, title: '25' },
                  { value: 50, title: '50' },
                  { value: 100, title: '100' },
                ]"
                style="width: 6.25rem;"
                @update:model-value="options.itemsPerPage = parseInt($event, 10)"
              />
              
              <!-- 👉 Filter By Direction Name  -->
              <AppSelect
                v-model="selectedDirname"
                :items="directions"
                clearable
                clear-icon="tabler-x"
                model-value="Direction"
              />
                
              <!-- 👉 Filter By Direction Status  -->
              <AppSelect
                v-model="selectedStatus"
                :items="status"
                clearable
                clear-icon="tabler-x"
                model-value="Statut"
              />
            </div>
            <VSpacer />

            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <div style="inline-size: 10rem;">
                <AppTextField
                  v-model="searchQuery"
                  placeholder="Trouver un projet"
                  density="compact"
                />
              </div>

              <!-- 👉 Export button -->
              <VBtn
                disabled
                variant="tonal"
                color="secondary"
                prepend-icon="tabler-screen-share"
              >
                Exporter
              </VBtn>

              <!-- 👉 Add Project button -->
              <VBtn
                prepend-icon="tabler-text-plus"
                @click="isAddNewProjectDrawerVisible = true"
              >
                Nouveau Projet
              </VBtn>
            </div>
          </VCardText>

          <VDivider />

          <!-- SECTION datatable -->
          <VDataTableServer
            v-model:items-per-page="options.itemsPerPage"
            v-model:page="options.page"
            :items="projects"
            :items-length="totalProjects"
            :headers="headers"
            class="text-no-wrap"
            expand-on-click
            @update:options="options = $event"
          >
            <template #expanded-row="slotProps">
              <tr class="v-data-table__tr">
                <td :colspan="headers.length">
                  <p class="my-1">
                    Manager: {{ slotProps.item.raw.project_members[0][0].project_member_name }}
                  </p>
                  <p class="my-1">
                    Description: {{ slotProps.item.raw.project_description }}
                  </p>
                </td>
              </tr>
            </template>

            <!-- 👉 Project Title -->
            <template #item.project_title="{ item }">
              <div class="d-flex align-center gap-4">
                <VAvatar
                  size="30"
                  color="primary"
                  variant="tonal"
                >
                  <VIcon
                    size="20"
                    icon="tabler-archive"
                  />
                </VAvatar>
                <span class="text-capitalize font-weight-medium">{{ item.raw.project_title }}</span>
              </div>
            </template>

            <!-- 👉 Status -->
            <template #item.project_status="{ item }">
              <VAvatar
                :color="resolveStatusStatusVariant(item.raw.project_status).color"
                size="x-small"
              />
              <span>
                {{ "  " + resolveStatusStatusVariant(item.raw.project_status).status_name }}
              </span>
            </template>

            <!-- 👉 Start Date -->
            <template #item.project_start_date="{ item }">
              <span>
                {{ resolveLocalDateVariantShort(item.raw.project_start_date) }}
              </span>
            </template>

            <!-- 👉 End Date -->
            <template #item.project_end_date="{ item }">
              <span>
                {{ resolveLocalDateVariantShort(item.raw.project_end_date) }}
              </span>
            </template>

            <!-- 👉 Project Budget -->
            <template #item.project_budget="{ item }">
              <span style=" font-weight: lighter;text-align: end;">
                {{ resolveXOFCurrencyFormat(item.raw.project_budget) }}
              </span>
            </template>

            <!-- Actions -->
            <template #item.actions="{ item }">
              <VBtn
                icon
                variant="text"
                size="small"
                color="medium-emphasis"
                @click="selectProject(item.raw.project_id)"
              >
                <VIcon
                  size="24"
                  icon="tabler-dots-vertical"
                />

                <VMenu activator="parent">
                  <VList>
                    <VListItem>
                      <template #prepend>
                        <VIcon icon="tabler-subtask" />
                      </template>
                      <VListItemTitle>Nouvelle Tâche</VListItemTitle>
                    </VListItem>

                    <VDivider />
                    
                    <VListItem :to="{ name: 'apps-project-view-id', params: { id: item.raw.project_id } }">
                      <template #prepend>
                        <VIcon icon="tabler-file-arrow-right" />
                      </template>

                      <VListItemTitle>Voir</VListItemTitle>
                    </VListItem>

                    <VListItem @click="updateProjectTrigger(item.raw.project_id)">
                      <template #prepend>
                        <VIcon icon="tabler-edit" />
                      </template>
                      <VListItemTitle>Modifier</VListItemTitle>
                    </VListItem>

                    <VListItem @click="deleteProject(item.raw.project_id)">
                      <template #prepend>
                        <VIcon icon="tabler-trash" />
                      </template>
                      <VListItemTitle>Supprimer</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </VBtn>
            </template>

            <!-- pagination -->
            <template #bottom>
              <VDivider />
              <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
                <p class="text-sm text-disabled mb-0">
                  {{ paginationMeta(options, totalProjects) }}
                </p>

                <VPagination
                  v-model="options.page"
                  :length="Math.ceil(totalProjects / options.itemsPerPage)"
                  :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalProjects / options.itemsPerPage)"
                >
                  <template #prev="slotProps">
                    <VBtn
                      variant="tonal"
                      color="default"
                      v-bind="slotProps"
                      :icon="false"
                    >
                      Précédant
                    </VBtn>
                  </template>

                  <template #next="slotProps">
                    <VBtn
                      variant="tonal"
                      color="default"
                      v-bind="slotProps"
                      :icon="false"
                    >
                      Suivant
                    </VBtn>
                  </template>
                </VPagination>
              </div>
            </template>
          </VDataTableServer>
          <!-- SECTION -->
        </VCard>

        <!-- 👉 Place of the Drawers -->
        <AddNewProjectDrawer
          v-model:isDrawerOpen="isAddNewProjectDrawerVisible"
          @project-data="addNewProject"
        />
        <UpdateProjectDrawer
          v-model:isDrawerOpen="isUpdateDrawerVisible"
          :project-to-update="projectToUpdate"
          @project-data="updateProject"
        />
      </vcol>
    </vrow>
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}
</style>

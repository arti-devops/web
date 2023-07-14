<script setup>
import { paginationMeta } from '@/@fake-db/utils'
import { resolveLocalDateVariantShort } from '@/plugins/helpers'
import { useProjectListStore } from '@/views/apps/project/useProjectListStore'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const projectListStore = useProjectListStore()

// CRUD and Page Variables
const projects = ref([])
const totalProjects =ref(0)
const projectToUpdate = ref({})

const isUpdateDrawerVisible = ref(false)
const isAddNewUserDrawerVisible = ref(false)

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

const add_new_menu_items = [
  { title: 'Projet', value: 'Option 1' }, 
  { title: 'Activité', value: 'Option 2' },
]

const headers = [
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
  },
  {
    title: 'Fin',
    key: 'project_end_date',
  },
  {
    title: 'Status',
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
}

// Add and refetch Project
const addNewProject = async projectData => {
  await projectListStore.addProject(projectData)
  fetchProjects()
}

// Updqte and refresh Project
const updateProjectTrigger = projectId => {
  projectListStore.fetchProject(projectId).then(response => {
    console.log(response.data)
    projectToUpdate.value = response.data
    isUpdateDrawerVisible.value = true
  })
}

const updateProject = async projectData => {
  await projectListStore.updateProject(projectData)
  fetchProjects()
}

// Delete and refetch Project
const deleteProject = async id => {
  await projectListStore.deleteProject(id)
  fetchProjects()
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
          <VCardText>
            <VRow>
              <!-- 👉 Select Brand -->
              <VCol
                cols="12"
                sm="4"
              >
                <AppSelect
                  v-model="selectedDirname"
                  label="Filtrer par Direction"
                  :items="directions"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
              <!-- 👉 Select Status -->
              <VCol
                cols="12"
                sm="4"
              >
                <AppSelect
                  v-model="selectedStatus"
                  label="Filtrer par Status"
                  :items="status"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
            </VRow>
          </VCardText>

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
              <VMenu>
                <template #activator="{ props }">
                  <VBtn v-bind="props">
                    <VIcon icon="tabler-plus" />
                    Ajouter
                  </VBtn>
                </template>

                <VList :items="add_new_menu_items" />
              </VMenu>
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
            @update:options="options = $event"
          >
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

            <!-- Actions -->
            <template #item.actions="{ item }">
              <IconBtn
                disabled
                :to="{ name: 'apps-user-view-id', params: { id: item.raw.project_id } }"
              >
                <VIcon icon="tabler-file-arrow-right" />
              </IconBtn>
              <IconBtn>
                <VIcon
                  icon="tabler-edit"
                  @click="updateProjectTrigger(item.raw.project_id)"
                />
              </IconBtn>
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
                    <VListItem
                      disabled
                      :to="{ name: 'apps-user-view-id', params: { id: item.raw.project_id } }"
                    >
                      <template #prepend>
                        <VIcon icon="tabler-file-arrow-right" />
                      </template>

                      <VListItemTitle>View</VListItemTitle>
                    </VListItem>

                    <VListItem @click="updateProjectTrigger(item.raw.project_id)">
                      <template #prepend>
                        <VIcon icon="tabler-edit" />
                      </template>
                      <VListItemTitle>Edit</VListItemTitle>
                    </VListItem>

                    <VListItem @click="deleteProject(item.raw.project_id)">
                      <template #prepend>
                        <VIcon icon="tabler-trash" />
                      </template>
                      <VListItemTitle>Delete</VListItemTitle>
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

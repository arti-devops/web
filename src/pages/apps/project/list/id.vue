<script setup>
import { resolveProjectStatusVariantWithoutColor } from '@/plugins/helpers'
import { useProjectListStore } from '@/views/apps/project/useProjectListStore'
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import CrmRecent from '@/views/dashboards/crm/CrmRecent.vue'
import RessourceCard from '@/views/dashboards/crm/RessourceCard.vue'
import CardStatsTrans from '@/views/pages/cards/card-statistics/CardStatsTrans.vue'
import CardSales from '@/views/pages/cards/card-advance/CardSales.vue'



const userTab = ref(null)

const tabs = [
  {
    badge: '5',
    content: 'TÂCHES',
  },
  {
    badge: '1',
    content: 'RESSOURCES',
  },

  // {
  //   badge: '2',
  //   content: 'Item Three',
  // },
]

const statisticsHorizontal = [
  {
    title: 'CPU Usage',
    color: 'primary',
    icon: 'tabler-cpu',
    subtitle: 'ND',
  },
]


// // 👉 Fetching projects
// const fetchProjects = () => {
//   projectListStore.fetchProjects({
//     q: searchQuery.value,
//     ptype: selectedPType.value,
//     direction: selectedDirection.value,
//     status: selectedStatus.value,
//     perPage: rowPerPage.value,
//     currentPage: currentPage.value,
//   }).then(response => {
//     projects.value = response.data.tasks
//     totalPage.value = response.data.totalPage
//     totalProjects.value = response.data.totalTasks
//   }).catch(error => {
//     console.error(error)
//   })
// }

// watchEffect(fetchProjects)

// 👉 watching current page
// watchEffect(() => {
//   if (currentPage.value > totalPage.value)
//     currentPage.value = totalPage.value
// })

// projectListStore.fetchProjectStats().then(response => {
//   projectStats.value = response.data.stats
// })

// 👉 search filters
const directions = [
  {
    title: 'DAAF',
    value: 'DAAF',
  },
  {
    title: 'DCP',
    value: 'DCP',
  },
  {
    title: 'DCSTI',
    value: 'DCSTI',
  },
  {
    title: 'DGPECRP',
    value: 'DGPECRP',
  },
  {
    title: 'DMGP',
    value: 'GMGP',
  },
  {
    title: 'DSESP',
    value: 'DSESP',
  },
  {
    title: 'DSI',
    value: 'DSI',
  },
  {
    title: 'DRRN',
    value: 'DRRN',
  },
]

const status = [
  {
    title: 'Non demarré',
    value: 'SCHEDULED',
  },
  {
    title: 'Terminé',
    value: 'FINISHED',
  },
  {
    title: 'En cours',
    value: 'IN_PROGRESS',
  },
  {
    title: 'Suspendu',
    value: 'STOPPED',
  },
  {
    title: 'Echec',
    value: 'FAILED',
  },
]

const ptype = [
  {
    title: 'OS',
    value: 'OS',
  },
  {
    title: 'PROJET',
    value: 'PROJECT',
  },
  {
    title: 'ACTIVITE',
    value: 'ACTIVITY',
  },
]

const resolveActivityTypeColor = type => {
  if (type === 'ACTIVITY' || type === 'activity') {return 'primary'}
  else if (type === 'OS' || type === 'os'){ return 'warning'}

  return 'error'
}

const resolveProjectStatusVariant = stat => {
  if (stat === 'SCHEDULED')
    return { status: 'Non Demarré', color: 'secondary' }
  if (stat === 'TOTAL')
    return { status: 'initiés', color: 'primary' }
  if (stat === 'IN_PROGRESS')
    return { status: 'En Cours', color: 'info' }
  if (stat === 'STOPPED')
    return { status: 'Suspendu', color: 'warning' }
  if (stat === 'Failled')
    return { status: 'Echec', color: 'error' }
  if (stat === 'FINISHED')
    return { status: 'Terminé', color: 'success' }
}

const isAddNewUserDrawerVisible = ref(false)

// // 👉 watching current page
// watchEffect(() => {
//   if (currentPage.value > totalPage.value)
//     currentPage.value = totalPage.value
// })

// // 👉 Computing pagination data
// const paginationData = computed(() => {
//   const firstIndex = projects.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
//   const lastIndex = projects.value.length + (currentPage.value - 1) * rowPerPage.value
  
//   return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalProjects.value } entries`
// })

const addNewUser = userData => {
  userListStore.addUser(userData)

  // refetch User
  fetchProjects()
}



// 👉 List
const userListMeta = [
  {
    icon: 'tabler-3d-cube-sphere',
    color: 'primary',
    title: 'Projets',
    stats: '',
    percentage: +100,
    subtitle: 'Projets',
  },
  {
    icon: 'tabler-3d-cube-sphere',
    color: 'info',
    title: 'En cours',
    stats: '02',
    percentage: +16.66,
    subtitle: 'Projets ',
  },
  {
    icon: 'tabler-3d-cube-sphere',
    color: 'success',
    title: 'Terminés',
    stats: '02',
    percentage: +16.66,
    subtitle: 'Projets ',
  },
  {
    icon: 'tabler-3d-cube-sphere',
    color: 'secondary',
    title: 'Suspendu',
    stats: '04',
    percentage: -33,
    subtitle: 'Projets ',
  },
  {
    icon: 'tabler-3d-cube-sphere',
    color: 'secondary',
    title: 'Suspendu',
    stats: '04',
    percentage: -33,
    subtitle: 'Projets ',
  },
  {
    icon: 'tabler-3d-cube-sphere',
    color: 'secondary',
    title: 'Suspendu',
    stats: '04',
    percentage: -33,
    subtitle: 'Projets ',
  },
]
</script>

<template>
  <section>
    <VRow>
      <VCol>
        <CardSales />
      </VCol>
      <!-- 👉 Horizontal Cards -->
      <VCol
        v-for="statistics in statisticsHorizontal"
        :key="statistics.title"
        cols="12"
        sm="12"
        md="12"
      >
        <CardStatsHorizontal v-bind="statistics" />
      </VCol>
      <VCol
        v-for=" (meta, index ) in projectStats"
        :key="index"
        cols="12"
        sm="6"
        lg="3"
      >
        <VCard>
          <VCardText class="d-flex justify-space-between">
            <div>
              <span>{{ resolveProjectStatusVariantWithoutColor(meta.status) }}</span>
              <div class="d-flex align-center gap-2 my-1">
                <h6 class="text-h6">
                  {{ meta.count }}
                </h6>
                <span :class="meta.percent > 0 ? 'text-success' : 'text-error'">({{ meta.percent }}%)</span>
              </div>
              <span>{{ userListMeta[index].subtitle + " " + resolveProjectStatusVariant(meta.status).status }}</span>
            </div>

            <VAvatar
              rounded
              variant="tonal"
              :color="resolveProjectStatusVariant(meta.status).color"
              :icon="userListMeta[index].icon"
            />
          </VCardText>
        </VCard>
      </VCol>
      <VCol 
        cols="12"
        md="12"
        lg="12"
      >
        <VTabs
          v-model="userTab"
          grow
          class="v-tabs-pill"
        >
          <VTab
            v-for="tab in tabs"
            :key="tab.badge"
          >
            <VBadge
              :content="tab.badge"
              :offset-x="-12"
              :offset-y="-4"
            >
              <span>{{ tab.content }}</span>
            </VBadge>
          </VTab>
        </VTabs>

        <VWindow
          v-model="userTab"
          :touch="false"
        >
          <VWindowItem>
            <CrmRecent />
          </VWindowItem>

          <VWindowItem>
            <RessourceCard />
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>

    <!-- 👉 Add New User -->
    <AddNewUserDrawer
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    />
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
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>

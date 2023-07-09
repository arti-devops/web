<script setup>
import { paginationMeta } from '@/@fake-db/utils'
import AddNewDeviceDrawer from '@/views/apps/device/list/AddNewDeviceDrawer.vue'
import UpdateDeviceDrawer from '@/views/apps/device/list/UpdateDeviceDrawer.vue'
import { useDeviceListStore } from '@/views/apps/device/useDeviceListStore'
import avatar1 from '@images/avatars/avatar-1.png'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const deviceListStore = useDeviceListStore()

const totalPage = ref(1)
const searchQuery = ref('')
const selectedBrand = ref('')
const selectedStatus = ref('')
const deviceToUpdate = ref({})

const totalDevices = ref(0)
const devices = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// Headers
const headers = [
  {
    title: 'Type',
    key: 'device_type',
  },
  {
    title: 'Marque',
    key: 'device_brand_name',
  },
  {
    title: 'N Poste',
    key: 'device_post_number',
  },
  {
    title: 'Address IP',
    key: 'device_ip_address',
  },
  {
    title: 'Bénéficiaire',
    key: 'device_user',
  },
  {
    title: 'Status',
    key: 'device_status',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const fetchDevices = () => {
  deviceListStore.fetchDevices({
    q: searchQuery.value,
    status: selectedStatus.value,
    brand: selectedBrand.value,
    status: selectedStatus.value,
    options: options.value,
  }).then( response => {
    devices.value = response.data.devices
    totalPage.value = response.data.totalPages
    totalDevices.value = response.data.totalDevices
    options.value.page = response.data.page
  }).catch(error => { console.log(error)})
}

watchEffect(fetchDevices)

const brands = [
  {
    title: 'Yealink',
    value: 'yealink',
  },
  {
    title: 'Grandstream',
    value: 'grandstream',
  },
]

const status = [
  {
    title: 'Connecté',
    value: 'connected',
  },
  {
    title: 'Hors ligne',
    value: 'offline',
  },
]

const resolveDeviceTypeVariant = dtype => {
  const roleLowerCase = dtype.toLowerCase()
  if (roleLowerCase === 'telephone ip')
    return {
      color: 'primary',
      icon: 'tabler-device-landline-phone',
    }
  
  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}

const resolveStatusStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'connected')
    return 'success'
  if (statLowerCase === 'offline')
    return 'error'
  
  return 'primary'
}

const isAddNewUserDrawerVisible = ref(false)
const isUpdateDrawerVisible = ref(false)

// Add and refetch Device
const addNewDevice = async deviceData => {
  await deviceListStore.addDevice(deviceData)
  fetchDevices()
}

// Updqte and refresh Device
const updateDeviceTrigger = deviceId => {
  deviceListStore.fetchDevice(deviceId).then(response => {
    console.log(response.data)
    deviceToUpdate.value = response.data
    isUpdateDrawerVisible.value = true
  })
}

const updateDevice = async deviceData => {
  await deviceListStore.updateDevice(deviceData)
  fetchDevices()
}

// Delete and refetch Device
const deleteDevice = async id => {
  await deviceListStore.deleteDevice(id)
  fetchDevices()
}
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard title="Liste des téléphones IP">
          <!-- 👉 Filters -->
          <VCardText>
            <VRow>
              <!-- 👉 Select Brand -->
              <VCol
                cols="12"
                sm="4"
              >
                <AppSelect
                  v-model="selectedBrand"
                  label="Filtrer par Marque"
                  :items="brands"
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
                  placeholder="Trouver un nom"
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

              <!-- 👉 Add user button -->
              <VBtn
                prepend-icon="tabler-plus"
                @click="isAddNewUserDrawerVisible = true"
              >
                Nouveau Tél. IP
              </VBtn>
            </div>
          </VCardText>

          <VDivider />

          <!-- SECTION datatable -->
          <VDataTableServer
            v-model:items-per-page="options.itemsPerPage"
            v-model:page="options.page"
            :items="devices"
            :items-length="totalDevices"
            :headers="headers"
            class="text-no-wrap"
            @update:options="options = $event"
          >
            <!-- Device User -->
            <template #item.deviceUser="{ item }">
              <div class="d-flex align-center">
                <VAvatar
                  size="34"
                  :variant="!item.raw.avatar ? 'tonal' : undefined"
                  :color="!item.raw.avatar ? resolveDeviceTypeVariant(item.raw.device_status).color : undefined"
                  class="me-3"
                >
                  <VImg :src="avatar1" />
                </VAvatar>

                <div class="d-flex flex-column">
                  <h6 class="text-base">
                    <RouterLink
                      :to="{ name: 'apps-user-view-id', params: { id: item.raw.device_id } }"
                      class="font-weight-medium user-list-name"
                    >
                      {{ item.raw.device_user }}
                    </RouterLink>
                  </h6>
                </div>
              </div>
            </template>

            <!-- 👉 Device Type -->
            <template #item.device_type="{ item }">
              <div class="d-flex align-center gap-4">
                <VAvatar
                  :size="30"
                  :color="resolveDeviceTypeVariant(item.raw.device_type).color"
                  variant="tonal"
                >
                  <VIcon
                    :size="20"
                    :icon="resolveDeviceTypeVariant(item.raw.device_type).icon"
                  />
                </VAvatar>
                <span class="text-capitalize">{{ item.raw.device_type }}</span>
              </div>
            </template>

            <!-- Device Brand -->
            <template #item.device_brand_name="{ item }">
              <span class="text-capitalize font-weight-medium">{{ item.raw.device_brand_name }}</span>
            </template>

            <!-- 👉 Status -->
            <template #item.device_status="{ item }">
              <VChip
                :color="resolveStatusStatusVariant(item.raw.device_status)"
                size="small"
                label
                class="text-capitalize"
              >
                {{ item.raw.device_status }}
              </VChip>
            </template>

            <!-- Actions -->
            <template #item.actions="{ item }">
              <IconBtn
                disabled
                :to="{ name: 'apps-user-view-id', params: { id: item.raw.device_id } }"
              >
                <VIcon icon="tabler-file-arrow-right" />
              </IconBtn>
              <IconBtn>
                <VIcon
                  icon="tabler-edit"
                  @click="updateDeviceTrigger(item.raw.device_id)"
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
                      :to="{ name: 'apps-user-view-id', params: { id: item.raw.device_id } }"
                    >
                      <template #prepend>
                        <VIcon icon="tabler-file-arrow-right" />
                      </template>

                      <VListItemTitle>View</VListItemTitle>
                    </VListItem>

                    <VListItem @click="updateDeviceTrigger(item.raw.device_id)">
                      <template #prepend>
                        <VIcon icon="tabler-edit" />
                      </template>
                      <VListItemTitle>Edit</VListItemTitle>
                    </VListItem>

                    <VListItem @click="deleteDevice(item.raw.device_id)">
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
                  {{ paginationMeta(options, totalDevices) }}
                </p>

                <VPagination
                  v-model="options.page"
                  :length="Math.ceil(totalDevices / options.itemsPerPage)"
                  :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalDevices / options.itemsPerPage)"
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

        <!-- 👉 Add New User -->
        <AddNewDeviceDrawer
          v-model:isDrawerOpen="isAddNewUserDrawerVisible"
          @user-data="addNewDevice"
        />
        <UpdateDeviceDrawer
          v-model:isDrawerOpen="isUpdateDrawerVisible"
          :device-to-update="deviceToUpdate"
          @device-data="updateDevice"
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

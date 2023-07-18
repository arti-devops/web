<script setup>
import { paginationMeta } from '@/@fake-db/utils'
import AddNewComputerDrawer from '@/views/apps/device/list/AddNewComputerDrawer.vue'
import UpdateComputerDrawer from '@/views/apps/device/list/UpdateComputerDrawer.vue'
import { useDeviceListStore } from '@/views/apps/device/useDeviceListStore'
import avatar1 from '@images/avatars/avatar-1.png'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// SECTION Variables

const totalPage = ref(1)
const searchQuery = ref('')
const selectedType = ref('COMPUTER')
const selectedBrand = ref('')
const selectedStatus = ref('')
const deviceToUpdate = ref({})

const devices = ref([])
const totalDevices = ref(0)

const isUpdateDrawerVisible = ref(false)
const isAddNewUserDrawerVisible = ref(false)

const deviceListStore = useDeviceListStore()

// !SECTION

// SECTION List varialbes

//👉 - Table Headers
const headers = [
  { title: '', 
    key: 'data-table-expand',
  },
  {
    title: 'Ordinateur',
    key: 'device_name',
  },
  {
    title: 'Marque',
    key: 'device_brand_name',
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
    title: 'Statut',
    key: 'device_status',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const device_type = [
  {
    title: 'Tous',
    value: 'COMPUTER',
  },
  {
    title: 'PC',
    value: 'COMPUTER-LAPTOP',
  },
  {
    title: 'Bureau',
    value: 'COMPUTER-DESKTOP',
  },
]

const brands = [
  {
    title: 'HP',
    value: 'hp',
  },
  {
    title: 'Lenovo',
    value: 'lenovo',
  },
]

const status = [
  {
    title: 'Connecté',
    value: 'ONLINE',
  },
  {
    title: 'Hors ligne',
    value: 'OFFLINE',
  },
]

// !SECTION

// SECTION Functions and Resolvers

const fetchDevices = () => {
  deviceListStore.fetchDevices({
    q: searchQuery.value,
    dtype: selectedType.value? selectedType.value : "COMPUTER",
    status: selectedStatus.value,
    brand: selectedBrand.value,
    options: options.value,
  }).then( response => {
    devices.value = response.data.devices
    totalPage.value = response.data.totalPages
    totalDevices.value = response.data.totalDevices
    options.value.page = response.data.page
  }).catch(error => { console.log(error)})
}

const resolveDeviceTypeVariant = dtype => {
  const roleLowerCase = dtype.toLowerCase()
  if (roleLowerCase === 'computer-laptop')
    return {
      color: '#9C1874',
      icon: 'tabler-device-laptop',
    }
  if (roleLowerCase === 'computer-desktop')
    return {
      color: 'primary',
      icon: 'tabler-device-desktop',
    }
  
  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}

const resolveDeviceStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'online')
    return { status: 'En ligne', color: 'success' }
  if (statLowerCase === 'offline')
    return { status: 'Hors ligne', color: 'error' }
    
  return { status: 'Statut inconnu', color: 'secondary' }
}

const resolveDeviceConnexionModeVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'cable')
    return { status: 'Cable', color: 'primary' }
  if (statLowerCase === 'wifi')
    return { status: 'WIFI', color: 'error' }
  if (statLowerCase === 'usb')
    return { status: 'USB', color: 'warning' }
    
  return { status: 'Statut inconnu', color: 'secondary' }
}

// Add and refetch Device
const addNewDevice = async deviceData => {
  await deviceListStore.addDevice(deviceData)
  fetchDevices()
}

// Update and refresh Device
const updateDeviceTrigger = deviceId => {
  deviceListStore.fetchDevice(deviceId).then(response => {
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

//!SECTION

//SECTION Function calls
watchEffect(fetchDevices)

//!SECTION
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard title="Liste des ORDINATEURS">
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

              <!-- 👉 Select Computer type -->
              <AppSelect
                v-model="selectedType"
                :items="device_type"
                model-value="Type"
                clearable
                clear-icon="tabler-x"
              />

              <!-- 👉 Select Brand -->
              <AppSelect
                v-model="selectedBrand"
                :items="brands"
                model-value="Marque"
                clearable
                clear-icon="tabler-x"
              />

              <!-- 👉 Select Status -->
              <AppSelect
                v-model="selectedStatus"
                :items="status"
                model-value="Statut"
                clearable
                clear-icon="tabler-x"
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
                prepend-icon="tabler-square-rounded-plus-filled"
                @click="isAddNewUserDrawerVisible = true"
              >
                Ordinateur
              </VBtn>
            </div>
          </VCardText>
              
          <VDivider />
              
          <!-- 👉 Datatable -->
          <VDataTableServer
            v-model:items-per-page="options.itemsPerPage"
            v-model:page="options.page"
            :items="devices"
            :items-length="totalDevices"
            :headers="headers"
            class="text-no-wrap"
            expend-on-click
            @update:options="options = $event"
          >
            <template #expanded-row="slotProps">
              <tr class="v-data-table__tr">
                <td :colspan="headers.length">
                  <p class="my-1">
                    Modèle: {{ slotProps.item.raw.device_brand_model }}
                  </p>
                  <p class="my-1">
                    Numéro de serie: {{ slotProps.item.raw.device_serial_number }}
                  </p>
                </td>
              </tr>
              <tr class="v-data-table__tr">
                <td :colspan="headers.length">
                  <p class="my-1">
                    Login: {{ slotProps.item.raw.device_login }}
                  </p>
                  <p class="my-1">
                    Password: {{ slotProps.item.raw.device_password }}
                  </p>
                </td>
              </tr>
              <tr class="v-data-table__tr">
                <td :colspan="headers.length">
                  <p class="my-1">
                    Bénéficaire: {{ slotProps.item.raw.device_user }}
                  </p>
                </td>
              </tr>
            </template>
            
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

            <!-- 👉 Device Name -->
            <template #item.device_name="{ item }">
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
                <span class="text-capitalize">{{ item.raw.device_name }}</span>
              </div>
            </template>

            <!-- Device Brand -->
            <template #item.device_brand_name="{ item }">
              <span class="text-capitalize font-weight-medium">{{ item.raw.device_brand_name }}</span>
            </template>

            <!-- 👉 Connexion mode -->
            <template #item.device_connexion_mode="{ item }">
              <VChip
                :color="resolveDeviceConnexionModeVariant(item.raw.device_connexion_mode).color"
                size="small"
                label
                class="text-capitalize"
              >
                {{ resolveDeviceConnexionModeVariant(item.raw.device_connexion_mode).status }}
              </VChip>
            </template>

            <!-- 👉 Status -->
            <template #item.device_status="{ item }">
              <VChip
                :color="resolveDeviceStatusVariant(item.raw.device_status).color"
                size="small"
                label
                class="text-capitalize"
              >
                {{ resolveDeviceStatusVariant(item.raw.device_status).status }}
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

                      <VListItemTitle>Voir</VListItemTitle>
                    </VListItem>

                    <VListItem @click="updateDeviceTrigger(item.raw.device_id)">
                      <template #prepend>
                        <VIcon icon="tabler-edit" />
                      </template>
                      <VListItemTitle>Modifier</VListItemTitle>
                    </VListItem>

                    <VListItem @click="deleteDevice(item.raw.device_id)">
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

        <!-- 👉 Add New Computer -->
        <AddNewComputerDrawer
          v-model:isDrawerOpen="isAddNewUserDrawerVisible"
          @user-data="addNewDevice"
        />

        <!-- 👉 Update Computer -->
        <UpdateComputerDrawer
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

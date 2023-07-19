<script setup>
import { paginationMeta } from '@/@fake-db/utils'
import AddNewPrinterDrawer from '@/views/apps/device/list/AddNewPrinterDrawer.vue'
import UpdatePrinterDrawer from '@/views/apps/device/list/UpdatePrinterDrawer.vue'
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
  { title: '', 
    key: 'data-table-expand',
  },
  {
    title: 'Imprimante',
    key: 'device_hostname',
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
    title: 'Mode',
    key: 'device_connexion_mode',
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

const fetchDevices = () => {
  deviceListStore.fetchDevices({
    q: searchQuery.value,
    dtype: "IMPRIMANTE",
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

watchEffect(fetchDevices)

const brands = [
  {
    title: 'HP',
    value: 'hp',
  },
  {
    title: 'Canon',
    value: 'canon',
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

const resolveDeviceTypeVariant = dtype => {
  const roleLowerCase = dtype.toLowerCase()
  if (roleLowerCase === 'telephone ip')
    return {
      color: 'primary',
      icon: 'tabler-device-landline-phone',
    }
  if (roleLowerCase === 'imprimante')
    return {
      color: '#8B1874',
      icon: 'tabler-printer',
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
    return { status: 'WIFI', color: 'info' }
  if (statLowerCase === 'usb')
    return { status: 'USB', color: 'warning' }
    
  return { status: 'Statut inconnu', color: 'secondary' }
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

const d = async () => {
  if (devices.value.length > 0){
    
    const ipAddresses = Object.values(devices.value).map(obj => obj.device_ip_address).filter(ip => ip).map(ip => ({ ip }))

    console.log(ipAddresses)
    await deviceListStore.updateDevicesOnlineStatus(ipAddresses).then(response =>{
      const statusList = response.data
      for (const [key, value] of Object.entries(devices.value)) {
        if (key !== "device_id" && key !== "device_user") {
          const ipAddress = value.device_ip_address
          const statusItem = statusList.find(item => item.ip === ipAddress)
          const status = statusItem ? statusItem.status : "offline"

          value.device_status = status
        }
      }
      console.log(response.data)
    })
  }
  else{
    console.log(devices.value.length)
  }
}

watchEffect(d)
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard title="Liste des IMPRIMANTES">
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
                Imprimante
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
            expend-on-click
            @update:options="options = $event"
          >
            <template #expanded-row="slotProps">
              <tr class="v-data-table__tr">
                <td :colspan="headers.length">
                  <p class="my-1">
                    Nom: {{ slotProps.item.raw.device_name }}
                  </p>
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
            <template #item.device_hostname="{ item }">
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
                <span class="text-capitalize">{{ item.raw.device_hostname }}</span>
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

        <!-- 👉 Add New User -->
        <AddNewPrinterDrawer
          v-model:isDrawerOpen="isAddNewUserDrawerVisible"
          @user-data="addNewDevice"
        />
        <UpdatePrinterDrawer
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

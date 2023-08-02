<script setup>
import { paginationMeta } from '@/@fake-db/utils'
import { useDeviceListStore } from '@/views/apps/device/useDeviceListStore'
import FrontNavigation from '@/views/apps/homepage/FrontNavigation.vue'
import HomePageHeader from '@/views/apps/homepage/HomePageHeader.vue'
import avatar1 from '@images/avatars/avatar-1.png'
import { ref } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const deviceListStore = useDeviceListStore()

const totalPage = ref(1)
const searchQuery = ref('')
const selectedBrand = ref('')
const selectedStatus = ref('')

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
    title: 'Address IP',
    key: 'device_user',
  },
  {
    title: 'Marque',
    key: 'device_brand_name',
  },
  {
    title: 'Mode',
    key: 'device_connexion_mode',
  },
  {
    title: 'Statut',
    key: 'device_status',
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
          const levels = statusItem ? statusItem.levels : null

          value.device_status = status
          value.device_levels = levels

          // console.log("DEBUG")
          // console.log(value.device_levels)

        }
      }
      
    })
  }
  else{
    console.log(devices.value.length)
  }
}

watchEffect(d)
watchEffect(fetchDevices)
</script>

<template>
  <!-- ANCHOR - Header -->
  <HomePageHeader class="mb-5" />
  <VRow class="d-flex justify-center">
    <VCol
      cols="2"
      class="px-8"
    >
      <FrontNavigation />
    </VCol>
    <!-- ANCHOR - Page content -->
    <VCol cols="10">
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
              </div>

              <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
                <!-- 👉 Search  -->
                <div style="inline-size: 10rem;">
                  <AppTextField
                    v-model="searchQuery"
                    placeholder="Trouver un nom"
                    density="compact"
                  />
                </div>
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
                      Bénéficaire: {{ slotProps.item.raw.device_user }}
                    </p>
                  </td>
                </tr>
                <tr
                  v-if="slotProps.item.raw.device_levels"
                  class="v-data-table__tr"
                >
                  <td :colspan="headers.length">
                    <p class="my-1">
                      Niveau de Noir: {{ slotProps.item.raw.device_levels['black'] }} %
                    </p>
                    <p class="my-1">
                      Niveau de Jaune: {{ slotProps.item.raw.device_levels['yello'] }} %
                    </p>
                    <p class="my-1">
                      Niveau de Cyan: {{ slotProps.item.raw.device_levels['cyan'] }} %
                    </p>
                    <p class="my-1">
                      Niveau de Magenta: {{ slotProps.item.raw.device_levels['magneta'] }} %
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

              <!-- 👉 Device Hostname -->
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
                  <div class="d-flex flex-column">
                    <span class="text-capitalize">{{ item.raw.device_hostname }}</span>
                  </div>
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
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>

<route lang="yaml">
  meta:
    layout: blank
  </route>

<script setup>
import {
  requiredValidator,
} from '@validators'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  deviceToUpdate: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'deviceData',
  'deviceId',
])

const isFormValid = ref(false)
const refForm = ref()

const deviceUser = ref('Al-Karid')
const deviceName = ref('Al-Karid')
const deviceType = ref('Al-Karid')
const deviceBrandName = ref('Al-Karid')
const deviceBrandModel = ref('Al-Karid')
const deviceSerialNumber = ref('Al-Karid')
const deviceLogin = ref("DEFAULT")
const deviceStatus = ref("offline")
const deviceHostname = ref("IP-DSE")
const devicePassword = ref("DEFAULT")
const deviceIPAddress = ref("192.168.0.220")
const deviceConnexionMode = ref("CABLE")


// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('deviceData', {
        id: props.deviceToUpdate.device_id,
        device: {
          device_user: deviceUser.value,
          device_login: deviceLogin.value,
          device_status: deviceStatus.value,
          device_hostname: deviceHostname.value,
          device_password: devicePassword.value,
          device_ip_address: deviceIPAddress.value,
          device_connexion_mode: deviceConnexionMode.value,

          // Unchanged variables
          device_type: props.deviceToUpdate.device_type,
          device_name: props.deviceToUpdate.device_name,
          device_brand_name: props.deviceToUpdate.device_brand_name,
          device_brand_model: props.deviceToUpdate.device_brand_model,
          device_serial_number: props.deviceToUpdate.device_serial_number,
        } })
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const fillVaiables = () => {
  deviceUser.value = props.deviceToUpdate.device_user
  deviceLogin.value = props.deviceToUpdate.device_login
  deviceStatus.value = props.deviceToUpdate.device_status
  deviceHostname.value = props.deviceToUpdate.device_hostname
  devicePassword.value = props.deviceToUpdate.device_password
  deviceIPAddress.value = props.deviceToUpdate.device_ip_address
  deviceConnexionMode.value = props.deviceToUpdate.device_connexion_mode
}

watchEffect(fillVaiables)
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Mise à jour Imprimante"
      @cancel="closeNavigationDrawer"
    />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- 👉 Device User -->
              <VCol cols="12">
                <AppTextField
                  v-model="deviceUser"
                  label="Bénéficaire"
                  :rules="[requiredValidator]"
                />
              </VCol>

              <!-- 👉 IP Address -->
              <VCol cols="12">
                <AppTextField
                  v-model="deviceIPAddress"
                  label="Addresse IP"
                />
              </VCol>

              <!-- 👉 Status -->
              <VCol cols="12">
                <AppSelect
                  v-model="deviceStatus"
                  label="Statut actuel"
                  :rules="[requiredValidator]"
                  :items="[{ title: 'En ligne', value: 'ONLINE' }, { title: 'Hors ligne', value: 'OFFLINE' },]"
                />
              </VCol>

              <!-- 👉 Expension fields -->
              <VCol cols="12">
                <VExpansionPanels>
                  <VExpansionPanel>
                    <VExpansionPanelTitle>
                      Autre champs
                    </VExpansionPanelTitle>
                    <VExpansionPanelText>
                      <!-- 👉 Connexion Mode -->
                      <VCol cols="12">
                        <AppSelect
                          v-model="deviceConnexionMode"
                          :rules="[requiredValidator]"
                          label="Mode de connexion"
                          :items="[{title:'Cable',value:'CABLE'},{title:'WIFI',value:'WIFI'},{title:'USB',value:'USB'},]"
                        />
                      </VCol>
                      
                      <!-- 👉 Hostname -->
                      <VCol cols="12">
                        <AppTextField
                          v-model="deviceHostname"
                          label="Hostname"
                        />
                      </VCol>

                      <!-- 👉 Login -->
                      <VCol cols="12">
                        <AppTextField
                          v-model="deviceLogin"
                          label="Login"
                        />
                      </VCol>

                      <!-- 👉 Password -->
                      <VCol cols="12">
                        <AppTextField
                          v-model="devicePassword"
                          label="Password"
                        />
                      </VCol>
                    </VExpansionPanelText>
                  </VExpansionPanel>
                </VExpansionPanels>
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  color="warning"
                  type="submit"
                  class="me-3"
                >
                  Modifier
                </VBtn>
                <VBtn
                  type="reset"
                  variant="tonal"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

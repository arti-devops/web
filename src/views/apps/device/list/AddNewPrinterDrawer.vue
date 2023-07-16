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
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'userData',
])

const isFormValid = ref(false)
const refForm = ref()

const deviceName = ref('Color LaserJet Pro')
const deviceUser = ref('Al-Karid')
const deviceType = ref('IMPRIMANTE')
const deviceLogin = ref("DEFAULT")
const deviceStatus = ref("OFFLINE")
const deviceHostname = ref("IP-DSE")
const devicePassword = ref("DEFAULT")
const deviceIPAddress = ref("192.168.0.220")
const deviceBrandName = ref('HP')
const deviceBrandModel = ref('MFP183fw')
const deviceSerialNumber = ref("VNC0015KL")
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
      emit('userData', {
        device_user: deviceUser.value,
        device_type: deviceType.value,
        device_name: deviceName.value,
        device_login: deviceLogin.value,
        device_status: deviceStatus.value,
        device_hostname: deviceHostname.value,
        device_password: devicePassword.value,
        device_ip_address: deviceIPAddress.value,
        device_brand_name: deviceBrandName.value,
        device_brand_model: deviceBrandModel.value,
        device_serial_number: deviceSerialNumber.value,
        device_connexion_mode: deviceConnexionMode.value,
      })
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
      title="Nouvel Imprimante"
      @cancel="closeNavigationDrawer"
    />

    <VDivider />

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
              <!-- 👉 Device Type -->
              <VCol cols="12">
                <AppSelect
                  v-model="deviceType"
                  :rules="[requiredValidator]"
                  model-value="IMPRIMANTE"
                  label="Type de l'équipement"
                  :items="['IMPRIMANTE']"
                  disabled
                />
              </VCol>
              
              <!-- 👉 Device Name -->
              <VCol cols="12">
                <AppTextField
                  v-model="deviceName"
                  :rules="[requiredValidator]"
                  label="Mom de l'imprimante"
                />
              </VCol>

              <!-- 👉 Device Serial Number -->
              <VCol cols="12">
                <AppTextField
                  v-model="deviceSerialNumber"
                  :rules="[requiredValidator]"
                  label="Numéro de série"
                />
              </VCol>

              <!-- 👉 Device Brand Name -->
              <VCol cols="12">
                <AppSelect
                  v-model="deviceBrandName"
                  :rules="[requiredValidator]"
                  label="Marque"
                  :items="['HP','Canon','Xerox']"
                />
              </VCol>

              <!-- 👉 Model -->
              <VCol cols="12">
                <AppTextField
                  v-model="deviceBrandModel"
                  :rules="[requiredValidator]"
                  label="Modèle"
                />
              </VCol>

              <!-- 👉 IP Address -->
              <VCol cols="12">
                <AppTextField
                  v-model="deviceIPAddress"
                  label="Addresse IP"
                />
              </VCol>

              <!-- 👉 Connexion Mode -->
              <VCol cols="12">
                <AppSelect
                  v-model="deviceConnexionMode"
                  label="Mode de connexion"
                  :items="[{title:'Cable',value:'ETHERNET'},{title:'WIFI',value:'WIFI'},{title:'USB',value:'USB'},]"
                />
              </VCol>

              <!-- 👉 Device User -->
              <VCol cols="12">
                <AppTextField
                  v-model="deviceUser"
                  label="Bénéficaire"
                  :rules="[requiredValidator]"
                />
              </VCol>

              <!-- 👉 Status -->
              <VCol cols="12">
                <AppSelect
                  v-model="deviceStatus"
                  label="Statut actuel"
                  :rules="[requiredValidator]"
                  :items="[{ title: 'En line', value: 'ONLINE' },{ title: 'Hors ligne', value: 'OFFLINE' },]"
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
                  type="submit"
                  class="me-3"
                >
                  Valider
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

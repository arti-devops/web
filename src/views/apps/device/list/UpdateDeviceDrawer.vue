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
const deviceType = ref('TELEPHONE IP')
const deviceBrandName = ref('Yealink')
const deviceBrandModel = ref('T33G')
const devicePostNumber = ref('711')
const deviceIPAddress = ref("192.168.0.220")
const deviceStatus = ref("offline")
const deviceSerialNumber = ref("VNC0015KL")

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
          device_type: deviceType.value,
          device_brand_name: deviceBrandName.value,
          device_brand_model: deviceBrandModel.value,
          device_post_number: devicePostNumber.value,
          device_ip_address: deviceIPAddress.value,
          device_status: deviceStatus.value,
          device_serial_number: deviceSerialNumber.value,
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
  deviceType.value = props.deviceToUpdate.device_type
  deviceSerialNumber.value = props.deviceToUpdate.device_serial_number
  deviceBrandName.value = props.deviceToUpdate.device_brand_name
  deviceBrandModel.value = props.deviceToUpdate.device_brand_model
  devicePostNumber.value = props.deviceToUpdate.device_post_number
  deviceIPAddress.value = props.deviceToUpdate.device_ip_address
  deviceUser.value = props.deviceToUpdate.device_user
  deviceStatus.value = props.deviceToUpdate.device_status
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
      title="Mise à jour Téléphone"
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
              
              <!-- 👉 Dial Post Number -->
              <VCol cols="12">
                <AppTextField
                  v-model="devicePostNumber"
                  :rules="[requiredValidator]"
                  label="Numéro de poste"
                />
              </VCol>

              <!-- 👉 IP Address -->
              <VCol cols="12">
                <AppTextField
                  v-model="deviceIPAddress"
                  :rules="[requiredValidator]"
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

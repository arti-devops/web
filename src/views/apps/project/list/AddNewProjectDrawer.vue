<script setup>
import AppDateTimePicker from '@/@core/components/app-form-elements/AppDateTimePicker.vue'
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
  'projectData',
])

const projectTitle = ref("Simple Project")
const projectSDate = ref("2023-05-01")
const projectEDate = ref("2023-09-07")
const projectStatus = ref("IN PROGRESS")
const projectBudget = ref(1500000)
const projectManager = ref("ID-CISSE")
const projectMembers = ref(['ID-KANDE'])
const projectStratOb = ref("OBS-001")
const projectDirection = ref("DSESP")
const projectDescription = ref("Advanced Web App")

const isFormValid = ref(false)
const refForm = ref()

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
      emit('projectData', {
        project_title: projectTitle.value,
        project_budget: projectBudget.value,
        project_status: projectStatus.value,
        project_manager: projectManager.value,
        project_stratob: projectStratOb.value,
        project_members: projectMembers.value,
        project_end_date: projectEDate.value,
        project_direction: projectDirection.value,
        project_start_date: projectSDate.value,
        project_description: projectDescription.value,
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
      title="Nouveau Projet"
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
              <!-- 👉 Project Title -->
              <VCol cols="12">
                <AppTextField
                  v-model="projectTitle"
                  :rules="[requiredValidator]"
                  label="Titre"
                />
              </VCol>

              <!-- 👉 Project Start Date -->
              <VCol cols="12">
                <AppDateTimePicker
                  v-model="projectSDate"
                  :rules="[requiredValidator]"
                  label="Date de début"
                />
              </VCol>

              <!-- 👉 Project End Date -->
              <VCol cols="12">
                <AppDateTimePicker
                  v-model="projectEDate"
                  :rules="[requiredValidator]"
                  label="Date de fin"
                />
              </VCol>

              <!-- 👉 Project Manager -->
              <VCol cols="12">
                <AppSelect
                  v-model="projectManager"
                  :rules="[requiredValidator]"
                  label="Responsable du projet"
                  :items="[{title:'CISSE Alassane', value:'OBS-001'},
                           {title:'DJIRE Lamine', value:'OBS-002'}]"
                />
              </VCol>

              <!-- 👉 Project Budget -->
              <VCol cols="12">
                <AppTextField
                  v-model="projectBudget"
                  :rules="[requiredValidator]"
                  label="Budget alloué"
                />
              </VCol>

              <!-- 👉 Project Strategic Objective -->
              <VCol cols="12">
                <AppSelect
                  v-model="projectStratOb"
                  :rules="[requiredValidator]"
                  label="Objectif stratétique"
                  :items="['OBS-001','OBS-002']"
                />
              </VCol>

              <!-- 👉 Project Status -->
              <VCol cols="12">
                <AppSelect
                  v-model="projectStatus"
                  :rules="[requiredValidator]"
                  label="Status"
                  :items="[{title:'Non démarré',value:'SHCEDULED'},
                           {title:'En cours', value:'IN PROGRESS'},
                           {title:'Terminé', value:'FINISHED'},
                           {title:'Suspendu', value:'SUSPENDED'},
                           {title:'Echec', value:'FAILED'}]"
                />
              </VCol>

              <!-- 👉 Project Direction -->
              <VCol cols="12">
                <AppSelect
                  v-model="projectDirection"
                  :rules="[requiredValidator]"
                  label="Direction à charge"
                  :items="['DSESP','DRRN','DCSTI','DSI','DCP','DAAF','DMGP','DGPECRP']"
                />
              </VCol>
                
              <!-- 👉 Project Members -->
              <VCol cols="12">
                <AppAutocomplete
                  v-model="projectMembers"
                  label="Participants"
                  :items="[{title:'KOUADIO Edmon',value:'ID-KOUADIO'},
                           {title:'GNAGNE Mel',value:'ID-GNAGNE'},
                           {title:'SEYNOU Aicha',value:'ID-SEYNOU'},
                           {title:'DRO Chris',value:'ID-DRO'},
                           {title:'KANDE Daouda',value:'ID-KANDE'}]"
                  chips
                  multiple
                />
              </VCol>

              <!-- 👉 Project Description -->
              <VCol cols="12">
                <AppTextField
                  v-model="projectDescription"
                  label="Description"
                />
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

<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  projectToUpdate: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'projectData',
  'projectId',
])

const isFormValid = ref(false)
const refForm = ref()

//const projectTitle = ref("Simple Project")
//const projectSDate = ref("2023-05-01")
const projectEDate = ref("2023-05-01")
const projectStatus = ref("IN PROGRESS")

//const projectManager = ref("ID-CISSE")
//const projectMembers = ref(['ID-KANDE'])
//const projectStratOb = ref("OBS-001")
//const projectDirection = ref("DSESP")
//const projectDescription = ref("Advanced Web App")

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
        id: props.projectToUpdate.project_id,
        project: {
          project_status: projectStatus.value,
          project_end_date: projectEDate.value,
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

const resolveProjectStatusString = stat => {
  try {
    const status = stat.toLowerCase()
    if(status === "pending") return 'Non démarré'
    if(status === "on hold") return 'Suspendu'
    if(status === "in progress") return 'En cours'
    if(status === "failed") return 'Echec'
    if(status === "finished") return 'Terminé'
    
    return 'Statut inconnu'
    
  } catch (error) {
    //console.log(error)
  }
}

const fillVaiables = () => {
  if (props.projectToUpdate.project_end_date){
    projectEDate.value = props.projectToUpdate.project_end_date
  }else{
    projectEDate.value = new Date()
  }
  projectStatus.value = props.projectToUpdate.project_status
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
      title="Mise à jour Projet"
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
              <!-- 👉 Project Status -->
              <VCol cols="12">
                <AppSelect
                  v-model="projectStatus"
                  label="Statut"
                  :items="[{title:'Non démarré',value:'PENDING'},
                           {title:'En cours', value:'IN PROGRESS'},
                           {title:'Terminé', value:'FINISHED'},
                           {title:'Suspendu', value:'ON HOLD'},
                           {title:'Echec', value:'FAILED'}]"
                />
              </VCol>
              
              <!-- 👉 Project End Date -->
              <VCol cols="12">
                <AppDateTimePicker
                  v-model="projectEDate"
                  label="Date de fin"
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

              <VDivider />
              <VSpacer />
              <VList :items="[props.projectToUpdate.project_title]" />
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

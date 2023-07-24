<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  taskToUpdate: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'taskData',
])

const refForm = ref()
const taskToUpdate = ref({})
const isFormValid = ref(false)

const projectEDate = ref("2023-05-01")
const projectStatus = ref("IN PROGRESS")

// SECTION - Functions

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {

  // 👉 - Assign new variables to send
  taskToUpdate.value.project_task_status = projectStatus.value
  taskToUpdate.value.project_task_end_date = projectEDate.value

  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('taskData', {
        project_id: props.taskToUpdate.project_id,
        task: taskToUpdate.value })
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

// 👉 Fill variables to update
const fillVaiables = () => {
  taskToUpdate.value = props.taskToUpdate.task
  if(taskToUpdate.value){
    if (taskToUpdate.value.project_task_end_date){
      projectEDate.value = taskToUpdate.value.project_task_end_date
    }else{
      projectEDate.value = new Date()
    }
    projectStatus.value = taskToUpdate.value.project_task_status
  }
}

// !SECTION - Functions

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
      title="Mise à jour Activités"
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
                  :items="[{title:'Non démarré',value:'PENDING'|'SCHEDULED'},
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
              <VList :items="[props.taskToUpdate.project_task_title]" />
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

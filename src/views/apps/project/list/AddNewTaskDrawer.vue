<script setup>
import AppDateTimePicker from '@/@core/components/app-form-elements/AppDateTimePicker.vue'
import { useProjectListStore } from '@/views/apps/project/useProjectListStore'
import { requiredValidator } from '@validators'
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

const projectListStore = useProjectListStore()

const projectTitle = ref("Simple Project Task")
const projectSDate = ref("2023-05-01")
const projectEDate = ref("2023-09-07")
const projectStatus = ref("IN PROGRESS")
const projectBudget = ref(300000)
const projectManager = ref()
const projectDescription = ref("Advanced Web App, Task of adding subtasks. Type here to describe your task")

const membersList = ref([])
let simpleMembersList = []

//❗ - Reloading the Project View Page can break the App here.
const projectId = projectListStore.project.project_id

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
        project_id: projectId,
        task: {
          project_task_id: "",
          project_task_title: projectTitle.value,
          project_task_budget: projectBudget.value,
          project_task_status: projectStatus.value,
          project_task_manager: projectManager.value,
          project_task_end_date: projectEDate.value,
          project_task_start_date: projectSDate.value,
          project_task_description: projectDescription.value,
        } })
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        refForm.value?.reset()
        projectTitle.value = "Activité"
        projectSDate.value = new Date()
        projectEDate.value = new Date()
        projectStatus.value = "PENDING"
        projectBudget.value = 0
        projectManager.value = simpleMembersList[0].title
        projectDescription.value = "D"
        refForm.value?.resetValidation()
      })
    }
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const fetchMembersList = async () =>{
  await projectListStore.provideMembersList().then(response => {
    membersList.value = response.data
  })

  const simpleList = Array.from(membersList.value).map(item => ({
    title: item.member_fullname,
    value: item.member_matricule,
  }))

  simpleMembersList = simpleList
  
  return simpleList
}

watchEffect((fetchMembersList))
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
      title="Nouvelle Activité"
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

              <!-- 👉 Task Manager -->
              <VCol
                v-if="membersList"
                cols="12"
              >
                <AppAutocomplete
                  v-model="projectManager"
                  :rules="[requiredValidator]"
                  label="Responsable de l'activité"
                  :items="simpleMembersList"
                  item-title="title"
                  item-value="title"
                  chips
                  clearable
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

              <!-- 👉 Project Status -->
              <VCol cols="12">
                <AppSelect
                  v-model="projectStatus"
                  :rules="[requiredValidator]"
                  label="Status"
                  :items="[{title:'Non démarré',value:'PENDING'},
                           {title:'En cours', value:'IN PROGRESS'},
                           {title:'Terminé', value:'FINISHED'},
                           {title:'Suspendu', value:'SUSPENDED'},
                           {title:'Echec', value:'FAILED'}]"
                />
              </VCol>

              <!-- 👉 Project Description -->
              <VCol cols="12">
                <AppTextarea
                  v-model="projectDescription"
                  label="Description"
                  multiline
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

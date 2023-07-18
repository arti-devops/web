<script setup>
import { useProjectListStore } from '@/views/apps/project/useProjectListStore'

const projectListStore = useProjectListStore()
const project = projectListStore.project

const open = ref(['Project'])
</script>

<template>
  <VRow v-if="project">
    <VCol cols="6">
      <VList v-model:opened="open">
        <VListGroup value="Project">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="tabler-subtask"
              :title="project.project_title"
            />
          </template>
  
          <!-- SECTION - Project manager list -->
          <VListGroup value="Admin">
            <template #activator="{ props }">
              <VListItem
                v-bind="props"
                prepend-icon="tabler-users"
                title="Chef Projet"
              />
            </template>
  
            <VListItem
              :value="project.project_members[0][0].project_member_name"
              :title="project.project_members[0][0].project_member_name"
              prepend-icon="tabler-user"
            />
          </VListGroup>
          <!-- !SECTION - Project manger  -->
  
          <!-- SECTION - Project members list -->
          <VListGroup>
            <template #activator="{ props }">
              <VListItem
                v-bind="props"
                prepend-icon="tabler-users"
                title="Participants"
              />
            </template>
  
            <VListItem
              v-for="(m, i) in project.project_members"
              :key="i"
              :value="m[0].project_member_name"
              :title="m[0].project_member_name"
              prepend-icon="tabler-user"
            />
          </VListGroup>
          <!-- !SECTION - Project members list -->
        </VListGroup>
      </VList>
    </VCol>
    <VCol cols="12" />
  </VRow>
</template>

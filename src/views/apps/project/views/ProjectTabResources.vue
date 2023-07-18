<script setup>
const open = ref(['Project'])

const stakeholders = ['Gren CISSE Al-Karid', 'KANDE Daouda', 'DRO Chris ']
</script>

<template>
  <VRow>
    <VCol cols="6">
      <VList v-model:opened="open">
        <VListGroup value="Project">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="tabler-subtask"
              title="Projet : Remplacer cette ligne par le titre du projet actuel"
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
              value="Gren CISSE Al-Karid"
              title="Gren CISSE Al-Karid"
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
              v-for="(name, i) in stakeholders"
              :key="i"
              :value="name"
              :title="name"
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

<script setup>
const desserts = [
  {
    dessert: 'Frozen Yogurt',
    calories: "Gren CISSE",
    fat: "2023-05-09",
    carbs: "2023-06-04",
    protein: "Echec",
    budget: 150000,
    color: "primary",
  },
  {
    dessert: 'Ice cream sandwich',
    calories: "Alexy SANO",
    fat: "2023-06-04",
    carbs: "2023-06-04",
    protein: "En cours",
    budget: 10000,
    color: "error",
  },
  {
    dessert: 'Eclair',
    calories: "Dorcas Marine",
    fat: "2023-06-04",
    carbs: "2023-06-04",
    protein: "En cours",
    budget: 960650,
    color: "primary",
  },
  {
    dessert: 'Cupcake',
    calories: "Solange De LaForge",
    fat: "2023-06-04",
    carbs: "2023-06-04",
    protein: "Terminé",
    budget: 3148250,
    color: "success",
  },
  {
    dessert: 'Gingerbread',
    calories: "Sahiri Daniel",
    fat: "2023-06-04",
    carbs: "2023-06-04",
    protein: "Terminé",
    budget: 75506,
    color: "warning",
  },
]
</script>

<template>
  <VTable class="text-no-wrap">
    <thead>
      <tr>
        <th class="text-uppercase">
          Desserts(100g Servings)
        </th>
        <th class="text-uppercase">
          Responsable
        </th>
        <th class="text-uppercase">
          Début
        </th>
        <th class="text-uppercase">
          Fin
        </th>
        <th class="text-uppercase">
          Status
        </th>
        <th class="text-uppercase text-right">
          Budget
        </th>
        <th class="text-uppercase text-center">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.dessert"
      >
        <td>
          <VAvatar
            size="30"
            color="primary"
            variant="tonal"
          >
            <VIcon
              size="20"
              icon="tabler-archive"
            />
          </VAvatar>
          {{ item.dessert }}
        </td>
        <td>
          {{ item.calories }}
        </td>
        <td>
          {{ item.fat }}
        </td>
        <td>
          {{ item.carbs }}
        </td>
        <td>
          <VAvatar
            :color="item.color"
            size="20"
          />
          <span>
            En cours
          </span>
        </td>
        <td class="text-right">
          {{ item.budget }} FCFA
        </td>
        <td class="text-center">
          <!-- Actions -->
          
          <VBtn
            icon
            variant="text"
            size="small"
            color="medium-emphasis"
          >
            <VIcon
              size="24"
              icon="tabler-dots-vertical"
            />

            <VMenu activator="parent">
              <VList>
                <VListItem>
                  <template #prepend>
                    <VIcon icon="tabler-edit" />
                  </template>
                  <VListItemTitle>Modifier</VListItemTitle>
                </VListItem>

                <VListItem>
                  <template #prepend>
                    <VIcon icon="tabler-trash" />
                  </template>
                  <VListItemTitle>Supprimer</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

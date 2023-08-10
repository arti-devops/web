<script setup>
const props = defineProps({
  articles: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      lg="10"
      class="mx-auto mb-8"
    >
      <VRow>
        <VCol
          v-for="article in props.articles"
          :key="article.title"
          cols="12"
          md="4"
        >
          <VCard
            flat
            border
          >
            <VCardText class="text-center">
              <VImg
                :src="article.img"
                aspect-ratio="1"
                width="58"
                class="mx-auto"
              />

              <h6 class="text-h5 my-3">
                {{ article.title }}
              </h6>
              <p class="clamp-text">
                {{ article.subtitle }}
              </p>

              <a
                v-if="article.link.startsWith('http')"
                :href="article.link"
                target="blank"
              >
                <VBtn
                  size="small"
                  variant="tonal"
                  :disabled="article.disable"
                  prepend-icon="tabler-click"
                >
                  Entrer
                </VBtn>
              </a>
              <RouterLink
                v-else
                :to="article.link"
              >
                <VBtn
                  size="small"
                  variant="tonal"
                  :disabled="article.disable"
                  prepend-icon="tabler-click"
                >
                  Entrer
                </VBtn>
              </RouterLink>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>

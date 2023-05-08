<script setup lang="ts">
import JobList from './JobList.vue'
import MyFiltersPanel from './MyFiltersPanel.vue'
import MyPagination from './MyPagination.vue'
import { useJobStore } from '@/stores/jobStore'
import MyLoader from '@/components/MyLoader.vue'

const jobStore = useJobStore()
</script>

<template>
  <section class="section-wrapper">
    <MyFiltersPanel />
    <MyLoader v-if="jobStore.isLoading" />
    <JobList v-if="!jobStore.isLoading" />
    <MyPagination />
  </section>
</template>

<style scoped>
.section-wrapper {
  max-width: 900px;
  margin-inline: auto;
}
</style>

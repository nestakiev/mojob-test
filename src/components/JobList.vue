<script setup lang="ts">
import JobListItem from './JobListItem.vue'
import { useJobStore } from '@/stores/jobStore'
const jobStore = useJobStore()
</script>

<template>
  <ul v-if="jobStore.jobListings.length > 0">
    <JobListItem v-for="job in jobStore.jobListings" :key="job.id" :job="job" />
  </ul>
  <h2 v-if="jobStore.emptySearch">
    Unfortunately, nothing was found for your request. Please try changing your search parameters
    and try again.
  </h2>
</template>

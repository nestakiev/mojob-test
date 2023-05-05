<script setup lang="ts">
import type { JobListing } from '@/models/models'
import JobListItem from './JobListItem.vue';

export interface Props {
  jobListings: JobListing[]
}
const props = withDefaults(defineProps<Props>(), {
  jobListings: () => [],
})
</script>

<template>
    <ul>
        <JobListItem v-for="job in jobListings" :key="job.id" :job="job"/>  
    </ul>
  <!-- <div class="job-feed">
    <div v-for="position in positionFunctions" :key="position.id">
      <h1>{{ position.name_en }}</h1>
      <div v-if="position.children && position.children.length > 1">
        <span v-for="childPosition in position.children" :key="childPosition.id">
          <h3> {{ childPosition.name_en }}</h3>
        </span>
      </div>


    </div>
  </div> -->
</template>

<script setup lang="ts">
import type { JobListing, PositionFunction } from '@/models/models'
import JobList from './JobList.vue'
export interface Props {
  jobListings: JobListing[]
  positionFunctions: PositionFunction[]
}
withDefaults(defineProps<Props>(), {
  jobListings: () => [],
  positionFunctions: () => []
})
</script>

<template>
    <JobList :job-listings="jobListings" />
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

<script setup lang="ts">
import type { JobListing, PositionFunction } from '@/models/models'
import JobList from './JobList.vue'
import MyFiltersPanel from './MyFiltersPanel.vue'
import {useJobStore} from '@/stores/jobStore' 

export interface Props {
  jobListings: JobListing[]
  positionFunctions: PositionFunction[]
}
withDefaults(defineProps<Props>(), {
  jobListings: () => [],
  positionFunctions: () => []
})

const jobStore = useJobStore();
console.log(jobStore)
</script>

<template>
    <MyFiltersPanel/>
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

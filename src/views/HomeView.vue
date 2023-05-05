<script setup lang="ts">
import BaseApi from '@/api-requests/api'
import type { IPage, PositionFunction, JobListing } from '@/models/models'
import { inject, onMounted, ref } from 'vue'
import type { AxiosStatic } from 'axios'
import JobFeed from '../components/JobFeed.vue'

const mojobApi = ref<BaseApi | null>(null)
const positionFunctionFilters = ref<PositionFunction[]>([])
const jobListings = ref<JobListing[]>([])
const axiosInstance = inject('axios') as AxiosStatic

onMounted(async () => {
  mojobApi.value = new BaseApi('https://test-api.mojob.io/public/', axiosInstance)
  try {
    const jobLocationFiltersResponsePage: IPage<PositionFunction> =
      await mojobApi.value.getPositionFunctions()

    const jobListingsResponsePage: IPage<JobListing> | JobListing[] =
      await mojobApi.value.getJobListings(null, 1, [])

    console.log(jobListingsResponsePage)

    if (jobLocationFiltersResponsePage.results) {
      positionFunctionFilters.value = jobLocationFiltersResponsePage.results
      console.log(JSON.stringify(positionFunctionFilters.value, null, 2))
      console.log(positionFunctionFilters.value)
    } else {
      console.log('Failed loading position function filters')
    }
  } catch (e) {
    console.log('Failed loading position function filters')
    console.log(e)
  }
})
</script>

<template>
  <div class="home">
    <job-feed :job-listings="[]" :position-functions="positionFunctionFilters" />
  </div>
</template>

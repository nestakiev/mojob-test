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
    if (jobLocationFiltersResponsePage.results) {
      positionFunctionFilters.value = jobLocationFiltersResponsePage.results
      // console.log(JSON.stringify(positionFunctionFilters.value, null, 2))
      console.log(positionFunctionFilters.value)
    } else {
      console.log('Failed loading position function filters')
    }
  } catch (e) {
    console.log('Failed loading position function filters')
    console.log(e)
  }

  try {
    const jobListingsResponsePage: IPage<JobListing> | JobListing[] =
      await mojobApi.value.getJobListings(5, 1, [])

    if (Array.isArray(jobListingsResponsePage)) {
      jobListings.value = jobListingsResponsePage
    } else if (typeof jobListingsResponsePage === 'object' && jobListingsResponsePage.results) {
      // handle IPage<JobListing>
      jobListings.value = jobListingsResponsePage.results

      // positionFunctionFilters.value = jobLocationFiltersResponsePage.results
      // console.log(JSON.stringify(positionFunctionFilters.value, null, 2))
      console.log(jobListings.value)
    } else {
      console.log('Failed loading job listings')
    }
  } catch (e) {
    console.log('Failed loading job listings')
    console.log(e)
  }
})
</script>

<template>
  <div class="home">
    <job-feed :job-listings="jobListings" :position-functions="positionFunctionFilters" />
  </div>
</template>

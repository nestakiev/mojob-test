<script setup lang="ts">
import BaseApi from '@/api-requests/api'
import type { IPage, PositionFunction, JobListing } from '@/models/models'
import { inject, onMounted, ref, watch } from 'vue'
import type { AxiosStatic } from 'axios'
import JobFeed from '../components/JobFeed.vue'

const mojobApi = ref<BaseApi | null>(null)
const positionFunctionFilters = ref<PositionFunction[]>([])
const jobListings = ref<JobListing[]>([])
const page = ref<number>(1)
const totalPages = ref<number>(0)
const limitPerPage = ref<number>(5)
const axiosInstance = inject('axios') as AxiosStatic

const changePage = (pageNumber: number): void => {
  page.value = pageNumber
}

watch([page, limitPerPage], async () => {
  if (mojobApi.value !== null) {
    try {
      const jobListingsResponsePage: IPage<JobListing> | JobListing[] =
        await mojobApi.value.getJobListings(limitPerPage.value, page.value, [])

      if (Array.isArray(jobListingsResponsePage)) {
        jobListings.value = jobListingsResponsePage
      } else if (
        typeof jobListingsResponsePage === 'object' &&
        jobListingsResponsePage.results &&
        jobListingsResponsePage.count !== undefined
      ) {
        jobListings.value = jobListingsResponsePage.results
        totalPages.value = Math.ceil(jobListingsResponsePage.count / limitPerPage.value)

        // console.log(totalPages.value)
        // positionFunctionFilters.value = jobLocationFiltersResponsePage.results
        // console.log(JSON.stringify(positionFunctionFilters.value, null, 2))
        // console.log(jobListingsResponsePage)
      } else {
        console.log('Failed loading job listings')
      }
    } catch (e) {
      console.log('Failed loading job listings')
      console.log(e)
    }
  }
})

onMounted(async () => {
  mojobApi.value = new BaseApi('https://test-api.mojob.io/public/', axiosInstance)
  try {
    const jobLocationFiltersResponsePage: IPage<PositionFunction> =
      await mojobApi.value.getPositionFunctions()
    if (jobLocationFiltersResponsePage.results) {
      positionFunctionFilters.value = jobLocationFiltersResponsePage.results
      // console.log(JSON.stringify(positionFunctionFilters.value, null, 2))
      // console.log(positionFunctionFilters.value)
    } else {
      console.log('Failed loading position function filters')
    }
  } catch (e) {
    console.log('Failed loading position function filters')
    console.log(e)
  }

  try {
    const jobListingsResponsePage: IPage<JobListing> | JobListing[] =
      await mojobApi.value.getJobListings(limitPerPage.value, page.value, [])

    if (Array.isArray(jobListingsResponsePage)) {
      jobListings.value = jobListingsResponsePage
    } else if (
      typeof jobListingsResponsePage === 'object' &&
      jobListingsResponsePage.results &&
      jobListingsResponsePage.count !== undefined
    ) {
      jobListings.value = jobListingsResponsePage.results
      totalPages.value = Math.ceil(jobListingsResponsePage.count / limitPerPage.value)

      // console.log(totalPages.value)
      // positionFunctionFilters.value = jobLocationFiltersResponsePage.results
      // console.log(JSON.stringify(positionFunctionFilters.value, null, 2))
      // console.log(jobListingsResponsePage)
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
  <main class="home">
    <job-feed :job-listings="jobListings" :position-functions="positionFunctionFilters" />
    <ul v-if="totalPages > 1" class="pagination-wrapper">
      <li
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="pagination-page"
        :class="{ 'current-page': page === pageNumber }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </li>
    </ul>
  </main>
</template>

<style scoped>
.pagination-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
}

.pagination-page {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px black solid;
}

.current-page {
  background-color: green;
}
</style>

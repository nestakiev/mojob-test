<script setup lang="ts">
import BaseApi from '@/api-requests/api'
import type { IPage, PositionFunction, JobListing } from '@/models/models'
import { inject, onMounted, ref, watch } from 'vue'
import type { AxiosStatic } from 'axios'
import JobFeed from '../components/JobFeed.vue'
import MyLoader from '@/components/MyLoader.vue'

const mojobApi = ref<BaseApi | null>(null)
const positionFunctionFilters = ref<PositionFunction[]>([])
const jobListings = ref<JobListing[]>([])
const page = ref<number>(1)
const totalPages = ref<number>(0)
const limitPerPage = ref<number>(5)
const isLoading = ref<boolean>(false)
const axiosInstance = inject('axios') as AxiosStatic

const changePage = (pageNumber: number): void => {
  page.value = pageNumber
}

const fetchPositionFunction = async () => {
  if (mojobApi.value !== null) {
    isLoading.value = true
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
  }
  isLoading.value = false
}

const fetchJobListings = async () => {
  if (mojobApi.value !== null) {
    isLoading.value = true

    try {
      const jobListingsResponsePage: IPage<JobListing> | JobListing[] =
        await mojobApi.value.getJobListings(limitPerPage.value, page.value, [])

      if (Array.isArray(jobListingsResponsePage)) {
        jobListings.value = jobListingsResponsePage
        totalPages.value = 0
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
  isLoading.value = false
}

watch([page, limitPerPage], async () => {
  fetchJobListings()
})

onMounted(async () => {
  mojobApi.value = new BaseApi('https://test-api.mojob.io/public/', axiosInstance)

  fetchPositionFunction()

  fetchJobListings()
})
</script>

<template>
  <main class="home">
    <MyLoader v-if="isLoading" />
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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background: transparent;
  border-radius: 4px;
  font-size: 1rem;
  width: 34px;
  height: 34px;
  transition: 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 3px 1px -2px transparent, 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 8%);
}

.current-page {
  background-color: #46bbb3;
  color: #ffffff;
  pointer-events: none;
}
</style>

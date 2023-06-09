import { ref, watch, inject, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import BaseApi from '@/api-requests/api'
import type { AxiosStatic } from 'axios'
import type { IPage, PositionFunction, JobListing } from '@/models/models'

export const useJobStore = defineStore('jobStore', () => {
  const axiosInstance = inject('axios') as AxiosStatic

  const mojobApi = ref<BaseApi | null>(null)
  const positionFunctionFilters = ref<PositionFunction[]>([])
  const sortingByAscNamePositionFunction = computed(() => {
    return positionFunctionFilters.value.sort((a, b) => {
      if (typeof a.name_en === 'string' && typeof b.name_en === 'string') {
        const result = a.name_en.localeCompare(b.name_en)
        return result === undefined ? 0 : result
      }
      return 0
    })
  })

  const checkedPositionFunction = ref<number[]>([])
  const jobListings = ref<JobListing[]>([])
  const page = ref<number>(1)
  const totalPages = ref<number>(0)
  const limitPerPage = ref<number | null>(5)
  const isLoading = ref<boolean>(false)
  const emptySearch = ref<boolean>(false)

  const fetchPositionFunction = async (): Promise<void> => {
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
  const fetchJobListings = async (): Promise<void> => {
    if (mojobApi.value !== null) {
      isLoading.value = true

      try {
        const jobListingsResponsePage: IPage<JobListing> | JobListing[] =
          await mojobApi.value.getJobListings(
            limitPerPage.value,
            page.value,
            checkedPositionFunction.value
          )

        if (Array.isArray(jobListingsResponsePage)) {
          jobListings.value = jobListingsResponsePage
          totalPages.value = 0
          emptySearch.value = jobListingsResponsePage.length === 0
        } else if (
          typeof jobListingsResponsePage === 'object' &&
          jobListingsResponsePage.results &&
          jobListingsResponsePage.count !== undefined
        ) {
          jobListings.value = jobListingsResponsePage.results
          emptySearch.value = jobListingsResponsePage.results.length === 0

          if (limitPerPage.value === null) {
            totalPages.value = 0
          } else {
            totalPages.value = Math.ceil(jobListingsResponsePage.count / limitPerPage.value)
          }
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
  const changePage = (pageNumber: number): void => {
    page.value = pageNumber
  }
  const changeLimitPerPage = (newLimit: number | null): void => {
    limitPerPage.value = newLimit
    page.value = 1
    totalPages.value = 1
  }

  watch([page, limitPerPage], async () => {
    fetchJobListings()
  })

  watch(
    checkedPositionFunction,
    async () => {
      page.value = 1
      totalPages.value = 0
      fetchJobListings()
    },
    { deep: true }
  )

  onMounted(async () => {
    mojobApi.value = new BaseApi('https://test-api.mojob.io/public/', axiosInstance)
    fetchJobListings()
    fetchPositionFunction()
  })

  return {
    positionFunctionFilters,
    jobListings,
    page,
    totalPages,
    limitPerPage,
    isLoading,
    fetchPositionFunction,
    fetchJobListings,
    changePage,
    changeLimitPerPage,
    checkedPositionFunction,
    emptySearch,
    sortingByAscNamePositionFunction
  }
})

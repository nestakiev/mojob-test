<script setup lang="ts">
import JobFeed from '@/components/JobFeed.vue'
import MyLoader from '@/components/MyLoader.vue'
import { useJobStore } from '@/stores/jobStore'

const jobStore = useJobStore()
</script>

<template>
  <main class="home">
    <MyLoader v-if="jobStore.isLoading" />
    <job-feed
      v-if="!jobStore.isLoading"
      :job-listings="jobStore.jobListings"
      :position-functions="jobStore.positionFunctionFilters"
    />
    <ul v-if="jobStore.totalPages > 1" class="pagination-wrapper">
      <li
        v-for="pageNumber in jobStore.totalPages"
        :key="pageNumber"
        class="pagination-page"
        :class="{ 'current-page': jobStore.page === pageNumber }"
        @click="jobStore.changePage(pageNumber)"
      >
        {{ pageNumber }}
      </li>
    </ul>
  </main>
</template>

<style scoped>
.home {
  background-color: #fafdfd;
  padding: 0 62px;
}
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

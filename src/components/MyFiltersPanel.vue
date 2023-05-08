<script setup lang="ts">
import MyFilterLimitPerPage from '@/components/MyFilterLimitPerPage.vue'
import MyFilterPositionFunction from './MyFilterPositionFunction.vue'
</script>

<template>
  <div class="container">
    <MyFilterPositionFunction />
    <MyFilterLimitPerPage />
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
}
</style>

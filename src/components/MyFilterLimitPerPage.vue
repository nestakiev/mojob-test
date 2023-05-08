<template>
  <div class="select-per-page">
    <MyFilterButton @click="toggleOptionsVisible" :title="selectedOption?.name" />
    <ul class="options" v-if="areOptionsVisible">
      <li v-for="option in optionsList" :key="option.name" @click="setSelectedOption(option)">
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useJobStore } from '@/stores/jobStore'
import type { IOptionPerPage } from '@/models/models'
import options from '@/constants'
import MyFilterButton from './MyFilterButton.vue'

const jobStore = useJobStore()

const selectedOption = computed<IOptionPerPage | undefined>(() =>
  options.find((option) => option.value === jobStore.limitPerPage)
)
const optionsList = computed<IOptionPerPage[] | undefined>(() =>
  options.filter((option) => option.value !== jobStore.limitPerPage)
)
const areOptionsVisible = ref<boolean>(false)
const toggleOptionsVisible = (): void => {
  areOptionsVisible.value = !areOptionsVisible.value
}
const hideOptions = (event: MouseEvent): void => {
  const target = event.target as HTMLElement
  if (!target.closest('.select-per-page')) {
    areOptionsVisible.value = false
  }
}
const setSelectedOption = (option: IOptionPerPage): void => {
  areOptionsVisible.value = false
  jobStore.changeLimitPerPage(option.value)
}

onMounted(() => {
  document.addEventListener('click', hideOptions)
})

onUnmounted(() => {
  document.removeEventListener('click', hideOptions)
})
</script>

<style scoped>
.select-per-page {
  position: relative;
}

.options {
  position: absolute;
  right: 0;
  top: 36px;
  background-color: #ffffff;
  box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.14), 0px 3px 16px rgba(0, 0, 0, 0.12),
    0px 5px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  list-style-type: none;
}

.options li {
  padding: 8px 24px 8px 12px;
}

.options li:hover {
  background-color: #e7e7e7d8;
  cursor: pointer;
}
</style>

<template>
  <div class="select-per-page">
    <button class="title" @click="toggleOptionsVisible">
      {{ selectedOption?.name }} <span class="arrow"></span>
    </button>
    <div class="options" v-if="areOptionsVisible">
      <p v-for="option in optionsList" :key="option.name" @click="setSelectedOption(option)">
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useJobStore } from '@/stores/jobStore'
import type { IOptionPerPage } from '@/models/models'
import options from '@/constants'

const { changeLimitPerPage, limitPerPage } = useJobStore()

const selectedOption = computed<IOptionPerPage | undefined>(() =>
  options.find((option) => option.value === limitPerPage)
)
const optionsList = computed<IOptionPerPage[] | undefined>(() =>
  options.filter((option) => option.value !== limitPerPage)
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
  changeLimitPerPage(option.value)
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

.arrow {
  clip-path: polygon(50% 75%, 0 25%, 100% 25%);
  background-color: black;
  width: 10px;
  height: 10px;
  content: '';
  margin: auto 0px auto 11px;
}
.title {
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 1.3px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  background-color: transparent;
  padding: 10px 12px;
  /* outline: transparent; */
  border: none;
  border-radius: 8px;
  transition: all 250ms ease;
  cursor: pointer;

  margin-left: auto;
}

.title:hover,
.title:focus-visible {
  background-color: #e7e7e7d8;
}

.options {
  position: absolute;
  right: 0;
  top: 36px;
  background-color: red;
  /* padding: 0 24px 0 12px; */
  background: #ffffff;
  /* Shadow/Menu/Drop Down */

  box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.14), 0px 3px 16px rgba(0, 0, 0, 0.12),
    0px 5px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.options p {
  padding: 8px 24px 8px 12px;
}

.options p:hover {
  background-color: #e7e7e7d8;
  cursor: pointer;
}
</style>

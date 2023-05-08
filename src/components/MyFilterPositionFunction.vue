<!-- <template>
  <div class="select-position-function">
    <MyFilterButton :title="'filter by position'" @click="toggleOptionsVisible" />
    <ul class="options" v-if="areOptionsVisible">
      <li v-for="position in jobStore.positionFunctionFilters" :key="position.id">
        <label>
          <input type="checkbox" />
          {{ position.name_en }}
        </label>
        <ul
          v-if="position.children !== undefined && position.children?.length > 1"
          class="suboptions"
        >
          <li v-for="subposition in position.children" :key="subposition.id">
            <label>
              <input type="checkbox" />
              {{ subposition.name_en }}
            </label>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useJobStore } from '@/stores/jobStore'
import MyFilterButton from './MyFilterButton.vue'

const jobStore = useJobStore()

//   const selectedOption = computed<IOptionPerPage | undefined>(() =>
//   options.find((option) => option.value === jobStore.limitPerPage)
//   )
//   const optionsList = computed<IOptionPerPage[] | undefined>(() =>
//     options.filter((option) => option.value !== jobStore.limitPerPage)
//   )
const areOptionsVisible = ref<boolean>(false)
const toggleOptionsVisible = (): void => {
  areOptionsVisible.value = !areOptionsVisible.value
}
const hideOptions = (event: MouseEvent): void => {
  const target = event.target as HTMLElement
  if (!target.closest('.select-position-function')) {
    areOptionsVisible.value = false
  }
}
//   const setSelectedOption = (option: IOptionPerPage): void => {
//     areOptionsVisible.value = false
//     jobStore.changeLimitPerPage(option.value)
//   }

onMounted(() => {
  document.addEventListener('click', hideOptions)
})

onUnmounted(() => {
  document.removeEventListener('click', hideOptions)
})
</script> -->

<template>
  <div class="select-position-function">
    <MyFilterButton :title="'filter by position'" @click="toggleOptionsVisible" />
    <ul class="options" v-if="areOptionsVisible">
      <li v-for="position in jobStore.sortingByAscNamePositionFunction" :key="position.id">
        <label>
          <input type="checkbox" v-model="jobStore.checkedPositionFunction" :value="position.id" />
          {{ position.name_en }}
        </label>
        <ul
          v-if="position.children !== undefined && position.children?.length > 1"
          class="suboptions"
        >
          <li v-for="subposition in position.children" :key="subposition.id">
            <label>
              <input
                type="checkbox"
                v-model="jobStore.checkedPositionFunction"
                :value="subposition.id"
              />
              {{ subposition.name_en }}
            </label>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useJobStore } from '@/stores/jobStore'
import MyFilterButton from './MyFilterButton.vue'

const jobStore = useJobStore()
const areOptionsVisible = ref<boolean>(false)
const toggleOptionsVisible = (): void => {
  areOptionsVisible.value = !areOptionsVisible.value
}
const hideOptions = (event: MouseEvent): void => {
  const target = event.target as HTMLElement
  if (!target.closest('.select-position-function')) {
    areOptionsVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', hideOptions)
})

onUnmounted(() => {
  document.removeEventListener('click', hideOptions)
})
</script>
<style scoped>
.select-position-function {
  position: relative;
}

.options {
  position: absolute;
  left: 0;
  top: 36px;
  background-color: #ffffff;
  box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.14), 0px 3px 16px rgba(0, 0, 0, 0.12),
    0px 5px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  width: 380px;
  max-height: 430px;
  overflow-y: scroll;
  list-style-type: none;
}

label {
  padding: 8px 24px 8px 12px;
  display: block;
  position: relative;
  cursor: pointer;
}

li {
  height: auto;
}

label:hover,
input:hover {
  background-color: #e7e7e7d8;
  cursor: pointer;
}

input {
  padding: 0;
  height: initial;
  width: initial;
  margin-bottom: 0;
  display: none;
  cursor: pointer;
  position: relative;
}

label:before {
  content: '';
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  border: 1px solid #757575;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 6px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 5px;
}
label:has(input[type='checkbox']:checked)::before {
  background-color: #f86a27;
  border: 1px solid transparent;
}
label:has(input[type='checkbox']:checked)::after {
  content: '';
  display: block;
  position: absolute;
  top: 14px;
  left: 17px;
  width: 3px;
  height: 7px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  z-index: 100;
}
.suboptions {
  list-style-type: none;
  padding-left: 12px;
}
</style>

<template>
  <button class="title">
    {{ title }} <span class="arrow"></span>
  </button>
</template>

<script setup lang="ts">
export interface Props {
  title: string
}
withDefaults(defineProps<Props>(), {
  title: 'Title',
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
  background-color: #ffffff;
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

<script setup lang="ts">
import type { JobListing } from '@/models/models'
import changeDateFormat from '../functions';
export interface Props {
  job: JobListing
}
withDefaults(defineProps<Props>(), {
  job: Object as () => JobListing
})


</script>

<template>
  <li class="job-list-item">
    <img :src="job?.job?.unit?.logo_url" alt="company logo" class="company-logo" />
    <div class="content-box">
      <h4 class="title">{{ job.job?.title }}</h4>
      <div class="info-box">
        <p>{{ job?.job?.unit?.display_name }}</p>
        <span class="dot" />
        <p>{{ job.job?.position_function?.name_en }}</p>
        <span class="dot" />
        <p>Expiry {{ changeDateFormat(job?.job?.due_date) }}</p>
      </div>
    </div>
  </li>
</template>

<style scoped>
.job-list-item {
  display: flex;
  padding: 12px 16px;
  background: #ffffff;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05), 0px 1px 10px rgba(0, 0, 0, 0.08),
    0px 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  margin-bottom: 12px;
}
.company-logo {
  width: 36px;
  height: 36px;
  margin: auto 0;
  border-radius: 50%;
  margin-right: 8px;
}

.content-box {
  flex-grow: 1;
}

.title {
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: 0.25px;
  margin-bottom: 8px;
}
.info-box {
  display: flex;
  align-items: center;
}

.info-box p {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.2px;
}

.dot {
  width: 5px;
  height: 5px;
  margin-inline: 7px;
  border-radius: 50%;
  background-color: black;
}
</style>

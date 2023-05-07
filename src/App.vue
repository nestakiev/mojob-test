<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <div id="app">
    <TheHeader/>
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: 'Nunito Sans';
  src: url('./fonts/NunitoSans_10pt-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: 'Nunito Sans';
  src: url('./fonts/NunitoSans_10pt-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: bold;
}

#app {
  font-family: Nunito Sans, Avenir, Muli, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
li {
  margin: 0;
  padding: 0;
}
</style>

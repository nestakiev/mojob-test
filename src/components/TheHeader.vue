<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <img class="logo" alt="Vue logo" src="../assets/mojob_logo_on_white2.png" />
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}
.logo {
  width: 92px;
  height: 42px;
}
.nav a {
  font-weight: bold;
  color: #4f4f4f;
  font-family: 'Nunito Sans';
}
.nav a.router-link-exact-active {
  color: #46bbb3;
}
</style>

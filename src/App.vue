<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
  <div class="app-container">
    <AppNavbar />
    <RouterView />
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

/* Reset some browser defaults */
body {
  margin: 0;
  padding: 0;
}

/* Global app styles */
a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
}
</style>

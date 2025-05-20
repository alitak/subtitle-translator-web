<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="app-navbar">
    <div class="logo">
      <h1>YouTube Subtitle Manager</h1>
    </div>
    <div class="nav-links">
      <RouterLink to="/">Video List</RouterLink>
      <RouterLink to="/add">Add New Video</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.app-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #2c3e50;
  color: white;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-links a.router-link-active {
  background-color: #4a6785;
}

.nav-links a:hover {
  background-color: #375a7f;
}

@media (max-width: 600px) {
  .app-navbar {
    flex-direction: column;
    gap: 10px;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
  }
}
</style>

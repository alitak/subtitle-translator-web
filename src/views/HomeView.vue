<script setup>
import { ref, computed } from 'vue'
import VideoCard from '../components/VideoCard.vue'
import { store } from '../store'

const searchQuery = ref('')

// Filter videos based on search query
const filteredVideos = computed(() => {
  if (!searchQuery.value) {
    return store.videos
  }

  const query = searchQuery.value.toLowerCase()
  return store.videos.filter(
    (video) => video.title.toLowerCase().includes(query) || video.url.toLowerCase().includes(query),
  )
})
</script>

<template>
  <main>
    <div class="video-list">
      <h2>My Videos</h2>
      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by title or URL..."
          class="search-input"
        />
      </div>

      <div v-if="filteredVideos.length > 0" class="videos-container">
        <VideoCard v-for="video in filteredVideos" :key="video.id" :video="video" />
      </div>

      <div v-else class="empty-state">
        <p>No videos found. Add a new video to get started.</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.video-list {
  max-width: 800px;
  margin: 0 auto;
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #666;
}

.videos-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

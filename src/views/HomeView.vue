<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import VideoCard from '@/components/VideoCard.vue'
import { config } from '@/config'

const searchQuery = ref('')
const loading = ref(true)
const videos = ref([])

onMounted(async () => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/videos/`)
    videos.value = response.data.items
  } finally {
    loading.value = false
  }
})

const filteredVideos = computed(() => {
  if (!searchQuery.value) {
    return videos.value
  }

  const query = searchQuery.value.toLowerCase()
  return videos.value.filter(
    (video) => video.title.toLowerCase().includes(query) || video.url.toLowerCase().includes(query),
  )
})
</script>

<template>
  <main>
    <div class="video-list">
      <h2>My Videos</h2>
      <div class="search-container">
        <input v-model="searchQuery" type="text" placeholder="Search by title or URL..." class="search-input" />
      </div>

      <div v-if="loading" class="loading-spinner">
        <p>Loading videos...</p>
      </div>

      <div v-else-if="filteredVideos.length > 0" class="videos-container">
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

.loading-spinner {
  text-align: center;
  padding: 40px 0;
  font-size: 18px;
  color: #666;
}
</style>

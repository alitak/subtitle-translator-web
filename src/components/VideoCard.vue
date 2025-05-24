<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { config } from '@/config'

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
})

const newLanguage = ref('')

const deleteVideo = () => {
  if (!confirm('Are you sure you want to delete this video?')) {
    return
  }

  axios.delete(`${config.apiBaseUrl}/videos/${props.video.id}`)
  .then(() => {
    location.reload()
  })
}

const addLanguage = () => {
  if (newLanguage.value && !props.video.subtitles.includes(newLanguage.value)) {
    axios.post(`${config.apiBaseUrl}/videos/${props.video.id}/subtitles/${newLanguage.value}`)
    .then(() => {
      setTimeout(() => {
        location.reload()
      }, 500)
    })
  }
}
</script>

<template>
  <div class="video-card">
    <h3>
      {{ video.title }}
      <!-- add confirm on delete button -->
      <button class="delete-btn-inline" v-on:click="deleteVideo">Delete</button>
    </h3>
    <p>
      <strong>URL:</strong>
      <a :href="video.url" target="_blank">{{ video.url }}</a>
      <span :class="video.status.toLowerCase()" class="inline-status">({{ video.status }})</span>
    </p>

    <div class="subtitles">
      <div class="language-list">
        <div v-for="subtitle in video.subtitles" :key="subtitle.id" class="language-badge">
          <!-- if status == pending, button should be disabled with title pending -->
          <a v-if="subtitle.status === 'pending'" class="download-btn cursor-not-allowed" disabled>{{ subtitle.language }} (pending)</a>
          <a v-else :href="subtitle.path" target="_blank" class="download-btn">{{ subtitle.language }}</a>
        </div>
      </div>
    </div>

    <div class="actions">
      <div class="add-language">
        <input v-model="newLanguage" type="text" placeholder="Language code (e.g. fr, de)" maxlength="5" />
        <button v-on:click="addLanguage">Add Language</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.downloaded {
  color: green;
}

.translated {
  color: blue;
}

.error {
  color: red;
}

.subtitles {
  margin: 10px 0;
}

.language-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.language-badge {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.download-btn {
  margin-left: 5px;
  font-size: 0.8em;
  padding: 2px 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.add-language {
  display: flex;
  gap: 8px;
}

input {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #2c3e50;
  color: white;
}

.delete-btn {
  background-color: #e74c3c;
}

.delete-btn-inline {
  margin-left: 10px;
  padding: 3px 8px;
  font-size: 0.8em;
  background-color: #e74c3c;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.inline-status {
  margin-left: 10px;
  font-size: 0.85em;
  font-style: italic;
  color: #555;
}

.cursor-not-allowed {
  cursor: not-allowed;
}
</style>

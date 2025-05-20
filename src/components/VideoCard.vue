<script setup>
import { ref } from 'vue'
import { store } from '../store'

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
})

const newLanguage = ref('')

// Delete video
const deleteVideo = () => {
  console.log('Deleting video:', props.video.id)
  store.deleteVideo(props.video.id)
}

// Add language
const addLanguage = () => {
  if (newLanguage.value && !props.video.subtitles.includes(newLanguage.value)) {
    console.log('Adding language:', newLanguage.value, 'to video:', props.video.id)
    store.addTranslationLanguage(props.video.id, newLanguage.value)
    newLanguage.value = ''
  }
}

// Download subtitle
const downloadSubtitle = (language) => {
  console.log('Downloading subtitle for video:', props.video.id, 'language:', language)
  store.downloadSubtitle(props.video.id, language)
}
</script>

<template>
  <div class="video-card">
    <h3>{{ video.title }}</h3>
    <p>
      <strong>URL:</strong> <a :href="video.url" target="_blank">{{ video.url }}</a>
    </p>
    <p>
      <strong>Status:</strong> <span :class="video.status.toLowerCase()">{{ video.status }}</span>
    </p>

    <div class="subtitles">
      <h4>Available Subtitles:</h4>
      <div class="language-list">
        <div v-for="lang in video.subtitles" :key="lang" class="language-badge">
          {{ lang }}
          <button class="download-btn" @click="downloadSubtitle(lang)">Download</button>
        </div>
      </div>
    </div>

    <div class="actions">
      <div class="add-language">
        <input
          v-model="newLanguage"
          type="text"
          placeholder="Language code (e.g. fr, de)"
          maxlength="5"
        />
        <button @click="addLanguage">Add Language</button>
      </div>
      <button class="delete-btn" @click="deleteVideo">Delete Video</button>
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
</style>

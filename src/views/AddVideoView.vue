<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { config } from '@/config'

const router = useRouter()

const videoUrl = ref('')
const selectedLanguages = ref([])
const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
]
const errorMessage = ref('')

const toggleLanguage = (langCode) => {
  const index = selectedLanguages.value.indexOf(langCode)
  if (index === -1) {
    selectedLanguages.value.push(langCode)
  } else {
    selectedLanguages.value.splice(index, 1)
  }
}

const validateYouTubeUrl = (url) => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11}).*$/
  return youtubeRegex.test(url)
}

const submitForm = () => {
  // Reset error message
  errorMessage.value = ''

  // Validate URL
  if (!videoUrl.value) {
    errorMessage.value = 'Please enter a YouTube URL'
    return
  }

  if (!validateYouTubeUrl(videoUrl.value)) {
    errorMessage.value = 'Please enter a valid YouTube URL'
    return
  }

  // Validate languages
  if (selectedLanguages.value.length === 0) {
    errorMessage.value = 'Please select at least one language'
    return
  }

  // Log the payload
  console.log('Adding new video:', {
    url: videoUrl.value,
    languages: selectedLanguages.value,
  })

  // Add video to store
  const success = axios.post(`${config.apiBaseUrl}/videos/`, {
    url: videoUrl.value,
    languages: selectedLanguages.value,
  })

  if (success) {
    // Navigate back to home
    router.push('/')
  }
}
</script>

<template>
  <main>
    <div class="add-video-form">
      <h2>Add New Video</h2>

      <div class="form-group">
        <label for="video-url">YouTube Video URL:</label>
        <input id="video-url" v-model="videoUrl" type="text" placeholder="https://www.youtube.com/watch?v=..." required />
      </div>

      <div class="form-group">
        <label>Select Subtitle Languages:</label>
        <div class="language-options">
          <div v-for="language in availableLanguages" :key="language.code" class="language-option"
            :class="{ selected: selectedLanguages.includes(language.code) }" v-on:click="toggleLanguage(language.code)">
            <span class="language-code">{{ language.code }}</span>
            <span class="language-name">{{ language.name }}</span>
          </div>
        </div>
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div class="form-actions">
        <button class="submit-btn" v-on:click="submitForm">Add Video</button>
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

.add-video-form {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input[type='text'] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.language-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.language-option {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.language-option:hover {
  background-color: #f5f5f5;
}

.language-option.selected {
  background-color: #e0f7fa;
  border-color: #0288d1;
}

.language-code {
  font-weight: bold;
  text-transform: uppercase;
}

.language-name {
  font-size: 0.9em;
  color: #666;
}

.error-message {
  color: #e74c3c;
  margin-bottom: 15px;
  padding: 8px;
  background-color: #fde2e2;
  border-radius: 4px;
}

.form-actions {
  margin-top: 20px;
  text-align: center;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #1a252f;
}
</style>

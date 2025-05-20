import { reactive } from 'vue'

// Initial mock data
export const store = reactive({
  videos: [
    {
      id: 'WPRHcAOjUN0',
      title: 'How to Improve Yourself',
      url: 'https://www.youtube.com/watch?v=WPRHcAOjUN0',
      status: 'Downloaded',
      subtitles: ['hu', 'en'],
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'Never Gonna Give You Up',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'Translated',
      subtitles: ['en', 'es', 'fr'],
    },
  ],

  // Add a new video
  addVideo(url, languages) {
    console.log('Adding video:', { url, languages })
    // Extract video ID from URL
    const videoId = this.extractVideoId(url)
    if (!videoId) {
      console.error('Invalid YouTube URL')
      return false
    }

    // Create mock data for the new video
    const newVideo = {
      id: videoId,
      title: `Video ${this.videos.length + 1}`, // Mock title
      url,
      status: 'Downloaded',
      subtitles: [...languages],
    }

    this.videos.push(newVideo)
    return true
  },

  // Delete a video
  deleteVideo(videoId) {
    console.log('Deleting video:', videoId)
    const index = this.videos.findIndex((video) => video.id === videoId)
    if (index !== -1) {
      this.videos.splice(index, 1)
      return true
    }
    return false
  },

  // Add translation language to a video
  addTranslationLanguage(videoId, language) {
    console.log('Adding translation language:', { videoId, language })
    const video = this.videos.find((video) => video.id === videoId)
    if (video && !video.subtitles.includes(language)) {
      video.subtitles.push(language)
      return true
    }
    return false
  },

  // Download subtitle
  downloadSubtitle(videoId, language) {
    console.log('Downloading subtitle:', { videoId, language })
    return true
  },

  // Helper function to extract YouTube video ID from URL
  extractVideoId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[7].length === 11 ? match[7] : null
  },
})

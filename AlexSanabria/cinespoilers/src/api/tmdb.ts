import axios from 'axios'

export const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '4f8f388b17874d7f5dd0c9730c417c49',
  },
})

export const IMG_BASE = 'https://image.tmdb.org/t/p/w500'
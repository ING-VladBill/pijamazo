import { useQuery } from '@tanstack/react-query'
import { tmdb } from '../api/tmdb'

export const useMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const { data } = await tmdb.get('/movie/popular')
      return data.results
    },
  })
}

export const useMovie = (id: string) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      const { data } = await tmdb.get(`/movie/${id}`)
      return data
    },
  })
}
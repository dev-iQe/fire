import axios from 'axios';

const API_KEY = '12bae60f08973b30c741d0844769d9d';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// category: 'popular' | 'top_rated' | 'now_playing' | 'upcoming'
export const fetchMovies = async (category = 'popular', language = 'en-US') => {
  try {
    const response = await api.get(`/movie/${category}`, { params: { language } });
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching movies:', error?.message || error);
    throw error;
  }
};

export const fetchTrendingMovies = async (language = 'en-US') => {
  try {
    const response = await api.get('/trending/movie/day', { params: { language } });
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching trending movies:', error?.message || error);
    throw error;
  }
};

export const fetchLatestMovies = (language) => fetchMovies('now_playing', language);
export const fetchUpcomingMovies = (language) => fetchMovies('upcoming', language);

export const searchMovies = async (query, language = 'en-US') => {
  try {
    const response = await api.get('/search/movie', { params: { query, language } });
    return response.data.results || [];
  } catch (error) {
    console.error('Error searching movies:', error?.message || error);
    throw error;
  }
};

export const fetchMovieDetails = async (id, language = 'en-US') => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: { append_to_response: 'videos,credits', language },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error?.message || error);
    throw error;
  }
};

export default api;

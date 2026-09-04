import axios from 'axios';

const API_KEY = '12bae60f08973b30c741d0844769d9d';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const fetchLatestMovies = async () => {
  try {
    const response = await api.get('/movie/now_playing');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching latest movies:', error);
    return [];
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await api.get('/movie/upcoming');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await api.get('/search/movie', {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export default api;

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '12bae60f08973cb30c741d0844769d9d';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmJhZTYwZjA4OTczYzMzMGM3NDFkMDg0NDc2OWQ5ZCIsInN1YiI6IjY0ODQwNDc2NDczNzkwNDMyMTQzMzE0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bh8FqG_ufZdtJPH6SqSFvzPBn9HFyzzgF-Mn7xrOT68';

export const fetchMovies = async (category = 'popular') => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${category}?language=ar`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'accept': 'application/json'
      }
    });
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=ar`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'accept': 'application/json'
      }
    });
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?append_to_response=videos,credits,seasons&language=ar`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'accept': 'application/json'
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

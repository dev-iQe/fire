// src/services/api.js
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '12bae60f08973cb30c741d0844769d9d';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmJhZTYwZjA4OTczYzMzMGM3NDFkMDg0NDc2OWQ5ZCIsInN1YiI6IjY0ODQwNDc2NDczNzkwNDMyMTQzMzE0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bh8FqG_ufZdtJPH6SqSFvzPBn9HFyzzgF-Mn7xrOT68';

export const fetchMovies = async (category = 'popular', language = 'ar') => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${category}?language=${language}`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'accept': 'application/json'
      }
    });
    if (!response.ok) {
      const errText = await response.text();
      console.error('TMDB error', response.status, errText);
      throw new Error(`TMDB ${response.status}: ${errText}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const searchMovies = async (query, language = 'ar') => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=${language}`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'accept': 'application/json'
      }
    });
    if (!response.ok) {
      const errText = await response.text();
      console.error('TMDB error', response.status, errText);
      throw new Error(`TMDB ${response.status}: ${errText}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id, language = 'ar') => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?append_to_response=videos,credits,seasons&language=${language}`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'accept': 'application/json'
      }
    });
    if (!response.ok) {
      const errText = await response.text();
      console.error('TMDB error', response.status, errText);
      throw new Error(`TMDB ${response.status}: ${errText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

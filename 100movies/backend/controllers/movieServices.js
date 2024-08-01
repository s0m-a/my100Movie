// backend/controllers/movieServices.js
import axios from 'axios';



const API_KEY = 'e0fee11d34aa99415d2c6d14c4f39c91';
const BASE_URL = 'https://api.themoviedb.org/3';

class MovieService {
  constructor() {
    this.apiKey = API_KEY;
    this.baseUrl = BASE_URL;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      params: {
        api_key: this.apiKey,
      },
    });
  }

  async searchMovies(query) {
    try {
      const response = await this.axiosInstance.get('/search/movie', {
        params: { query },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;

    }
  }

  async getMovieDetails(movieId) {
    try {
      const response = await this.axiosInstance.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }
}



export default new MovieService();

import axios from "axios";
import Cookies from 'js-cookie';
const url = "http://localhost:3001/";

export class ApiClient {
  constructor() {
    // Initialize axios with default headers
    this.axiosInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    });

    // Add request interceptor to ensure token is set for every request
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle auth errors
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
          window.location.href = '/unauthorized';
        }
        return Promise.reject(error);
      }
    );
  }

  getToken() {
    return Cookies.get('token');
  }

  setToken(token) {
    Cookies.set('token', token, { expires: 7 }); // Token expires in 7 days
  }

  removeToken() {
    Cookies.remove('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  async login(email, password) {
    try {
      const response = await this.axiosInstance.post(`${url}auth/login`, {
        email,
        password
      });
      this.setToken(response.data.token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async register(email, password) {
    try {
      const response = await this.axiosInstance.post(`${url}auth/register`, {
        email,
        password
      });
      this.setToken(response.data.token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  logout() {
    this.removeToken();
    window.location.href = '/user';
  }

  async getAds() {
    try {
      const response = await this.axiosInstance.get(`${url}ads`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getAd(id) {
    try {
      const response = await this.axiosInstance.get(`${url}ads/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async createAd(adData) {
    try {
      const response = await this.axiosInstance.post(`${url}ads`, adData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async updateAd(id, adData) {
    try {
      const response = await this.axiosInstance.put(`${url}ads/${id}`, adData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async deleteAd(id) {
    try {
      const response = await this.axiosInstance.delete(`${url}ads/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

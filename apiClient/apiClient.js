import axios from "axios";

const url = "http://localhost:3001/";

export class ApiClient {
  constructor() {
    this.axiosInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          this.removeToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/unauthorized';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      delete this.axiosInstance.defaults.headers['Authorization'];
    }
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  async apiCall(method, urlPath, data) {
    try {
      const response = await this.axiosInstance({
        method,
        url: url + urlPath,
        data,
      });
      return response;
    } catch (error) {
      console.error('API call error:', error.response || error);
      if (error.response && error.response.status === 401) {
        this.removeToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/unauthorized';
        }
      }
      throw error;
    }
  }

  //  EVENT METHODS
  async getEvents() {
    return this.apiCall("get", "events");
  }

  async addEvent(name, location, description, date, time) {
    return this.apiCall("post", "events", {
      name,
      location,
      description,
      date,
      time
    });
  }

  async removeEvent(id) {
    return this.apiCall("delete", `events/${id}`);
  }

  async updateEvent(id, name, location, description, date, time) {
    return this.apiCall("put", `events/${id}`, {
      name,
      location,
      description,
      date,
      time
    });
  }

  //  AUTH METHODS
  async login(email, password) {
    const response = await this.apiCall("post", "auth/login", { email, password });

    if (response.data && response.data.token) {
      this.setToken(response.data.token);
      return response;
    } else {
      throw new Error('No token received from server');
    }
  }

  logout() {
    this.removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/user';
    }
  }
}

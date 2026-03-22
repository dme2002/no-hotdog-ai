const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_VERSION = 'v1';

export const predictApi = {
  async classifyImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE_URL}/api/${API_VERSION}/predict`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  async getTelemetry() {
    const res = await fetch(`${API_BASE_URL}/api/${API_VERSION}/telemetry`);
    return res.json();
  },

  async getClassificationMix() {
    const res = await fetch(`${API_BASE_URL}/api/${API_VERSION}/stats/classification-mix`);
    return res.json();
  },

  async getHistory() {
    const res = await fetch(`${API_BASE_URL}/api/${API_VERSION}/history`);
    return res.json();
  },

  async getStatsSummary() {
    const res = await fetch(`${API_BASE_URL}/api/${API_VERSION}/stats/summary`);
    return res.json();
  },
};

export const authApi = {
  async login(credentials: { username: string; password: string }) {
    const res = await fetch(`${API_BASE_URL}/api/${API_VERSION}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async register(credentials: { username: string; email: string; password: string }) {
    const res = await fetch(`${API_BASE_URL}/api/${API_VERSION}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },

  getStoredUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },
};

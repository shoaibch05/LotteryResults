// API utility functions for admin panel

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('admin_token');
};

// Create axios-like fetch wrapper with interceptors
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
        throw new Error('Authentication required');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API methods
export const api = {
  // Authentication
  auth: {
    login: (credentials) => apiRequest('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    logout: () => apiRequest('/admin/auth/logout', {
      method: 'POST',
    }),
    refresh: () => apiRequest('/admin/auth/refresh', {
      method: 'POST',
    }),
  },

  // Posts
  posts: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiRequest(`/admin/posts${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => apiRequest(`/admin/posts/${id}`),
    create: (postData) => apiRequest('/admin/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    }),
    update: (id, postData) => apiRequest(`/admin/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    }),
    delete: (id) => apiRequest(`/admin/posts/${id}`, {
      method: 'DELETE',
    }),
    publish: (id) => apiRequest(`/admin/posts/${id}/publish`, {
      method: 'POST',
    }),
    unpublish: (id) => apiRequest(`/admin/posts/${id}/unpublish`, {
      method: 'POST',
    }),
  },

  // Users
  users: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiRequest(`/admin/users${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => apiRequest(`/admin/users/${id}`),
    create: (userData) => apiRequest('/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    update: (id, userData) => apiRequest(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
    delete: (id) => apiRequest(`/admin/users/${id}`, {
      method: 'DELETE',
    }),
    changeStatus: (id, status) => apiRequest(`/admin/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  },

  // SEO
  seo: {
    getSettings: () => apiRequest('/admin/seo/settings'),
    updateSettings: (settings) => apiRequest('/admin/seo/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),
    generateSitemap: () => apiRequest('/admin/seo/sitemap/generate', {
      method: 'POST',
    }),
    getSitemapStatus: () => apiRequest('/admin/seo/sitemap/status'),
  },

  // Site Settings
  settings: {
    get: () => apiRequest('/admin/settings'),
    update: (settings) => apiRequest('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),
  },

  // Subscribers
  subscribers: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiRequest(`/admin/subscribers${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => apiRequest(`/admin/subscribers/${id}`),
    create: (subscriberData) => apiRequest('/admin/subscribers', {
      method: 'POST',
      body: JSON.stringify(subscriberData),
    }),
    update: (id, subscriberData) => apiRequest(`/admin/subscribers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(subscriberData),
    }),
    delete: (id) => apiRequest(`/admin/subscribers/${id}`, {
      method: 'DELETE',
    }),
    export: () => apiRequest('/admin/subscribers/export'),
  },

  // Analytics
  analytics: {
    getDashboardStats: () => apiRequest('/admin/analytics/dashboard'),
    getPostStats: (postId) => apiRequest(`/admin/analytics/posts/${postId}`),
    getTrafficStats: (period = '30d') => apiRequest(`/admin/analytics/traffic?period=${period}`),
  },

  // File Upload
  upload: {
    image: (file) => {
      const formData = new FormData();
      formData.append('image', file);
      
      return apiRequest('/admin/upload/image', {
        method: 'POST',
        headers: {
          // Don't set Content-Type, let browser set it with boundary
        },
        body: formData,
      });
    },
  },
};

// Utility functions
export const apiUtils = {
  // Handle API errors consistently
  handleError: (error) => {
    console.error('API Error:', error);
    
    if (error.message === 'Authentication required') {
      return 'Please log in to continue';
    }
    
    if (error.message.includes('HTTP error! status: 403')) {
      return 'You do not have permission to perform this action';
    }
    
    if (error.message.includes('HTTP error! status: 404')) {
      return 'The requested resource was not found';
    }
    
    if (error.message.includes('HTTP error! status: 500')) {
      return 'Server error. Please try again later';
    }
    
    return error.message || 'An unexpected error occurred';
  },

  // Format API response for consistent error handling
  formatResponse: (response) => {
    if (response.success === false) {
      throw new Error(response.message || 'Request failed');
    }
    return response.data || response;
  },

  // Retry failed requests
  retry: async (fn, maxRetries = 3, delay = 1000) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  },
};

export default api;


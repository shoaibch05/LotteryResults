// Application constants

// User roles and permissions
export const USER_ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  EDITOR: 'editor',
  SUBSCRIBER: 'subscriber'
};

export const ROLE_HIERARCHY = {
  [USER_ROLES.SUPERADMIN]: 4,
  [USER_ROLES.ADMIN]: 3,
  [USER_ROLES.EDITOR]: 2,
  [USER_ROLES.SUBSCRIBER]: 1
};

export const PERMISSIONS = {
  MANAGE_USERS: 'manage_users',
  MANAGE_POSTS: 'manage_posts',
  MANAGE_SEO: 'manage_seo',
  MANAGE_SITE_SETTINGS: 'manage_site_settings',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_ADMINS: 'manage_admins',
  VIEW_POSTS: 'view_posts'
};

// Post statuses
export const POST_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

// Post categories
export const POST_CATEGORIES = [
  'Powerball',
  'Mega Millions',
  'Lotto',
  'Take 5',
  'Pick 10',
  'Quick Draw'
];

// User statuses
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended'
};

// Email statuses
export const EMAIL_STATUS = {
  PENDING: 'pending',
  SENT: 'sent',
  FAILED: 'failed',
  BOUNCED: 'bounced'
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/admin/auth/login',
    LOGOUT: '/admin/auth/logout',
    REFRESH: '/admin/auth/refresh'
  },
  POSTS: {
    BASE: '/admin/posts',
    BY_ID: (id) => `/admin/posts/${id}`,
    PUBLISH: (id) => `/admin/posts/${id}/publish`,
    UNPUBLISH: (id) => `/admin/posts/${id}/unpublish`
  },
  USERS: {
    BASE: '/admin/users',
    BY_ID: (id) => `/admin/users/${id}`,
    STATUS: (id) => `/admin/users/${id}/status`
  },
  SEO: {
    SETTINGS: '/admin/seo/settings',
    SITEMAP: {
      GENERATE: '/admin/seo/sitemap/generate',
      STATUS: '/admin/seo/sitemap/status',
      ADD: '/admin/seo/sitemap/add',
      REMOVE: '/admin/seo/sitemap/remove',
      UPDATE: '/admin/seo/sitemap/update',
      SUBMIT: '/admin/seo/sitemap/submit'
    }
  },
  SETTINGS: '/admin/settings',
  SUBSCRIBERS: {
    BASE: '/admin/subscribers',
    BY_ID: (id) => `/admin/subscribers/${id}`,
    EXPORT: '/admin/subscribers/export'
  },
  ANALYTICS: {
    DASHBOARD: '/admin/analytics/dashboard',
    POST_STATS: (id) => `/admin/analytics/posts/${id}`,
    TRAFFIC: '/admin/analytics/traffic'
  },
  UPLOAD: {
    IMAGE: '/admin/upload/image'
  },
  EMAIL: {
    SEND_POST_NOTIFICATION: '/admin/email/send-post-notification',
    SEND_WELCOME: '/admin/email/send-welcome',
    SEND_UNSUBSCRIBE_CONFIRMATION: '/admin/email/send-unsubscribe-confirmation',
    STATUS: '/admin/email/status',
    TEST: '/admin/email/test',
    STATISTICS: '/admin/email/statistics'
  }
};

// Local storage keys
export const STORAGE_KEYS = {
  ADMIN_TOKEN: 'admin_token',
  ADMIN_USER: 'admin_user',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// Form validation rules
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  POST_TITLE: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 200
  },
  POST_DESCRIPTION: {
    MAX_LENGTH: 1000
  },
  META_TITLE: {
    MAX_LENGTH: 60
  },
  META_DESCRIPTION: {
    MAX_LENGTH: 160
  }
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY h:mm A',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
};

// Time zones
export const TIME_ZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'UTC', label: 'UTC' }
];

// File upload limits
export const UPLOAD_LIMITS = {
  IMAGE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  },
  DOCUMENT: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx']
  }
};

// SEO defaults
export const SEO_DEFAULTS = {
  META_TITLE: 'Lottery Results Hub - Latest Winning Numbers',
  META_DESCRIPTION: 'Get the latest lottery results, winning numbers, and jackpot information for Powerball, Mega Millions, and more.',
  META_KEYWORDS: 'lottery, results, winning numbers, jackpot, powerball, mega millions',
  OG_TITLE: 'Lottery Results Hub - Latest Winning Numbers',
  OG_DESCRIPTION: 'Get the latest lottery results, winning numbers, and jackpot information.',
  TWITTER_CARD: 'summary_large_image'
};

// Sitemap settings
export const SITEMAP_SETTINGS = {
  CHANGEFREQ: {
    HOMEPAGE: 'daily',
    CATEGORY: 'daily',
    POST: 'weekly',
    STATIC: 'monthly'
  },
  PRIORITY: {
    HOMEPAGE: '1.0',
    CATEGORY: '0.8',
    POST: '0.6',
    STATIC: '0.4'
  }
};

// Email settings
export const EMAIL_SETTINGS = {
  BATCH_SIZE: 100,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  RATE_LIMIT: 100 // emails per hour
};

// Analytics periods
export const ANALYTICS_PERIODS = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '1y', label: 'Last year' }
];

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  POST_CREATED: 'Post created successfully!',
  POST_UPDATED: 'Post updated successfully!',
  POST_DELETED: 'Post deleted successfully!',
  USER_CREATED: 'User created successfully!',
  USER_UPDATED: 'User updated successfully!',
  USER_DELETED: 'User deleted successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  SITEMAP_GENERATED: 'Sitemap generated successfully!',
  EMAIL_SENT: 'Email sent successfully!'
};

// Theme colors
export const THEME_COLORS = {
  PRIMARY: '#004990',
  SECONDARY: '#d32f2f',
  ACCENT: '#ffd600',
  SUCCESS: '#4caf50',
  WARNING: '#ff9800',
  ERROR: '#f44336',
  INFO: '#2196f3'
};

// Breakpoints
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px'
};

export default {
  USER_ROLES,
  ROLE_HIERARCHY,
  PERMISSIONS,
  POST_STATUS,
  POST_CATEGORIES,
  USER_STATUS,
  EMAIL_STATUS,
  API_ENDPOINTS,
  STORAGE_KEYS,
  VALIDATION_RULES,
  PAGINATION,
  DATE_FORMATS,
  TIME_ZONES,
  UPLOAD_LIMITS,
  SEO_DEFAULTS,
  SITEMAP_SETTINGS,
  EMAIL_SETTINGS,
  ANALYTICS_PERIODS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  THEME_COLORS,
  BREAKPOINTS
};


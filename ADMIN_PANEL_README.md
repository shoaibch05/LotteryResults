# Lottery Admin Panel

A fully functional, lightweight admin panel for the lottery website built with React, TailwindCSS, and optimized for Core Web Vitals.

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication with HttpOnly cookies
- Role-based access control (Super Admin, Admin, Editor, Subscriber)
- Protected routes with permission checking
- Secure login/logout functionality

### Dashboard
- Overview statistics (posts, subscribers, categories, page views)
- Recent posts with quick actions
- System status monitoring
- Quick action shortcuts

### Posts Management
- Full CRUD operations for lottery results
- Category-based organization (Powerball, Mega Millions, Lotto, etc.)
- Rich form fields (draw date, winning numbers, jackpot, description)
- SEO metadata management
- Automatic sitemap updates
- Email notifications to subscribers

### User Management
- Create, edit, delete users
- Role assignment and management
- User status control (active, inactive, suspended)
- Permission-based access control

### SEO & Sitemap
- Site-wide SEO settings
- Meta tags management
- Open Graph and Twitter Card settings
- Automatic sitemap generation
- Search engine submission tools

### Site Settings
- General site configuration
- Feature toggles
- Performance settings
- Maintenance mode

## 🏗️ Architecture

### Folder Structure
```
src/
├── context/
│   ├── AuthContext.jsx          # Authentication state management
│   └── RoleContext.jsx          # Role-based permissions
├── components/admin/
│   ├── layout/
│   │   ├── AdminLayout.jsx      # Main admin layout wrapper
│   │   ├── AdminSidebar.jsx     # Navigation sidebar
│   │   └── AdminNavbar.jsx      # Top navigation bar
│   ├── dashboard/
│   │   ├── DashboardStats.jsx   # Statistics cards
│   │   └── RecentPosts.jsx      # Recent posts widget
│   ├── posts/
│   │   ├── PostList.jsx         # Posts listing with filters
│   │   ├── CreatePost.jsx       # Create new post form
│   │   └── EditPost.jsx         # Edit existing post form
│   ├── users/
│   │   └── ManageUsers.jsx      # User management interface
│   └── seo/
│       └── SEOSettings.jsx      # SEO configuration
├── Pages/admin/
│   ├── Login.jsx                # Admin login page
│   ├── Dashboard.jsx            # Main dashboard
│   ├── Posts.jsx                # Posts management page
│   ├── Users.jsx                # User management page
│   ├── SEO.jsx                  # SEO settings page
│   └── SiteSettings.jsx         # Site configuration page
├── routes/
│   ├── PublicRoutes.jsx         # Public site routes
│   ├── AdminRoutes.jsx          # Admin panel routes
│   └── ProtectedRoute.jsx       # Route protection wrapper
└── utils/
    ├── api.js                   # API utility functions
    ├── sitemap.js               # Sitemap management
    ├── emailService.js          # Email notification service
    └── constants.js             # Application constants
```

### Key Components

#### Authentication Flow
1. User visits `/admin/login`
2. Enters credentials and submits form
3. AuthContext handles login and stores JWT token
4. RoleContext provides role-based permissions
5. ProtectedRoute checks authentication and permissions
6. User is redirected to appropriate admin page

#### Role-Based Permissions
- **Super Admin**: Full access to everything including managing admins
- **Admin**: Can manage everything except Super Admin
- **Editor**: Can create, update, and view posts; can access SEO management
- **Subscriber**: Read-only access (for email notifications)

#### Performance Optimizations
- React.lazy for code splitting
- React.memo for component memoization
- useCallback and useMemo for expensive operations
- TailwindCSS JIT for minimal CSS output
- Vite chunk splitting for optimal loading
- CSS containment for better rendering performance

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Existing Vite + React + TailwindCSS project

### Installation
The admin panel is already integrated into your existing project. No additional installation required.

### Environment Variables
Add these to your `.env` file:
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_SITE_URL=https://yourdomain.com
```

## 🚀 Usage

### Accessing the Admin Panel
1. Navigate to `/admin/login`
2. Use demo credentials:
   - **Super Admin**: `superadmin` / `1234`
   - **Admin**: `admin` / `1234`
   - **Editor**: `editor` / `1234`

### Creating Posts
1. Go to **Posts** → **Create New Post**
2. Fill in the required fields:
   - Title, Category, Status
   - Draw Date, Winning Numbers, Jackpot
   - Description and SEO metadata
3. Save as draft or publish immediately
4. Post is automatically added to sitemap
5. Email notifications sent to subscribers

### Managing Users
1. Go to **Users** (Admin/Super Admin only)
2. Create new users with appropriate roles
3. Edit existing users and change their status
4. Delete users (except Super Admin)

### SEO Management
1. Go to **SEO Settings** (Editor/Admin/Super Admin)
2. Configure site-wide SEO settings
3. Generate and update sitemap
4. Submit to search engines

## 🔌 API Integration

### Backend Endpoints Required
```
POST /api/admin/auth/login          # User authentication
GET  /api/admin/posts               # Get all posts
POST /api/admin/posts               # Create new post
PUT  /api/admin/posts/:id           # Update post
DELETE /api/admin/posts/:id         # Delete post
GET  /api/admin/users               # Get all users
POST /api/admin/users               # Create new user
PUT  /api/admin/users/:id           # Update user
DELETE /api/admin/users/:id         # Delete user
GET  /api/admin/seo/settings        # Get SEO settings
PUT  /api/admin/seo/settings        # Update SEO settings
POST /api/admin/seo/sitemap/generate # Generate sitemap
GET  /api/admin/subscribers         # Get subscribers
POST /api/admin/email/send-post-notification # Send email notifications
```

### Middleware Required
- `verifyToken` - JWT token verification
- `checkRole` - Role-based access control

## 🎨 Styling

### Design System
- **Colors**: Blue-800 primary, Gray-100 background, White cards
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent 4px grid system
- **Components**: WordPress-style admin interface

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Collapsible sidebar on mobile
- Touch-friendly interface

## 🔒 Security Features

### Authentication Security
- JWT tokens stored in HttpOnly cookies
- Automatic token refresh
- Secure logout with token invalidation
- Password hashing (backend responsibility)

### Authorization Security
- Role-based access control
- Permission checking on every route
- API endpoint protection
- Client-side and server-side validation

### Data Protection
- Input sanitization
- XSS prevention
- CSRF protection
- Secure API communication

## 📊 Performance Metrics

### Core Web Vitals Optimizations
- **LCP (Largest Contentful Paint)**: Optimized with lazy loading
- **CLS (Cumulative Layout Shift)**: Prevented with proper sizing
- **INP (Interaction to Next Paint)**: Optimized with React.memo and useCallback

### Bundle Optimization
- Code splitting by admin sections
- Vendor chunk separation
- Tree shaking for unused code
- Compression with Brotli

## 🧪 Testing

### Demo Data
The admin panel includes mock data for demonstration:
- Sample posts with different categories
- Mock user accounts with various roles
- Simulated statistics and analytics

### Testing Credentials
- **Super Admin**: `superadmin` / `1234`
- **Admin**: `admin` / `1234`
- **Editor**: `editor` / `1234`

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Production Optimizations
- Minified JavaScript and CSS
- Compressed assets
- Optimized images
- CDN-ready static files

### Environment Configuration
- Set production API URL
- Configure email service
- Set up SSL certificates
- Configure CORS policies

## 🔧 Customization

### Adding New Features
1. Create component in appropriate folder
2. Add route to AdminRoutes.jsx
3. Update sidebar navigation
4. Add permissions if needed
5. Update API endpoints

### Styling Customization
- Modify TailwindCSS classes
- Update color scheme in constants.js
- Customize component styles
- Add new utility classes

### Role Customization
- Update ROLE_PERMISSIONS in RoleContext.jsx
- Add new permissions to constants.js
- Update component access controls
- Modify API middleware

## 📝 License

This admin panel is part of the lottery website project and follows the same license terms.

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for new components (if applicable)
3. Follow the established naming conventions
4. Add proper error handling
5. Include performance optimizations
6. Test with different user roles

## 📞 Support

For issues or questions about the admin panel:
1. Check the existing documentation
2. Review the code comments
3. Test with demo credentials
4. Check browser console for errors
5. Verify API endpoints are working

---

**Note**: This admin panel is designed to work with a Node.js backend. Make sure your backend implements the required API endpoints and middleware for full functionality.


# Nextflix Web Appliation

สร้างแอพพลิเคชัน Nextflix โดยใช้ NextJs และ NestJs

## 🌟 Project Overview

This project is a comprehensive Netflix clone consisting of:
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: NestJS + Clean Architecture + TMDB Integration  
- **Real Data**: Live movie data from The Movie Database API

## 🚀 Key Features

### Core Functionality
- **🏠 Homepage**: Hero section with featured movie and popular movie carousels
- **🎭 Movie Details**: Complete movie information pages with ratings, cast, and synopsis
- **🔍 Real-time Search**: Instant movie search with debounced queries and grid layout
- **📱 Responsive Design**: Full responsive design (mobile, tablet, desktop)

### Technical Features
- **🏗️ Clean Architecture**: Clear separation of concerns with Domain, Application, and Infrastructure layers
- **🎯 State Management**: React Query for caching and server state management
- **🎨 Netflix UI**: Authentic Netflix design with hover effects, gradients, and animations
- **📡 RESTful API**: Comprehensive backend with Swagger documentation
- **🔄 Error Handling**: Robust error handling throughout the application
- **🎪 Professional Icons**: Custom SVG icons for search, notifications, and interface elements

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: @tanstack/react-query
- **HTTP Client**: Axios
- **Icons**: Custom SVG + Lucide React

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **API Integration**: TMDB (The Movie Database)
- **Documentation**: Swagger/OpenAPI
- **Validation**: Class-validator

## 🏗️ Architecture Overview

### Clean Architecture Pattern
```
📁 netflix-backend/src/
├── 🏢 presentation/     # Controllers, DTOs, HTTP handling
├── 🎯 application/      # Use cases, Services, Business logic  
├── 🏗️ infrastructure/  # External APIs, Database integrations
├── 🎪 domain/          # Entities, Interfaces, Domain logic
└── 🚀 main.ts          # Application bootstrap
```

### Frontend Architecture
```
📁 nextflix-frontend/src/
├── 🎪 app/             # Next.js App Router (pages)
├── 🧩 components/      # Reusable UI components 
├── 📚 hooks/           # Custom React hooks
├── 📚 lib/             # Utilities and configurations
└── 📝 types/           # TypeScript type definitions
```

## 🚀 Quick Start

### Prerequisites
- Node.js version 18.0.0 or later
- npm version 8.0.0 or later  
- TMDB API key (free registration required)

### Installation Instructions

#### 1. Clone Repository
```bash
git clone <your-repository-url>
cd nextflix
```

#### 2. Setup Backend
```bash
# Navigate to backend directory
cd netflix-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add your TMDB API key to .env:
# TMDB_API_KEY=your_api_key_here
# PORT=3001
# NODE_ENV=development

# Start backend server
npm run start:dev
```
Backend will be available at `http://localhost:3001`

#### 3. Setup Frontend
```bash
# Navigate to frontend directory (open new terminal)
cd nextflix-frontend

# Install dependencies  
npm install

# Setup environment variables
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001

# Start frontend server
npm run dev
```
Frontend will be available at `http://localhost:3000`

### Getting TMDB API Key
1. Register at [The Movie Database](https://www.themoviedb.org/)
2. Navigate to Settings > API
3. Request an API key (usually approved instantly)
4. Add to your `.env` file in the backend

## 📁 Project Structure

### Frontend Structure
```
📁 nextflix-frontend/
├── 📁 src/
│   ├── 📁 app/                  # Next.js App Router
│   │   ├── 📄 globals.css       # Global styles & Netflix theme
│   │   ├── 📄 layout.tsx        # Root layout component
│   │   ├── 📄 page.tsx          # Homepage with hero & movies
│   │   ├── 📁 movie/[id]/       # Dynamic movie detail pages
│   │   │   └── 📄 page.tsx      # Movie detail page
│   │   └── 📁 search/           # Search functionality
│   │       └── 📄 page.tsx      # Search results page
│   ├── 📁 components/ui/        # Reusable UI components
│   │   ├── 📄 movie-card.tsx    # Interactive movie cards
│   │   ├── 📄 loading.tsx       # Loading skeletons
│   │   ├── 📄 error.tsx         # Error boundaries
│   │   └── 📄 empty.tsx         # Empty states
│   ├── 📁 hooks/               # Custom React hooks
│   │   └── 📄 use-movies.ts    # Movie-related API hooks
│   ├── 📁 lib/                 # Configuration & utilities
│   │   ├── 📄 api.ts           # Axios API client
│   │   └── 📄 query-client.ts  # React Query setup
│   └── 📁 types/               # TypeScript definitions
│       └── 📄 movie.ts         # Movie type interfaces
├── 📄 next.config.ts           # Next.js configuration
├── 📄 tailwind.config.ts       # Tailwind CSS setup
└── 📄 package.json            # Dependencies & scripts
```

### Backend Structure  
```
📁 netflix-backend/
├── 📁 src/
│   ├── 📁 presentation/        # API Layer
│   │   └── 📁 controllers/     # REST endpoints
│   │       └── 📄 movie.controller.ts
│   ├── 📁 application/         # Business Logic Layer
│   │   ├── 📁 services/        # Use cases & business rules
│   │   │   └── 📄 movie.service.ts
│   │   └── 📁 dto/            # Data Transfer Objects
│   │       └── 📄 movie.dto.ts
│   ├── 📁 infrastructure/      # External Services Layer
│   │   └── 📁 api/            # External API integrations
│   │       └── 📄 tmdb.service.ts
│   └── 📁 domain/             # Domain Layer
│       ├── 📁 entities/       # Domain models
│       │   └── 📄 movie.entity.ts
│       └── 📁 interfaces/     # Repository contracts
│           └── 📄 movie.repository.interface.ts
├── 📄 main.ts                 # Application bootstrap
└── 📄 package.json           # Dependencies & scripts
```

## 🎯 API Endpoints

### Movie API Routes
```http
GET /api/movies/homepage      # Homepage data (hero + sections)
GET /api/movies/popular       # Popular movies list
GET /api/movies/trending      # Trending movies (day/week)
GET /api/movies/top-rated     # Highest rated movies
GET /api/movies/search        # Search movies by query
GET /api/movies/:id          # Individual movie details
GET /api/movies/genres       # All available genres
GET /api/movies/genre/:id    # Movies by specific genre
```

### API Documentation
- **Swagger UI**: `http://localhost:3001/api/docs`
- **OpenAPI Spec**: Auto-generated documentation
- **Interactive Testing**: Try APIs directly from browser

## 🎨 Design System

### Netflix Brand Colors
```css
--netflix-red: #E50914;     /* Primary brand color */
--background: #000000;      /* Main background */
--foreground: #FFFFFF;      /* Primary text */
--accent-gray: #564D4D;     /* Secondary elements */
```

### Typography
- **Font**: Netflix Sans (fallback: Helvetica Neue, Arial)
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)
- **Responsive**: Fluid typography scaling across devices

### Component Design Principles
- **Mobile-First**: Progressive enhancement from mobile to desktop
- **Hover States**: Subtle animations and feedback
- **Loading States**: Skeleton screens for perceived performance
- **Error Handling**: User-friendly error messages with retry options

## 🔧 Available Scripts

### Frontend Commands
```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Create production build
npm run start        # Serve production build
npm run lint         # Run ESLint code quality checks
npm run type-check   # TypeScript compilation check
```

### Backend Commands
```bash
npm run start:dev    # Development server with hot reload
npm run start:prod   # Production server
npm run build        # Compile TypeScript to JavaScript
npm run lint         # ESLint code quality checks
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
```

## 🚀 Production Deployment

### Environment Setup
Create production environment files:

**Backend (.env.production)**
```env
TMDB_API_KEY=your_production_api_key
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

**Frontend (.env.production.local)**
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NODE_ENV=production
```

### Build & Deploy
```bash
# Backend
cd netflix-backend
npm run build
npm run start:prod

# Frontend  
cd nextflix-frontend
npm run build
npm run start
```

## 🐛 Troubleshooting

### Common Issues & Solutions

1. **❌ API Connection Failed**
   ```bash
   # Check if backend is running
   curl http://localhost:3001/api/movies/homepage
   
   # Verify CORS settings in main.ts
   # Check NEXT_PUBLIC_API_URL in .env.local
   ```

2. **❌ TMDB Images Not Loading**
   ```javascript
   // Check next.config.ts has image domains configured:
   images: {
     remotePatterns: [
       {
         hostname: 'image.tmdb.org',
         pathname: '/t/p/**',
       },
     ],
   }
   ```

3. **❌ TMDB API Key Error**
   ```bash
   Error: TMDB_API_KEY is not defined
   ```
   **Solution**: Ensure your `.env` file contains a valid TMDB API key

4. **❌ CORS Errors**
   ```
   Access-Control-Allow-Origin error
   ```
   **Solution**: Update CORS configuration in `main.ts`

## 🎯 Performance Optimizations

- **Image Optimization**: Next.js automatically optimizes all images
- **React Query Caching**: Intelligent background refetching & caching
- **Code Splitting**: Automatic route-based code splitting
- **Skeleton Loading**: Perceived performance improvements
- **Debounced Search**: Reduces API calls during typing

## 🏗️ Clean Architecture Benefits

### 1. Domain Layer
- Contains core business entities and rules
- Independent of external frameworks
- Defines interfaces for data access

### 2. Application Layer
- Implements use cases and business logic
- Orchestrates data flow between layers
- Contains application-specific business rules

### 3. Infrastructure Layer
- Handles external API communications
- Implements data access patterns
- Manages external service integrations

### 4. Presentation Layer
- HTTP request/response handling
- Input validation and transformation
- API documentation and contracts

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow Clean Architecture principles
4. Add tests for new functionality
5. Update documentation
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open Pull Request

### Code Standards
- **TypeScript**: Use strict type checking
- **ESLint**: Follow configured linting rules
- **Prettier**: Maintain consistent code formatting
- **Clean Architecture**: Respect layer boundaries
- **Testing**: Write tests for all new features

## 🙏 Acknowledgments

- **[TMDB API](https://www.themoviedb.org/)** - Movie data provider
- **[Next.js](https://nextjs.org/)** - React framework
- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Query](https://tanstack.com/query)** - Server state management
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Swagger](https://swagger.io/)** - API documentation

---

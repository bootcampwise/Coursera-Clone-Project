# Coursera Clone – Level 3

## 1. Project Overview
Build a **modern, scalable e-learning platform** similar to Coursera where learners can browse, enroll, and learn from courses, and instructors can manage content. The system must follow **industry best practices**, clean architecture, and production-ready standards.

This document is a **single source of truth** for development. The agent must strictly follow this flow, structure, and conventions.

---

## 2. Core Objectives
- Clean separation of **frontend** and **backend**
- Scalable folder structure (enterprise-grade)
- Secure authentication & role-based access
- Performance-optimized APIs
- Testable, maintainable, and readable code
- Analytics-ready architecture

---

## 3. Tech Stack (Fixed)

### Frontend
- React + TypeScript
- Redux Toolkit
- React Router
- Axios
- Cypress (E2E)

### Backend
- Node.js + Express
- Prisma ORM
- MongoDB
- JWT Authentication
- Mocha + Chai (tests)

---

## 4. Roles & Access Control (RBAC)

### Roles
- **Learner**: browse, enroll, watch videos, track progress, review courses
- **Instructor**: create/manage courses, upload videos, view analytics
- **Admin (optional)**: moderation, platform overview

### Rules
- JWT required for all protected routes
- Role checks via middleware
- No role logic inside controllers (use guards/middleware)

---

## 5. Frontend Folder Structure (World-Class Standard)

```
frontend/
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ store.ts
│  │  └─ hooks.ts
│  ├─ assets/
│  │  ├─ images/
│  │  └─ icons/
│  ├─ constants/
│  │  ├─ colors.ts
│  │  ├─ fonts.ts
│  │  └─ images.ts
│  ├─ components/
│  │  ├─ common/
│  │  ├─ layout/
│  │  └─ ui/
│  ├─ features/
│  │  ├─ auth/
│  │  │  ├─ authSlice.ts
│  │  │  ├─ authApi.ts
│  │  │  └─ types.ts
│  │  ├─ courses/
│  │  ├─ enrollment/
│  │  ├─ reviews/
│  │  └─ progress/
│  ├─ pages/
│  │  ├─ Home/
│  │  ├─ CourseDetail/
│  │  ├─ Dashboard/
│  │  ├─ Instructor/
│  │  └─ Auth/
│  ├─ routes/
│  │  └─ AppRoutes.tsx
│  ├─ services/
│  │  ├─ apiClient.ts
│  │  └─ endpoints.ts
│  ├─ styles/
│  ├─ types/
│  ├─ utils/
│  │  ├─ helpers.ts
│  │  └─ validators.ts
│  ├─ App.tsx
│  └─ main.tsx
├─ cypress/
├─ .env.example
└─ package.json
```

### Constants Rules (Strict)
- **ALL colors, fonts, and static images must come from `/constants`**
- No hardcoded hex colors in components
- No direct image imports from assets inside components
- Use named exports only

---

## 6. Backend Folder Structure (Scalable & Clean)

```
backend/
├─ src/
│  ├─ config/
│  │  ├─ env.ts
│  │  ├─ jwt.ts
│  │  └─ prisma.ts
│  ├─ modules/
│  │  ├─ auth/
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.service.ts
│  │  │  ├─ auth.routes.ts
│  │  │  └─ auth.schema.ts
│  │  ├─ users/
│  │  ├─ courses/
│  │  ├─ enrollments/
│  │  ├─ reviews/
│  │  └─ progress/
│  ├─ middlewares/
│  │  ├─ auth.middleware.ts
│  │  ├─ role.middleware.ts
│  │  └─ error.middleware.ts
│  ├─ utils/
│  │  ├─ ApiError.ts
│  │  ├─ asyncHandler.ts
│  │  └─ constants.ts
│  ├─ routes.ts
│  ├─ app.ts
│  └─ server.ts
├─ prisma/
│  └─ schema.prisma
├─ test/
├─ .env.example
└─ package.json
```

### Backend Rules
- Controllers: request/response only
- Services: all business logic
- Prisma access only inside services
- Centralized error handling

---

## 7. Database Design (High-Level)

### User
- id
- name
- email
- passwordHash
- role

### Course
- id
- title
- description
- category
- difficulty
- instructorId

### Enrollment
- id
- userId
- courseId
- progress
- completed

### Review
- id
- userId
- courseId
- rating
- comment

---

## 8. API Design Guidelines

### Principles
- RESTful naming
- Versioned APIs (`/api/v1`)
- Proper HTTP status codes

### Example
```
GET    /api/v1/courses
POST   /api/v1/auth/login
POST   /api/v1/enrollments
GET    /api/v1/progress/:courseId
```

---

## 9. State Management Rules (Redux Toolkit)
- One slice per domain
- Async logic via `createAsyncThunk`
- No direct API calls in UI
- Normalized state where possible

---

## 10. Video Player & Progress
- Save progress after fixed intervals
- Resume from last timestamp
- Progress update via debounced API calls

---

## 11. Testing Strategy

### Frontend
- Cypress for user flows
- Auth, enroll, video, dashboard flows

### Backend
- Mocha + Chai
- Services + API route tests

---

## 12. Performance, Security & Clean Code Standards

### Clean Code Rules (Mandatory)
- ❌ No inline comments explaining obvious code
- ❌ No commented-out code
- ✅ Code must be self-explanatory via naming
- ✅ Small, pure, readable functions

### Formatting & Style
- Prettier enforced (single standard)
- ESLint enabled, no ignored rules
- One responsibility per file

### Naming Conventions
- **Components:** PascalCase (`CourseCard.tsx`)
- **Hooks:** camelCase starting with `use` (`useAuth.ts`)
- **Variables & functions:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **Redux slices:** featureNameSlice (`authSlice`)
- **Files:** kebab-case or camelCase (consistent per folder)

### Do
- Centralize constants
- Reuse components
- Validate everything
- Use memoization where needed

### Don’t
- No magic numbers
- No hardcoded styles
- No console logs in production
- No mixed concerns in files

---

## 13. Environment Variables

### Frontend
```
VITE_API_BASE_URL=
```

### Backend
```
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
```

---

## 14. Deployment Checklist
- Remove unused assets
- Run all tests
- Build frontend
- Attach GitHub repo
- Attach live deploy link
- Post on LinkedIn (#TechloSet #BootcampWise)

---

## 15. Final Quality Bar
This project must look and feel like a **real startup MVP**, not a demo.

**If it’s not scalable, readable, and testable — it’s not acceptable.**


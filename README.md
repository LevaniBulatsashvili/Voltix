# ⚡ Voltix – Modern Tech eCommerce Platform

Voltix is a modern, scalable eCommerce storefront built with React and TypeScript.  
It simulates a real-world online tech marketplace with advanced UI architecture, state management, and production-level structure.

> Designed as a frontend-first application with Supabase as the backend.

---

## 🧠 Project Motivation

The goal of Voltix was to build a production-ready eCommerce frontend that demonstrates:

- Scalable feature-based architecture
- Clean component structure following SOLID principles
- Advanced state management with Redux and TanStack Query
- Real Supabase backend with auth, storage, and database
- Real-world business logic (cart, orders, wishlist, admin)
- Modern UI/UX practices with full i18n support (EN/KA)

---

## 🛠 Tech Stack

### Core

- **React 19** + **Vite** — UI and build tooling
- **TypeScript** — type safety throughout
- **React Router v7** — client-side routing
- **TanStack Query v5** — server state, caching, mutations
- **Redux Toolkit** — client state (cart, auth, settings, theme)
- **TailwindCSS v4** — utility-first styling

### Backend

- **Supabase** — database, auth, file storage

### Forms & Validation

- **React Hook Form** + **Zod** — form state and schema validation

### UI & UX

- **Lucide React** — icons
- **React Toastify** — notifications
- **GSAP** — animations
- **react-i18next** — internationalization (English / Georgian)
- **browser-image-compression** — client-side WebP image optimization

---

## ✨ Features

- 🛍️ Product catalog with filtering, search, and pagination
- 🔍 Search with brand, price, rating, and discount filters
- 🛒 Cart with currency conversion and order creation
- ❤️ Wishlist
- 👤 User profile with avatar upload, email/password change
- 📦 Order history
- 🔐 Auth (login, register, email verification)
- 🌐 Full i18n — English and Georgian
- 🌙 Theme support
- 🛠️ Admin panel — product CRUD with image upload (WebP optimized)
- 🏷️ Promo code system with expiry and percentage discounts
- ⭐ Product reviews with star ratings
- 📋 Order management with cancellation and real-time updates

---

## 🧱 Project Architecture

Feature-based folder structure:

```
src/
├── assets/
│   ├── animations/
│   └── images/
├── components/
│   ├── button/
│   ├── cards/
│   ├── carousel/
│   ├── feedback/
│   ├── form/
│   │   └── Input/
│   ├── inputs/
│   ├── skeleton/
│   └── ui/
│       ├── modal/
│       ├── search/
│       └── table/
├── features/
│   ├── admin/
│   │   ├── components/
│   │   └── product/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── schemas/
│   ├── auth/
│   │   ├── components/
│   │   ├── login/
│   │   ├── register/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   └── verification/
│   ├── public/
│   │   ├── category/
│   │   ├── product/
│   │   ├── products/
│   │   └── search/
│   ├── shared/
│   │   └── imageSelector/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── utils/
│   └── user/
│       ├── cart/
│       ├── orders/
│       ├── profile/
│       ├── settings/
│       └── wishlist/
├── hooks/
├── layouts/
│   ├── footer/
│   ├── header/
│   └── utils/
├── lib/
│   ├── i18n/
│   ├── react-query/
│   ├── supabase/
│   └── toast/
├── pages/
│   ├── admin/
│   ├── auth/
│   ├── error/
│   ├── public/
│   └── user/
├── providers/
├── routes/
├── store/
├── types/
│   ├── auth/
│   ├── common/
│   ├── header/
│   ├── public/
│   └── user/
└── utils/
```

---

## 🚀 Installation

```bash
git clone https://github.com/LevaniBulatsashvili/Voltix.git
cd voltix
npm install
```

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```bash
npm run dev
```

---

## 📜 Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start development server            |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview production build            |
| `npm run lint`    | Run ESLint                          |

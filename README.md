# 🏛️ PastPortals — Historical Artifact Tracker & Archive

<div align="center">

![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12-5A0EF8?logo=daisyui&logoColor=white)
![TanStack_Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=react-query&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)
![Zod](https://img.shields.io/badge/Zod-Schema_Validation-3E67B1?logo=zod&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**PastPortals** is a modern, museum-grade web portal built for history enthusiasts, researchers, and archaeologists. Explore relics, uncover historical contexts and discovery timelines, track artifacts across the globe, and contribute your own findings with rich media uploads.

</div>

---

## 📖 Overview

**PastPortals** allows users to discover ancient treasures, study their historical epochs, and maintain a curated personal collection. The platform offers a silky-smooth, responsive user experience backed by client-side image cropping, optimistic state updates, schema-first validations, and JWT-secured communications.

---

## ✨ Key Features

- **🔐 Dual Authentication & Profile Management**:
  - Secure Email/Password registration & login via Firebase Authentication.
  - 1-Click Google OAuth Sign-in.
  - Dedicated Profile page with user profile picture upload, cropping, and instant profile data updates.
  - JWT token verification with Axios interceptors (`useAxiosSecure`) guarding private endpoints.

- **📸 Direct Image Upload & Client-Side Cropping**:
  - Seamless image uploads for both user avatars and artifact relics via `useUploadImage` mutations.
  - Integrated **ImageCropModal** powered by `react-easy-crop` for high-precision thumbnail adjustments before uploading.

- **⚡ Optimistic Heart/Like System**:
  - Instant like/unlike interactions with zero perceived network latency via TanStack React Query optimistic caching (`useLikeArtifact`).
  - View personalized liked artifacts in the dedicated **My Liked Artifacts** collection.

- **🛡️ Schema-First Validation (Zod)**:
  - Strong, real-time client-side validation across all forms:
    - `artifact.validation.js` — validates title, historical timeline, context, and media.
    - `signUp.validation.js` & `signIn.validation.js` — ensures strong credentials and matching passwords.
    - `profile.validation.js` — validates display name and photo updates.
  - Granular, field-level error messages directly in the UI.

- **🏛️ Complete Artifact Management (CRUD)**:
  - **Explore**: Browse artifacts with dynamic search and instant filtering.
  - **Contribute**: Add new historical artifacts with epoch details, discovery context, present location, and imagery.
  - **Manage**: View and update your contributed relics via **UpdateMyArtifact** modal or safely remove them with SweetAlert2 confirmation.

- **🎨 Modern Luxury UI & Micro-interactions**:
  - Smooth scrolling experience powered by **Lenis**.
  - Dynamic fluid animations and layout transitions using **Motion** (`motion.animation.js`).
  - Skeleton loading states (`CardSkelton.jsx`) for improved perceived performance.
  - Interactive carousels, responsive modals, and alert systems via SweetAlert2 & React Toastify.

- **📬 Newsletter & Community**:
  - Direct subscriber outreach pipeline powered by **EmailJS**.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite 6 |
| **Routing** | React Router DOM (v7) with `ScrollToTop` |
| **Styling & UI** | Tailwind CSS 3.4, DaisyUI 4.12, Sass |
| **Animations & UI UX** | Motion (Framer Motion), Lenis Smooth Scroll, Swiper, React Fast Marquee, React CountUp |
| **Image Processing** | React Easy Crop (`ImageCropModal`) |
| **State & Data Fetching**| TanStack React Query v5 (Optimistic UI, Mutations, Invalidation) |
| **Form & Validation** | Zod v4 |
| **HTTP & API** | Axios (with centralized `useAxios` & `useAxiosSecure` interceptors) |
| **Authentication** | Firebase Authentication (Email/Password & Google OAuth) |
| **Notifications** | SweetAlert2, React Toastify |
| **Utilities** | Moment.js, React Icons, LocalForage |

---

## 📁 Project Structure

```bash
src/
├── animation/              # Framer Motion animation variants & utilities
├── assets/                 # Static images, sliders, and graphics
├── components/
│   └── shared/             # Reusable UI (CardSkelton, ImageCropModal, Loader, Logo, SocialLogin)
├── firebase/
│   └── firebase.config.js  # Firebase app initialization & auth configuration
├── hooks/                  # Centralized custom hooks & React Query mutations
│   ├── useArtifact.jsx     # Artifact queries & mutations (get, add, update, delete, like)
│   ├── useAxios.jsx        # Axios public & secure instances with interceptors
│   ├── useMyArtifact.jsx   # Hooks for user's contributed & liked artifacts
│   └── useUploadImage.jsx  # Image upload mutations (artifact & user avatars)
├── layout/                 # Layout wrappers (Navbar, Footer, Root, PrivateLayout)
├── pages/
│   ├── about/              # About Us & platform mission
│   ├── artifacts/          # AllArtifacts, AddArtifacts, ArtifactDetails
│   ├── auth/               # Login, Register, Auth wrapper
│   ├── error/              # 404 & route error fallback
│   ├── home/               # Landing page, Banner, HighestLike, MuseumInfo, FAQ, Newsletter
│   ├── my-artifacts/       # MyArtifacts, MyLikedArtifacts, UpdateMyArtifact modal
│   └── profile/            # User profile view, edit details modal, header
├── provider/               # AuthProvider & global React Context
├── router/                 # React Router definitions & ScrollToTop
├── validation/             # Zod validation schemas (artifact, profile, signIn, signUp)
├── index.css               # Global styling, Tailwind directives & custom utilities
└── main.jsx                # Application root mount
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### 1. Clone the repository
```bash
git clone https://github.com/tm-fuad05/past-portals-client.git
cd past-portals-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and provide your Firebase credentials:

```env
VITE_apiKey="your_firebase_api_key"
VITE_authDomain="your_auth_domain"
VITE_projectId="your_project_id"
VITE_storageBucket="your_storage_bucket"
VITE_messagingSenderId="your_messaging_sender_id"
VITE_appId="your_app_id"
VITE_measurementId="your_measurement_id"
```

> [!NOTE]
> The client connects to the backend API via the configured `baseURL` in [`useAxios.jsx`](file:///home/nafu2907/Projects/past-portals-client/src/hooks/useAxios.jsx). Adjust it if running against a local server (`http://localhost:5000/api/v1`).

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 5. Build for Production
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

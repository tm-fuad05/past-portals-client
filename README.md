# 🏛️ PastPortals — Historical Artifact Tracker & Archive


## 📖 Overview

**PastPortals** is an interactive, museum-grade web portal built for history enthusiasts, researchers, and archaeologists. Users can explore ancient relics, view historical contexts, discover discovery timelines, track current artifact locations, and contribute their own findings to the global archive.

---

## ✨ Key Features

- **🔐 Dual Authentication & Security**:
  - Email & Password registration and login with Firebase Authentication.
  - Seamless 1-Click Google Sign-in.
  - JWT token verification and protected private routes.
- **⚡ Optimistic Heart/Like System**:
  - Real-time like counter with zero perceived latency using custom optimistic state hooks.
- **🛡️ Schema-First Validation (Zod)**:
  - Strong, real-time client-side input validation for registration, login, and artifact submissions.
  - Instant UI feedback with granular field-level error messages.
- **🏛️ Complete Artifact Management (CRUD)**:
  - **Explore**: Browse artifacts with real-time search and category filtering.
  - **Contribute**: Add new artifacts with rich historical chronicles, epochs, and origins.
  - **Manage**: View personalized contributions with inline update modals and interactive delete confirmation.
- **🎨 Luxury Dark/Light UI Experience**:
  - Smooth scrolling powered by **Lenis**.
  - Fluid micro-interactions and transitions with **Framer Motion**.
  - Interactive carousels, responsive modals, and SweetAlert2 alerts.
- **📬 Newsletter Integration**:
  - Direct transmission pipeline powered by **EmailJS**.

---

## 🛠️ Tech Stack & Architecture

### **Frontend & UI**
- **Core**: React 18, Vite 6
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS, DaisyUI, Sass
- **Animations**: Framer Motion, Lenis Smooth Scroll, Swiper, React Fast Marquee

### **State & Data Management**
- **Server State & Caching**: TanStack React Query v5 (Optimistic UI, Query Invalidation, Mutations)
- **Client State**:  React Context API
- **Schema Validation**: Zod (v4)
- **HTTP Client**: Axios with interceptors for secure requests

### **Authentication & Services**
- **Auth**: Firebase Authentication (Email/Password, Google OAuth)
- **Notifications**: SweetAlert2, React Toastify
- **Communication**: EmailJS

---

## 📁 Project Structure

```bash
src/
├── assets/                 # Static images, sliders, and graphics
├── components/             # Reusable shared components (Navbar, Footer, Modals, SocialLogin)
├── hooks/
│   ├── artifact/           # React Query hooks (useAllArtifact, useAddArtifact, useInstantLike)
│   ├── axios/              # Axios instance and secure interceptors (useAxiosSecure)
│   └── my-artifacts/       # User-specific artifact mutations (useUpdateArtifact, useMyAddedArtifact)
├── layouts/                # Main and root layout structures
├── pages/
│   ├── artifacts/          # All Artifacts & Add Artifact pages
│   ├── authentication/     # Login, Register, Auth layouts
│   ├── home/               # Landing page, Banner, HighestLike, Newsletter
│   └── my-artifacts/       # My Artifacts table, cards, and update modal
├── provider/               # AuthProvider and global contexts
├── router/                 # Route definitions and Private Route guards
├── validation/             # Zod validation schemas (artifact, signIn, signUp)
└── main.jsx                # Application root entry point
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/past-portals-client.git
cd past-portals-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and configure your Firebase & API keys:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### 5. Build for Production
```bash
npm run build
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/your-username/past-portals-client/issues).

---

## 📄 License

This project is licensed under the **MIT License**.

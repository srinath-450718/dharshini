# Cinematic Birthday Chronicle — Deployment & Setup Guide

This project is separated into independent `frontend` and `backend` services designed for separate hosting and independent deployment.

---

## 1. Project Structure

```text
project-root/
├── frontend/                     # Client application (React 19, Vite, Tailwind CSS v4, GSAP)
│   ├── public/                   # Static media (photos, icons, audio)
│   ├── src/                      # React source code & components
│   │   └── config/api.ts         # Centralized API base URL client
│   ├── index.html                # HTML entry point with web fonts
│   ├── vite.config.ts            # Vite build & local dev proxy configuration
│   ├── tsconfig.json             # Frontend TypeScript configuration
│   ├── package.json              # Frontend dependencies and build scripts
│   ├── .env.example              # Public frontend environment template
│   └── .gitignore                # Frontend gitignore
│
├── backend/                      # API server (Node.js, Express, TypeScript, MongoDB)
│   ├── src/                      # Express routes, controllers, models, config
│   ├── scripts/                  # Admin utility scripts (generateHash.ts)
│   ├── data/                     # Resilient offline fallback storage
│   ├── tsconfig.json             # Backend TypeScript configuration
│   ├── package.json              # Backend dependencies and server scripts
│   ├── .env.example              # Server environment template with placeholders
│   └── .gitignore                # Backend gitignore
│
├── README.md                     # Deployment & architecture guide
└── .gitignore                    # Root gitignore
```

---

## 2. Local Development Setup

### Running the Backend

In your first terminal:

```bash
cd backend
npm install
npm run dev
```

The Express backend will start on `http://localhost:5000`.

### Running the Frontend

In your second terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server will start on `http://localhost:5173`.

---

## 3. Production Build Commands

### Frontend Build
To compile the static frontend bundle for deployment (Vercel, Netlify, Cloudflare Pages, S3, etc.):

```bash
cd frontend
npm run build
```
The compiled static assets are output to `frontend/dist/`.

### Backend Build
To compile TypeScript to JavaScript for Node.js production hosting (Render, Railway, Fly.io, DigitalOcean, Heroku, etc.):

```bash
cd backend
npm run build
```
The compiled server files are output to `backend/dist/`.

### Starting the Production Backend
```bash
cd backend
npm start
```

---

## 4. Environment Variables

> **CRITICAL SECURITY RULE:** Never put database credentials, password hashes, or session secrets into the frontend environment. Only backend environment settings should hold server secrets.

### Frontend (`frontend/.env`)

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `VITE_API_BASE_URL` | Yes (for cross-origin) | Full URL of your deployed backend service. | `https://api.yourdomain.com` (local: `http://localhost:5000`) |

### Backend (`backend/.env`)

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `PORT` | Optional | Port for the Express server (defaults to 5000). | `5000` |
| `NODE_ENV` | Yes | Environment mode (`development` or `production`). | `production` |
| `CLIENT_ORIGIN` | Yes | Allowed frontend origin(s) for CORS. Can be comma-separated. | `https://your-frontend.onrender.com` |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string. | `mongodb+srv://<user>:<password>@cluster.mongodb.net/<db>` |
| `SESSION_SECRET` | Yes | Random high-entropy secret string for JWT cookie signing. | `long_random_hex_string` |

---

## 5. Deployment Instructions

### A. Deploying the Backend (e.g., Render, Railway, Fly.io)
1. Set the root directory / working directory to `backend`.
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. In the hosting dashboard, add all the **Backend Environment Variables** listed above.
5. Ensure `CLIENT_ORIGIN` matches the exact URL of your deployed frontend (e.g. `https://your-frontend.vercel.app`).

### B. Deploying the Frontend (e.g., Vercel, Netlify, Cloudflare Pages)
1. Set the root directory to `frontend`.
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. In the hosting dashboard, add the **Frontend Environment Variable**:
   - `VITE_API_BASE_URL` = `https://your-backend-service.onrender.com` (your deployed backend URL)

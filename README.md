# duka-pap

A modern React + TypeScript frontend for small retailers, built with Vite, Tailwind CSS, React Router, and Firebase (Auth + Firestore). Ready for deployment on Firebase Hosting.

## Tech stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- TypeScript
- Tailwind CSS
- React Router
- Context API for auth state
- Firebase (Auth + Firestore)
- lucide-react icons
- ESLint

## Project structure

```text
duka-pap/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   ├── routes/
│   │   └── AppRoutes.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── services/
│   │   └── firebase.ts
│   ├── hooks/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── firebase.json
├── .firebaserc
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Firebase

Create a new Firebase project and enable:

- Authentication → Email/Password
- Firestore

Then create `.env.local` in the project root:

```bash
cp .env.example .env.local
```

Fill in the values from your Firebase console:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Update `.firebaserc` with your project id:

```jsonc
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

### 3. Development

Start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### 4. Build

```bash
npm run build
```

The production build is output to the `dist` directory, which Firebase Hosting is configured to serve.

## Firebase Hosting

This project is pre-configured for Firebase Hosting as a single-page application (SPA).

`firebase.json`:

```jsonc
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Deploy

Make sure you have the Firebase CLI installed and logged in:

```bash
npm install -g firebase-tools
firebase login
firebase use your-firebase-project-id
```

Then:

```bash
npm run build
firebase deploy
```

## Routes

- `/` – Public **Home** page
- `/login` – **Auth** route, used for email/password sign-in
- `/dashboard` – **Protected** route; requires an authenticated user

Protected routing is implemented in `src/routes/AppRoutes.tsx` with a small `ProtectedRoute` wrapper that reads auth state from `AuthContext`.

## Auth flow

`AuthContext` (`src/context/AuthContext.tsx`) wraps the entire app and provides:

- `user` – the current Firebase user (or `null`)
- `loading` – whether auth state is still being resolved
- `login(email, password)` – placeholder using `signInWithEmailAndPassword`
- `logout()` – signs out the current user

`Login` page uses `login` and redirects to `/dashboard` on success.

You can extend this to support:

- Sign up
- Password reset
- Social providers (Google, Facebook, etc.)

## Styling

Tailwind is configured with:

- A `brand` color palette
- Centered `container` utility with responsive breakpoints

Global styles live in `src/index.css`.

## Absolute imports

Vite is configured with an alias:

```ts
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src")
  }
}
```

You can import modules like:

```ts
import Home from "@/pages/Home";
import { useAuth } from "@/context/AuthContext";
```

## Linting

Run ESLint:

```bash
npm run lint
```

Linting is configured with:

- `eslint:recommended`
- `plugin:react-hooks/recommended`
- Basic TypeScript support

You can customize the rules in `.eslintrc.cjs`.

---

This scaffold should run immediately after:

```bash
npm install
npm run dev
```

Once you connect your own Firebase project and create a test user, you can log in and access the protected dashboard.

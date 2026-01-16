# DukaSync Monorepo

This repository now contains both the frontend (React + Firebase Hosting) and the backend (Django + Cloud Run) for DukaSync. Use the `web` folder for all frontend work and the new `backend` folder for the Django API to be containerized for Google Cloud Run.

## Project structure

```text
.
├── backend/          # Django project with Dockerfile for Cloud Run
├── web/              # React + Vite frontend configured for Firebase Hosting
├── functions/        # Firebase Functions (existing)
├── mobile/           # Mobile client scaffold (existing)
├── dataconnect/      # DataConnect assets (existing)
├── firestore.rules   # Firestore security rules
└── firestore.indexes.json
```

## Backend (`backend/`) — Django for Cloud Run

### Quick start (local)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # update secrets before production
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

- Health check: `GET /healthz` returns `{"status": "ok"}`.
- Static files are served via WhiteNoise; collect with `python manage.py collectstatic` when needed.

### Deploy to Cloud Run

```bash
# from the repo root
docker build -t gcr.io/<PROJECT_ID>/dukasyn-backend ./backend
docker run --env-file backend/.env -p 8080:8080 gcr.io/<PROJECT_ID>/dukasyn-backend

# then deploy
gcloud run deploy duka-backend \
  --image gcr.io/<PROJECT_ID>/dukasyn-backend \
  --region <REGION> \
  --allow-unauthenticated
```

Configure environment variables such as `DJANGO_SECRET_KEY`, `DJANGO_DEBUG` (set to `False` for Cloud Run), `ALLOWED_HOSTS`, and `CSRF_TRUSTED_ORIGINS` (see `backend/.env.example`) in your Cloud Run service.

## Frontend (`web/`) — React + Firebase Hosting

### Tech stack

- React + Vite (TypeScript)
- Tailwind CSS
- React Router
- Context API for auth state
- Firebase (Auth + Firestore)
- lucide-react icons
- ESLint

### Getting started

```bash
cd web
npm install
```

#### Configure Firebase

Enable in your Firebase project:

- Authentication → Email/Password
- Firestore

Copy the example environment file and fill in values from your Firebase console:

```bash
cp .env.example .env.local
```

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Update `web/.firebaserc` with your project id:

```jsonc
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

### Development

```bash
cd web
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build

```bash
cd web
npm run build
```

The production build outputs to the `dist` directory, which Firebase Hosting is configured to serve.

### Firebase Hosting

`web/firebase.json`:

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

#### Deploy

Make sure you have the Firebase CLI installed and logged in:

```bash
npm install -g firebase-tools
firebase login
firebase use your-firebase-project-id
```

Then:

```bash
cd web
npm run build
firebase deploy --only hosting
```

### Routes

- `/` – Public **Home** page
- `/login` – **Auth** route, used for email/password sign-in
- `/dashboard` – **Protected** route; requires an authenticated user

Protected routing is implemented in `src/routes/AppRoutes.tsx` with a `ProtectedRoute` wrapper that reads auth state from `AuthContext`.

### Auth flow

`AuthContext` (`src/context/AuthContext.tsx`) wraps the entire app and provides:

- `user` – the current Firebase user (or `null`)
- `loading` – whether auth state is still being resolved
- `login(email, password)` – placeholder using `signInWithEmailAndPassword`
- `logout()` – signs out the current user

`Login` page uses `login` and redirects to `/dashboard` on success.

### Styling

Tailwind is configured with:

- A `brand` color palette
- Centered `container` utility with responsive breakpoints

Global styles live in `src/index.css`.

### Absolute imports

Vite is configured with an alias:

```ts
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  }
}
```

You can import modules like:

```ts
import Home from '@/pages/Home'
import { useAuth } from '@/context/AuthContext'
```

### Linting

Run ESLint:

```bash
cd web
npm run lint
```

Linting is configured with:

- `eslint:recommended`
- `plugin:react-hooks/recommended`
- Basic TypeScript support

You can customize the rules in `eslint.config.js`.

<div align="center">

# Runa

**Personal finance management, simplified.**

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[Live Demo](https://runa-gamma.vercel.app) · [API](https://runa-production.up.railway.app/up) · [Report a bug](https://github.com/anrelps/runa/issues)

</div>

---

## Overview

Runa is a full-stack personal finance app for tracking expenses, income, and recurring commitments. It provides visual spending reports, installment management, and a guest demo mode — all accessible from a single clean interface.

---

## Features

**Dashboard**
- Personalized greeting based on time of day
- Quick-add cards for income and expenses
- Pending bills overview and recent transactions feed

**Expenses**
- Create single, installment, or recurring expenses
- 10 spending categories with color-coded icons
- Weekly bar chart and category breakdown pie chart
- Date range filter with pagination

**Incomes**
- Log income entries with description and date
- Full history with date range filtering

**Commitments**
- Manage recurring expenses (monthly, configurable day)
- Track installment plans with progress bar per expense
- Mark individual installments as paid, view overdue items

**Auth & Access**
- Token-based authentication via Laravel Sanctum
- Guest demo mode — explore with seeded data, no sign-up required
- Demo sessions auto-expire after 24 hours

**Internationalisation**
- English and Portuguese (BR) — toggle in the sidebar

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Redux Toolkit |
| Styling | Tailwind CSS v4, Framer Motion |
| Charts | Chart.js + react-chartjs-2 |
| Backend | Laravel 12, PHP 8.4 |
| Database | PostgreSQL |
| Auth | Laravel Sanctum (token-based) |
| Deploy | Vercel (frontend) · Railway (backend + DB) |

---

## Architecture

The backend follows a **Domain-Driven Design** structure — each domain owns its models, services, repositories, DTOs, and policies.

```
backend/app/
├── Domain/
│   ├── User/               # Auth, registration, demo sessions
│   └── Finance/
│       ├── Transaction/    # Income & expense ledger entries
│       ├── Expense/        # Single & installment expenses
│       └── RecurringExpense/   # Monthly recurring expenses
├── Http/
│   ├── Controllers/        # Thin controllers, delegate to services
│   └── Resources/          # API response transformers
└── Domain/Finance/Policies/   # Per-model authorization
```

The frontend is organized by **feature module**, with a shared Redux store for async state:

```
frontend/src/
├── pages/          # Route-level components
├── features/       # UI modules (dashboard, expenses, charts…)
├── layouts/        # AppLayout (auth) · PublicLayout (public)
├── redux/          # Slices + service API calls
├── hooks/          # useCurrencyBRL, useChartResize
└── locales/        # en.json · pt.json
```

---

## Getting Started

### Prerequisites

- PHP 8.4 + Composer
- Node.js 20+ + npm
- PostgreSQL

### Backend

```bash
cd backend

# Install dependencies and set up environment
composer install
cp .env.example .env
php artisan key:generate

# Configure your database in .env, then:
php artisan migrate

# Start the dev server
php artisan serve
```

API will be available at `http://localhost:8000`.

### Frontend

```bash
cd frontend

npm install
npm run dev
```

App will be available at `http://localhost:5173`.

> The frontend `.env` points to `http://localhost:8000/api/v1` by default — no CORS setup needed locally.

---

## Environment Variables

### Backend — `backend/.env`

```env
APP_KEY=                          # php artisan key:generate
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=runa_db
DB_USERNAME=
DB_PASSWORD=

SESSION_ENCRYPT=true
SANCTUM_TOKEN_EXPIRATION=10080    # 7 days
SANCTUM_STATEFUL_DOMAINS=your-frontend-domain.com
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

See [`backend/.env.example`](backend/.env.example) for the full reference.

### Frontend — `frontend/.env`

```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## Deployment

| Service | Purpose |
|---|---|
| [Railway](https://railway.app) | Laravel API + PostgreSQL database |
| [Vercel](https://vercel.com) | React SPA |

Both services deploy automatically on push to `main`. The CI pipeline (`.github/workflows/ci.yml`) runs `composer audit`, `npm audit`, type checking, lint, and build on every pull request.

---

## API

Base URL: `https://runa-production.up.railway.app/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Create account |
| `POST` | `/login` | Authenticate |
| `POST` | `/demo` | Start a guest demo session |
| `POST` | `/user/logout` | Revoke token |
| `GET` | `/user/profile` | Current user |
| `GET/POST` | `/expenses` | List / create expenses |
| `GET/PUT/DELETE` | `/expenses/:id` | Manage expense |
| `PUT` | `/expenses/update-installment/:id` | Mark installment paid |
| `GET/POST` | `/recurring-expenses` | List / create recurring |
| `GET/PUT/DELETE` | `/recurring-expenses/:id` | Manage recurring |
| `GET/POST` | `/transactions` | List / create transactions |
| `GET` | `/transactions/history` | Balance summary |
| `GET/PUT/DELETE` | `/transactions/:id` | Manage transaction |

All authenticated routes require `Authorization: Bearer <token>`.

---

## License

MIT — see [LICENSE](LICENSE) for details.

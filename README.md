# GroceryCompare

GroceryCompare is a grocery catalog and store price comparison demo. It includes product search, category filters, product detail pages, price comparisons, favorites, shopping lists, price alerts, JWT accounts, and admin routes.

> **Demo data:** The bundled catalog, prices, store availability, and any pre-existing chart records are illustrative sample data. They are not verified live retailer information.

## Live deployments

- **Frontend:** [GroceryCompare website](https://grocery-compare-chi-ten.vercel.app/)
- **Backend catalog API:** [GET /api/products](https://grocerycompare-api-production.up.railway.app/api/products)
- **Backend health check:** [GET /api/health](https://grocerycompare-api-production.up.railway.app/api/health)
- **Source repository:** [sasidhark23-svg/grocery-compare](https://github.com/sasidhark23-svg/grocery-compare)

The backend root URL is an API service, not a web page. Open the catalog API link above to see its JSON response. Product images, prices, and availability are demo examples, not live retailer data.

## Stack

- Frontend: React 18, Vite, Tailwind CSS, Zustand, Axios, Recharts
- Backend: Java 21, Spring Boot 3, Spring Security, Spring Data JPA, JWT
- Database: H2 for simple local runs; MySQL 8 for Docker and persistent hosting

## Run with Docker Compose

1. Copy `.env.example` to `.env` and replace the password and JWT placeholders with local values. Use a random JWT secret of at least 32 characters.
2. Run `docker compose up --build` from the repository root. The frontend Nginx service forwards `/api/` requests to the backend container.
3. Open the frontend at `http://localhost:5173`. The API is at `http://localhost:8080/api` and its public health check is `http://localhost:8080/api/health`.

Compose creates a MySQL volume named `mysql_data`. The repeatable catalog seeder inserts 50 demo products, their units, five sample stores, and sample prices. It identifies demo products by barcode, adds missing sample price rows, and does not replace existing product, price, or user records. Product sample prices are generated from a fixed reference amount and store multipliers; they are not a retailer feed.

The sample user/admin accounts are disabled by default. To opt in for a disposable local demo, set `DEMO_USERS_ENABLED=true`; do not enable these fixed-password accounts on a public service.

## Run services separately

### Backend

Requires Java 21. Set `JWT_SECRET` and database environment variables before starting:

```powershell
$env:JWT_SECRET = "replace-with-a-random-secret-at-least-32-characters"
cd backend
./mvnw.cmd spring-boot:run
```

The default profile uses an in-memory H2 database. For MySQL, activate the `mysql` profile and set `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD`. The backend listens on port 8080. Health: `GET /api/health`.

### Frontend

Requires Node.js 20 or later:

```powershell
cd frontend
npm ci
npm run dev
```

Vite proxies `/api` to `http://localhost:8080` during local development. For a separate frontend host, set `VITE_API_BASE_URL` at build time to the backend URL ending in `/api` (for example, `https://api.example.com/api`). The Docker image accepts the same value through the `VITE_API_BASE_URL` build argument. Nginx serves the SPA with route fallback, so direct navigation and refresh work.

## Environment variables

| Variable | Used by | Purpose |
|---|---|---|
| `JWT_SECRET` | Backend | Required signing key; keep private and rotate if exposed |
| `JWT_EXPIRATION` | Backend | Token lifetime in milliseconds (default 86400000) |
| `SPRING_PROFILES_ACTIVE` | Backend | Set to `mysql` for persistent MySQL deployment |
| `DB_URL` | Backend | JDBC URL when using the MySQL profile |
| `DB_USERNAME`, `DB_PASSWORD` | Backend / Compose | MySQL credentials |
| `DB_ROOT_PASSWORD` | Compose | Local MySQL root password |
| `CORS_ALLOWED_ORIGINS` | Backend | Comma-separated frontend origins, without paths |
| `DEMO_USERS_ENABLED` | Backend | Enables fixed-password sample accounts; keep false for hosted use |
| `VITE_API_BASE_URL` | Frontend build | Backend base URL ending in `/api`; defaults to `/api` |

See `.env.example` for placeholders. Never commit `.env` or real credentials.

## API notes

- `GET /api/products/search` supports `query`, `category`, `brand`, `page`, `size`, and `sort`. Page size is limited to 100.
- Product, store, and price reads are public. Mutations require an admin JWT. User lists, favorites, profile, and alerts require authentication.
- `GET /api/health` is public and suitable for service health checks.
- Price history is shown only when records exist. Historical records from earlier demo versions are illustrative and are identified as such in the UI.

## Checks

From `frontend/`, run `npm run lint` and `npm run build`. From `backend/`, run `./mvnw.cmd test` (PowerShell) or `./mvnw test` (macOS/Linux). Docker Compose can be validated with `docker compose config`.

## Separate hosting

Deploy `backend/` as a Docker web service and `frontend/` as a separate static or Docker web service. Attach a persistent MySQL database to the backend and provide its JDBC URL and credentials as environment variables. Set a strong `JWT_SECRET`, set `CORS_ALLOWED_ORIGINS` to the exact HTTPS frontend origin, and build the frontend with `VITE_API_BASE_URL` set to the HTTPS backend URL plus `/api`. The frontend Docker image includes Nginx SPA route fallback. Verify `/api/health`, a database-backed catalog request, and frontend data loading after deployment. Hosting resources and database plans may incur charges; review provider pricing before provisioning.

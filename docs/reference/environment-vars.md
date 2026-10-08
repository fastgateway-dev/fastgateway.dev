---
sidebar_position: 3
description: Environment variables configuration for FastGateway backend and frontend
---

# Environment Variables

This document lists all environment variables used by FastGateway components.

## Backend Environment Variables

The backend builds its PostgreSQL connection string from discrete variables (there is no single `DATABASE_URL` variable).

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_HOST` | No | PostgreSQL host (default: `localhost`) | `localhost` |
| `DATABASE_PORT` | No | PostgreSQL port (default: `5432`) | `5432` |
| `DATABASE_USER` | No | PostgreSQL user (default: `fastgateway`) | `fastgateway` |
| `DATABASE_PASSWORD` | No | PostgreSQL password (default: `fastgateway`) | `fastgateway` |
| `DATABASE_NAME` | No | PostgreSQL database name (default: `fastgateway`) | `fastgateway` |
| `DATABASE_SSLMODE` | No | PostgreSQL SSL mode (default: `disable`) | `require` |
| `DATABASE_SSLROOTCERT` | No | Path to the SSL root certificate (CA); applied when set | `/certs/ca.crt` |
| `DATABASE_SSLCERT` | No | Path to the client SSL certificate; applied when set | `/certs/client.crt` |
| `DATABASE_SSLKEY` | No | Path to the client SSL key; applied when set | `/certs/client.key` |
| `JWT_SECRET` | Yes | Secret key for JWT token signing (min 32 characters) | `your-super-secret-jwt-key-min-32-chars` |
| `JWT_EXPIRY` | No | Access token lifetime as a Go duration (default: `24h`) | `24h` |
| `REFRESH_TOKEN_EXPIRY` | No | Refresh token lifetime as a Go duration (default: `168h`) | `168h` |
| `ENCRYPTION_KEY` | Yes | Key for encrypting sensitive data (32 characters) | `your-32-character-encryption-key` |
| `API_PORT` | No | Port for the API server (default: `8081`) | `8081` |
| `LOG_LEVEL` | No | Log level, e.g. `debug` or `info` (default: `info`) | `debug` |
| `CORS_ALLOWED_ORIGINS` | No | Comma-separated list of allowed CORS origins | `http://localhost:3000,https://app.example.com` |
| `ADMIN_USERNAME` | No | Initial admin username (default: `admin`) | `admin` |
| `ADMIN_PASSWORD` | No | Initial admin password (default: `admin123`) | `securepassword123` |
| `ADMIN_EMAIL` | No | Initial admin email (default: `admin@fastgateway.local`) | `admin@example.com` |
| `WAF_IMAGE` | No | Coraza WAF proxy-wasm image (default: `ghcr.io/corazawaf/coraza-proxy-wasm`) | `ghcr.io/corazawaf/coraza-proxy-wasm` |
| `WAF_TAG` | No | Coraza WAF image tag (default: `0.6.0`) | `0.6.0` |
| `WAF_SHA256` | No | Optional SHA256 digest used to pin the WAF image | `sha256:...` |

### Kubernetes Configuration

Kubernetes connectivity is **not** configured through backend environment variables. Instead, each project stores its own cluster connection in the database, configured through the UI or API. A project connection specifies:

- **Connection type** — `in_cluster`, `kubeconfig`, or `api_token`
- **API server URL** — the Kubernetes API endpoint (used by `api_token` connections)
- **Token** — a service account token, stored encrypted (AES-256) using `ENCRYPTION_KEY`

See `internal/models/project.go` and `internal/services/project_service.go` for details.

## Frontend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API URL | `http://localhost:8081` |

## Example .env File

### Backend (.env)

```bash
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=fastgateway
DATABASE_PASSWORD=fastgateway
DATABASE_NAME=fastgateway
DATABASE_SSLMODE=disable

# Security
JWT_SECRET=your-super-secret-jwt-key-must-be-at-least-32-characters-long
ENCRYPTION_KEY=your-32-character-encryption-key

# Server Configuration
API_PORT=8081
LOG_LEVEL=info
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Initial Admin User (optional — defaults are admin / admin123 / admin@fastgateway.local)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme123
ADMIN_EMAIL=admin@example.com
```

Kubernetes cluster access is not set here — it is configured per project through the UI or API (see the Kubernetes Configuration section above).

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8081
```

## Docker Compose Example

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: fastgateway
      POSTGRES_PASSWORD: password
      POSTGRES_DB: fastgateway
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    image: fastgateway/backend:latest
    environment:
      DATABASE_HOST: postgres
      DATABASE_PORT: "5432"
      DATABASE_USER: fastgateway
      DATABASE_PASSWORD: password
      DATABASE_NAME: fastgateway
      DATABASE_SSLMODE: disable
      JWT_SECRET: your-super-secret-jwt-key-must-be-at-least-32-characters-long
      ENCRYPTION_KEY: your-32-character-encryption-key
      API_PORT: "8081"
      CORS_ALLOWED_ORIGINS: http://localhost:3000
      ADMIN_USERNAME: admin
      ADMIN_PASSWORD: changeme123
      ADMIN_EMAIL: admin@example.com
    ports:
      - "8081:8081"
    depends_on:
      - postgres

  frontend:
    image: fastgateway/frontend:latest
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8081
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

## Generating Secure Keys

### JWT Secret

```bash
# Generate a random 64-character JWT secret
openssl rand -base64 48
```

### Encryption Key

```bash
# Generate a 32-character encryption key
openssl rand -base64 24
```

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use different secrets** for each environment (development, staging, production)
3. **Rotate secrets regularly** in production environments
4. **Use a secrets manager** (like Kubernetes Secrets, HashiCorp Vault, or AWS Secrets Manager) in production
5. **Restrict file permissions** on `.env` files (`chmod 600 .env`)

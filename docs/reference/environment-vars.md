---
sidebar_position: 3
description: Environment variables configuration for FastGateway backend and frontend
---

# Environment Variables

This document lists all environment variables used by FastGateway components.

## Backend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgres://user:pass@localhost:5432/fastgateway` |
| `JWT_SECRET` | Yes | Secret key for JWT token signing (min 32 characters) | `your-super-secret-jwt-key-min-32-chars` |
| `ENCRYPTION_KEY` | Yes | Key for encrypting sensitive data (32 characters) | `your-32-character-encryption-key` |
| `API_PORT` | No | Port for the API server (default: 8080) | `8080` |
| `CORS_ALLOWED_ORIGINS` | No | Comma-separated list of allowed CORS origins | `http://localhost:3000,https://app.example.com` |
| `ADMIN_USERNAME` | Yes | Initial admin username | `admin` |
| `ADMIN_PASSWORD` | Yes | Initial admin password | `securepassword123` |
| `ADMIN_EMAIL` | Yes | Initial admin email | `admin@example.com` |

### Kubernetes Configuration

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `KUBE_CONFIG_PATH` | No | Path to kubeconfig file (for local development) | `~/.kube/config` |
| `KUBE_CONTEXT` | No | Kubernetes context to use | `my-cluster` |
| `KUBE_IN_CLUSTER` | No | Set to `true` when running inside Kubernetes | `true` |
| `KUBE_TOKEN` | No | Service account token for Kubernetes API | `eyJhbGciOi...` |
| `KUBE_API_SERVER` | No | Kubernetes API server URL | `https://kubernetes.default.svc` |

## Frontend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API URL | `http://localhost:8080` |

## Example .env File

### Backend (.env)

```bash
# Database Configuration
DATABASE_URL=postgres://fastgateway:password@localhost:5432/fastgateway?sslmode=disable

# Security
JWT_SECRET=your-super-secret-jwt-key-must-be-at-least-32-characters-long
ENCRYPTION_KEY=your-32-character-encryption-key

# Server Configuration
API_PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Initial Admin User
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme123
ADMIN_EMAIL=admin@example.com

# Kubernetes Configuration (for local development)
KUBE_CONFIG_PATH=~/.kube/config
KUBE_CONTEXT=kind-fastgateway

# Kubernetes Configuration (for in-cluster deployment)
# KUBE_IN_CLUSTER=true
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
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
      DATABASE_URL: postgres://fastgateway:password@postgres:5432/fastgateway?sslmode=disable
      JWT_SECRET: your-super-secret-jwt-key-must-be-at-least-32-characters-long
      ENCRYPTION_KEY: your-32-character-encryption-key
      API_PORT: "8080"
      CORS_ALLOWED_ORIGINS: http://localhost:3000
      ADMIN_USERNAME: admin
      ADMIN_PASSWORD: changeme123
      ADMIN_EMAIL: admin@example.com
      KUBE_CONFIG_PATH: /root/.kube/config
    ports:
      - "8080:8080"
    volumes:
      - ~/.kube:/root/.kube:ro
    depends_on:
      - postgres

  frontend:
    image: fastgateway/frontend:latest
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8080
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

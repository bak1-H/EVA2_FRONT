# Innovatech Frontend

Interfaz web (React + Vite) del sistema de gestión de ventas y despachos de Innovatech Chile. Consume dos microservicios backend (Ventas y Despachos) desplegados en AWS ECS Fargate.

## Arquitectura

```
Usuario → ALB (innovatech-alb) → tg-frontend (puerto 80)
                                → tg-backend  (puerto 8080) → /api/v1/ventas*
                                → tg-despachos (puerto 8080) → /api/v1/despachos*
```

El frontend se sirve con nginx dentro de un contenedor. El ALB enruta por path: todo lo que no matchea `/api/v1/despachos*` ni `/api/v1/*` (backend) cae por default en el target group del frontend.

## Stack

- React 18 + Vite 5
- Tailwind CSS
- React Router, React Hook Form, Axios, SweetAlert2

## Levantar en local

```bash
npm install
npm run dev        # servidor de desarrollo Vite
npm run build       # build de producción a dist/
npm run lint         # gate de calidad usado también en CI
```

## Contenedor

`Dockerfile` multietapa:
1. **builder** (`node:20-alpine`): instala dependencias con `npm ci` y compila con `vite build`.
2. **runtime** (`nginx:1.27-alpine`): sirve `dist/` como SPA (fallback a `index.html` en `nginx.conf`), con `nginx.pid` movido a `/tmp` para correr sin root (`nginx-main.conf`).

```bash
docker build -t innovatech-frontend .
docker run -p 8080:80 innovatech-frontend
```

## Pipeline CI/CD (`.github/workflows/deploy.yml`)

Se dispara en cada push a `main`:

1. Checkout
2. Setup Node 20 + `npm ci`
3. **`npm run lint`** — gate de calidad (bloquea el pipeline si hay errores)
4. Build de la imagen Docker y push a Amazon ECR (`innovatech-frontend`)
5. `aws ecs update-service --force-new-deployment` sobre `frontend-service` en el clúster `innovatech-cluster`

Las credenciales de AWS se leen desde GitHub Secrets (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`, `AWS_REGION`).

## Repos relacionados

- Backend (Ventas + Despachos): [EVA2_BACK](https://github.com/bak1-H/EVA2_BACK)

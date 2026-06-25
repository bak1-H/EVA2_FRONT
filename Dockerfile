# =============================================================
# Etapa 1 — Compilación del frontend (Vite + React)
# =============================================================
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# =============================================================
# Etapa 2 — Servidor web con nginx (usuario no-root)
# =============================================================
FROM nginx:1.27-alpine

# Reemplaza el nginx.conf principal (para pid en /tmp)
COPY nginx-main.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

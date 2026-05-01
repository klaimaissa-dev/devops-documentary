# =============================================================
# Stage 1 "builder" — Node installs deps and builds React app
# Stage 2 "runner"  — nginx serves the static files
#
# Final image: ~25MB (no Node.js at all)
# =============================================================

# ---- Stage 1 ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY public/ ./public/
COPY src/    ./src/

# Produces optimized static files in /app/build
RUN npm run build

# ---- Stage 2 ----
FROM nginx:alpine AS runner

# Our config handles SPA routing + API proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app from stage 1
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

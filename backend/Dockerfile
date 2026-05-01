# =============================================================
# Stage 1 "builder" — installs everything including devDeps
# Stage 2 "runner"  — only production code, non-root user
#
# Result: ~180MB image instead of ~600MB
# =============================================================

# ---- Stage 1 ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files FIRST — Docker caches this layer.
# npm ci only re-runs when package.json changes, not on every code edit.
COPY package*.json ./
RUN npm ci

COPY src/ ./src/

# ---- Stage 2 ----
FROM node:20-alpine AS runner

# Never run as root inside a container
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/src ./src

USER appuser

EXPOSE 4000

# Kubernetes uses this to know if the pod is healthy
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:4000/api/health || exit 1

CMD ["node", "src/index.js"]

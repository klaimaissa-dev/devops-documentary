# DevOps Documentary

> An interactive visual documentary about the DevOps chain — itself deployed through a complete DevOps pipeline.

[![CI Pipeline](https://github.com/klaimaissa-dev/devops-documentary/actions/workflows/ci.yml/badge.svg)](https://github.com/klaimaissa-dev/devops-documentary/actions/workflows/ci.yml)

---

## What is this project?

A 3-page animated web application that teaches DevOps concepts visually.
The app is also the subject of its own DevOps chain — built, tested, containerized,
deployed to Kubernetes via ArgoCD, and monitored with Prometheus + Grafana.

---

## Architecture
---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, CSS variables |
| Backend | Node.js, Express 4 |
| Database | PostgreSQL 16 |
| Container | Docker (multi-stage) |
| Orchestration | Kubernetes + Minikube |
| GitOps | ArgoCD |
| CI/CD | GitHub Actions |
| Quality | ESLint, Jest, SonarQube |
| Security | Trivy image scanner |
| Monitoring | Prometheus + Grafana |

---

## Project structure
---

## Running locally

### Docker Compose (recommended)

```bash
git clone https://github.com/klaimaissa-dev/devops-documentary
cd devops-documentary/docker
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api/phases
- Metrics: http://localhost:4000/metrics

---

## CI/CD Pipeline

Every push triggers:
On merge to `main`, ArgoCD automatically syncs the Kubernetes cluster.

---

## API reference

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/phases | All 9 DevOps phases |
| GET | /api/phases/:id | Single phase |
| GET | /api/quiz | Quiz questions |
| POST | /api/quiz/submit | Submit answers, get score |
| GET | /api/health | Kubernetes liveness probe |
| GET | /metrics | Prometheus metrics |

---

## Author

Mini-projet DevOps — IT Business School
Module: Pratique DevOps, Chaînes d'outils et Automatisation

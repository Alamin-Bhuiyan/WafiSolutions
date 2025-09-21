# Task Tracker

**Preview**
<img width="1442" height="896" alt="image" src="https://github.com/user-attachments/assets/88edca64-6825-4c40-b568-763cebb336cd" />

## Overview
A minimal Task Tracker web app (single-page) built with:
- **Backend:** .NET (HotChocolate GraphQL), EF Core + PostgreSQL
- **Frontend:** React + Adobe React Spectrum + Relay
- **Infra:** Docker + Docker Compose

The app supports:
- Create task (title, description)
- List tasks (pending / completed)
- Toggle task status (Pending ↔ Completed)
- Tasks sorted by latest `UpdatedAt` / `CreatedAt`
- Single-window UI with a summary section

---

## Approach and Thought Process

### Database
- Designed `Tasks` table to match assignment fields.
- Added `CreatedAt` and `UpdatedAt` timestamps to track events and sort the list.

### Backend
- Followed **Vertical Slice Architecture** to separate models, infrastructure, and feature logic.
- Implemented **Repository Pattern** + **EF Core** using **PostgreSQL**.
- GraphQL schema implemented with required **Queries** and **Mutations**.
- Applied **CQRS** (commands / queries) using **MediatR** for handlers.
- Clean **Dependency Injection** for handlers, repositories and services.
- On startup the app auto-creates the DB tables (based on configured connection string & migrations).

### Frontend / UX
- Single-window UI: summary section on top, task list below, add-task form in same view.
- Tasks are separated into **Pending** and **Completed** sections and sorted by most recent update/creation time.
- After add/update operations, the list is refreshed automatically.
- Implemented **Relay** as the GraphQL client (so queries/mutations use Relay hooks and the Relay compiler artifacts).

### Dockerization
- Dockerfiles for backend and frontend; official `postgres` image for DB.
- `docker-compose.yml` at repository root orchestrates backend, frontend, and DB.
- Running compose builds and starts the full stack.

---

## Tech Stack
- **Backend:** .NET 8, HotChocolate GraphQL, EF Core, CQRS with MediatR, Repository Pattern  
- **Database:** PostgreSQL  
- **Frontend:** React, TypeScript, Adobe React Spectrum, Relay (react-relay + relay-runtime), Vite  
- **Dev / Infra:** Docker, Docker Compose, nginx (frontend production container)  
- **AI / Productivity:** Lovable.dev, ChatGPT, GitHub Copilot

---

## Development Process (step-by-step & tools used)
- **DB design:** Created `Tasks` schema and added `CreatedAt`/`UpdatedAt`.
- **Backend scaffolding:** Built Vertical Slice style projects (Api, Application/Features, Infrastructure, Domain).
- **GraphQL:** Implemented schema, queries, and mutations in HotChocolate; resolvers call MediatR.
- **CQRS:** Commands & queries implemented as handlers; MediatR used for routing + pipeline opportunities (validation, logging).
- **Frontend scaffold:** Used **Lovable.dev** to generate a Spectrum-based UI layout. Initially Lovable produced a scroll-based UI with dummy data.
  - I asked **ChatGPT** to craft better prompts so Lovable would produce a single-window UX (summary + task list + form).
  - Lovable returned working UI with dummy content.
- **Relay work:** Copied `schema.graphql` from backend (HotChocolate `?sdl`) into frontend and configured `relay.config.js`.
  - Lovable environment could not run the Relay compiler, so it temporarily used direct `fetch` for quick testing.
  - I ran `npx relay-compiler` locally to generate `__generated__` artifacts and then replaced the fetch-based flows with proper Relay `graphql` tags + hooks.
- **Dockerization:** IDE provided a backend Dockerfile; I created frontend Dockerfile & nginx config, then asked ChatGPT/Copilot to help compose the `docker-compose.yml`.
- **Integration fixes:** Had to adjust connection strings, `docker-compose.yml` environment variables, and nginx settings to make containers talk to each other and the DB.
- **Final:** All services dockerized and start together via `docker compose up --build`.

---

## AI Tools & How They Helped
- **Lovable.dev**  
  - Use: UI generation (Adobe React Spectrum layout, initial components).  
  - Note: great for fast mockups; could not run Relay compiler in its environment → produced fetch-based stubs initially.

- **ChatGPT**  
  - Use: prompt creation for Lovable, help with GraphQL schema snippets, Compose file examples, troubleshooting steps, and README drafting.

- **GitHub Copilot**  
  - Use: code completions, rewriting environment files, generating `nginx.conf` and making code align with backend schema.

---

## Reflections (What worked / what didn't)
- **What worked**
  - Rapid UI scaffolding with Lovable.dev.
  - Backend scaffold and migrations created tables automatically via EF Core.
  - Dockerization pattern worked well once environment variables and network settings were corrected.
  - Relay + GraphQL produced a clean frontend data flow once `relay-compiler` artifacts were generated.

- **Challenges**
  - Lovable.dev could not compile Relay artifacts in their environment → required local Relay compile.
  - ChatGPT/Copilot generated helpful boilerplate but sometimes missed environment-specific details (DB connection strings, nginx config).
  - Needed manual correction and precise prompts to get correct Docker networking and runtime environment in compose.

- **Takeaway**
  - AI tools accelerate scaffolding and ideation, but reliable integration (Relay compiler, DB connection, Docker networking) still requires manual steps and local runs.

---

## Project Structure (high level)

```
/TaskTracker
  /backend
    /TaskTracker
        /Featrues 
        /Infrastructure 
        /Models
    Dockerfile
  /frontend
    src/
    public/
    relay.config.js
    package.json
    Dockerfile
  docker-compose.yml
  README.md
```

---

## How to Run (copy-paste friendly)

> **Note:** adjust `<your-repo-url>` and DB credentials before starting.

1. **Clone repo**
```powershell
git clone <your-repo-url>
cd <your-repo-folder>
```

2. **Edit docker-compose.yml**
- Open `docker-compose.yml` and set the correct DB env values:
  - `POSTGRES_USER`
  - `POSTGRES_PASSWORD`
  - `POSTGRES_DB`
- If your backend uses a different connection string template, update it accordingly.

3. **Start the full stack**
From the repo root:
```powershell
docker compose up --build
```
- This builds images and starts containers for backend, frontend, and PostgreSQL.

4. **Open the app**
- `http://localhost:3000/`


---

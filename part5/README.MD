## Full Stack Open 2025 — Part 5
This directory contains my **full stack implementation and all tests (unit + E2E)** for **Part 5** of the [Full Stack Open 2025](https://fullstackopen.com/en/part5) course.

The focus of Part 5 is on **testing React applications** - including unit and E2E testing, while using the completed bloglist-backend from [**Part 4**](https://github.com/asweetcakee/webdev/tree/fullstackopen/part4/bloglist) with minor fixes and adjustments.

The project is built with:
- **Backend**: `Node.js`, `Express`, `MongoDB` (via Mongoose), `node:test` and `supertest`
- **Frontend**: `React`, `Axios`, `Vitest`, `jsdom`
- **E2E**: `Playwright`

Each solved exercise is committed using the following convention:  
> `Completed [exercise number]: [exercise name]. [what was done in the exercise]`

## Folder structure
**Backend**: `bloglist-backend` from Part 4

**Frontend**: `bloglist-frontend`

**E2E**: `e2e-playwright`


## Clone and run locally

Clone this repository:
```bash
git clone https://github.com/asweetcakee/webdev.git
cd webdev
git checkout fullstackopen
```

Navigate to the backend folder and install dependencies:
```bash
cd part5/bloglist-backend
npm install
```

Navigate to the frontend folder and install dependencies:
```bash
cd part5/bloglist-frontend
npm install
```

Navigate to the E2E folder and install dependencies:
```bash
cd part5/e2e-playwright
npm install
```
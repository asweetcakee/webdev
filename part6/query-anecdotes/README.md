## Full Stack Open 2025 - Part 6
This directory contains my **frontend implementation** for the **query-anecdotes** project in **Part 6** of the [Full Stack Open 2025](https://fullstackopen.com/en/part6) course.

The focus of this project is on **TanStack Query** for server state management and **React Context** with `useReducer` for client-side notification state - replacing Redux entirely with a more modern approach to data fetching and caching.

The project is built with: `React`, `TanStack Query`, `json-server`

Each solved exercise is committed using the following convention:  
> `Completed [exercise number]: [exercise name]. [what was done in the exercise]`

## Exercises
| Section    | Range         | Description                                                                          |
|------------|---------------|--------------------------------------------------------------------------------------|
| `Exercise` | 6.20 – 6.24 | TanStack Query, mutations, query invalidation, useReducer, React Context, custom hooks |


## Setup


### NPM packages

**Production dependencies**
- `@tanstack/react-query` - data-fetching and server state management library providing `useQuery`, `useMutation`, and `QueryClient`
- `json-server` - lightweight REST API mock server backed by `db.json`, with a custom validation middleware
- `react` - core React library for building user interfaces
- `react-dom` - React package for DOM-specific rendering

**Development dependencies**
- `@eslint/js` - ESLint's core rule definitions
- `@types/react` - type definitions for React
- `@types/react-dom` - type definitions for React DOM
- `@vitejs/plugin-react` - Vite plugin enabling React fast refresh and JSX transformation
- `eslint` - JavaScript linter for code quality enforcement
- `eslint-plugin-react-hooks` - enforces the Rules of Hooks
- `eslint-plugin-react-refresh` - ensures proper configuration for React Fast Refresh
- `globals` - predefined global variables for ESLint environment awareness
- `vite` - modern build tool and development server


### NPM scripts
- `dev` - run the development server with **Vite** (hot-reloading enabled)
- `build` - create a **production-ready build** of the React app
- `lint` - run **ESLint** to check for syntax or style issues
- `preview` - locally preview the **production build**
- `server` - start the **custom json-server** on port `3001` via `node server.js` (includes request validation middleware)


## Overview

**Project Tree**
<details>
<summary><strong>Project Structure</strong></summary>

```bash
query-anecdotes/            # Root folder
├── .gitignore
├── db.json                 # json-server data source
├── eslint.config.js        # ESLint configuration
├── index.html              # SPA entry point
├── package.json
├── package-lock.json
├── requests.js             # Fetch-based API functions for anecdote operations
├── server.js               # Custom json-server with validation middleware
├── vite.config.js          # Vite configuration
│
├── public/                 # Public assets
│   └── vite.svg
│
└── src/
    ├── main.jsx                # React root, QueryClient setup, Context Provider
    ├── App.jsx                 # Root component managing queries, mutations, and voting
    ├── NotificationContext.jsx # React Context + useReducer for notification state
    │
    ├── components/             # React UI components
    │   ├── AnecdoteForm.jsx
    │   └── Notification.jsx
    │
    └── hooks/                  # Custom React hooks
        └── useNotification.js
```
</details>


**Root Folder**
- **db.json** - data source file for `json-server`. Contains the anecdotes collection with `id`, `content`, and `votes` fields
- **eslint.config.js** - contains ESLint rules for static code analysis and enforcing code style
- **index.html** - SPA entry point
- **vite.config.js** - Vite build tool and dev server configuration

- **server.js** - custom `json-server` setup with a `validator` middleware that intercepts `POST` requests and rejects anecdotes with `content` shorter than 5 characters with a `400` response. Runs on port `3001`

- **requests.js** - fetch-based API module for all anecdote operations against `http://localhost:3001/anecdotes`. Exports:
  - `getAnecdotes` - fetches all anecdotes (used by `useQuery`)
  - `addAnecdote(newAnecdote)` - POSTs a new anecdote (used by `useMutation`)
  - `updateAnecdote(newAnecdote)` - PUTs an updated anecdote by ID (used for voting)


**src root folder**
- **main.jsx** - creates a `QueryClient` instance, wraps the app in `QueryClientProvider` and `NotificationContextProvider`, and renders the root `App` component

- **App.jsx** - root component that:
  - uses `useQuery` with `queryKey: ['anecdotes']` and `retry: 1` to fetch anecdotes from the backend
  - uses `useMutation` with `updateAnecdote` and manually updates the query cache via `queryClient.setQueryData` on success (optimistic-style cache update without full refetch)
  - handles loading and error states from `result.isLoading` / `result.isError`
  - dispatches `setNotification` via `useNotify` hook on each vote

- **NotificationContext.jsx** - defines and exports the notification React Context with a `useReducer`-based state machine. Supports two actions: `SET` (stores the message) and `CLEAR` (resets to `null`). The `NotificationContextProvider` exposes both `notification` (current message) and `setNotification(message, timeInSeconds)` (sets the message and auto-clears it after the given delay using a module-scoped timer to prevent overlapping timeouts)


**components folder**
- **AnecdoteForm.jsx** - form for adding new anecdotes. Uses `useMutation` with `addAnecdote` and appends the new anecdote to the query cache on success via `queryClient.setQueryData`. Performs client-side length validation before mutation and triggers a notification via `useNotify`

- **Notification.jsx** - reads the current notification from context via `useNotificationValue`. Returns `null` when empty, otherwise renders the message in a styled bordered box


**hooks folder**
- **useNotification.js** - exports two custom hooks:
  - `useNotificationValue` - returns the current notification message from `NotificationContext`
  - `useNotify` - returns the `setNotification` function from context. Throws an error if used outside `NotificationContextProvider`


## Clone and run locally

Clone this repository:
```bash
git clone https://github.com/asweetcakee/webdev.git
cd webdev
git checkout fullstackopen
```

Navigate to the query-anecdotes folder and install dependencies:
```bash
cd part6/query-anecdotes
npm install
```

Available scripts:
```bash
# Start the custom json-server backend on port 3001 (required before running the app)
npm run server

# Start the app in development mode with hot module replacement
npm run dev

# Create an optimized production build
npm run build

# Preview the production build locally
npm run preview

# Lint all JavaScript and JSX files
npm run lint
```
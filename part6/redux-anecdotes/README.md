## Full Stack Open 2025 - Part 6
This directory contains my **frontend implementation** for the **redux-anecdotes** project in **Part 6** of the [Full Stack Open 2025](https://fullstackopen.com/en/part6) course.

The focus of this project is on **Redux Toolkit** - managing complex application state using multiple slices (anecdotes, filter, notification), async thunks for backend communication, and a `json-server` REST backend.

The project is built with: `React`, `Redux Toolkit`, `react-redux`, `json-server`

Each solved exercise is committed using the following convention:  
> `Completed [exercise number]: [exercise name]. [what was done in the exercise]`

## Exercises
| Section                     | Range       | Description                                                                         |
|-----------------------------|-------------|-------------------------------------------------------------------------------------|
| `Anecdotes`                 | 6.3 – 6.13  | Redux store, Redux Toolkit, reducers, action creators, createSlice, combineReducers |
| `Anecdotes and the Backend` | 6.15 – 6.19 | json-server, async thunks, initializing store from backend, service layer           |

## Setup


### NPM packages

**Production dependencies**
- `@reduxjs/toolkit` - official Redux toolset providing `createSlice`, `configureStore`, and async thunk utilities
- `react` - core React library for building user interfaces
- `react-dom` - React package for DOM-specific rendering
- `react-redux` - official React bindings for Redux (`useSelector`, `useDispatch`, `Provider`)
- `redux` - predictable state container (used as a peer dependency)

**Development dependencies**
- `@eslint/js` - ESLint's core rule definitions
- `@types/react` - type definitions for React
- `@types/react-dom` - type definitions for React DOM
- `@vitejs/plugin-react` - Vite plugin enabling React fast refresh and JSX transformation
- `eslint` - JavaScript linter for code quality enforcement
- `eslint-plugin-react-hooks` - enforces the Rules of Hooks
- `eslint-plugin-react-refresh` - ensures proper configuration for React Fast Refresh
- `globals` - predefined global variables for ESLint environment awareness
- `json-server` - lightweight REST API mock server backed by `db.json`
- `vite` - modern build tool and development server


### NPM scripts
- `dev` - run the development server with **Vite** (hot-reloading enabled)
- `build` - create a **production-ready build** of the React app
- `lint` - run **ESLint** to check for syntax or style issues
- `preview` - locally preview the **production build**
- `server` - start the **json-server** mock REST API on port `3001` using `db.json`


## Overview

**Project Tree**
<details>
<summary><strong>Project Structure</strong></summary>

```bash
redux-anecdotes/            # Root folder
├── .gitignore
├── db.json                 # json-server data source
├── eslint.config.js        # ESLint configuration
├── index.html              # SPA entry point
├── package.json
├── package-lock.json
├── vite.config.js          # Vite configuration
│
├── public/                 # Public assets
│   └── vite.svg
│
└── src/
    ├── main.jsx            # React root and Redux Provider setup
    ├── App.jsx             # Root component, dispatches store initialization
    ├── store.js            # Redux store configuration
    │
    ├── components/         # React UI components
    │   ├── AnecdoteForm.jsx
    │   ├── AnecdoteList.jsx
    │   ├── Filter.jsx
    │   └── Notification.jsx
    │
    ├── reducers/           # Redux Toolkit slices
    │   ├── anecdoteReducer.js
    │   ├── filterReducer.js
    │   └── notificationReducer.js
    │
    └── services/           # Backend API communication
        └── anecdotes.js
```
</details>


**Root Folder**
- **db.json** - data source file for `json-server`. Contains the initial list of anecdotes with `id`, `content`, and `votes` fields. Acts as the persistent backend store during development
- **eslint.config.js** - contains ESLint rules for static code analysis and enforcing code style
- **index.html** - SPA entry point
- **vite.config.js** - Vite build tool and dev server configuration


**src root folder**
- **main.jsx** - wraps the app in Redux `Provider` with the configured store and renders the root `App` component
- **App.jsx** - root component that dispatches `initializeAnecdotes()` on mount via `useEffect` to load anecdotes from the backend. Renders `Notification`, `Filter`, `AnecdoteList`, and `AnecdoteForm`
- **store.js** - configures the Redux store using `configureStore` from Redux Toolkit, combining three reducers: `anecdotes`, `filter`, and `notification`


**components folder**
- **AnecdoteForm.jsx** - form for creating new anecdotes. Dispatches `appendAnecdote()` thunk to persist to the backend and `setNotification()` to display a confirmation message
- **AnecdoteList.jsx** - displays the filtered and sorted list of anecdotes. Uses `useSelector` to derive the visible anecdotes (filtered by search string, sorted by votes descending). Each anecdote dispatches `updateVote()` and `setNotification()` on vote click
- **Filter.jsx** - controlled input for filtering anecdotes. Dispatches `createFilter()` on every keystroke to update the filter slice in the store
- **Notification.jsx** - reads `state.notification` via `useSelector` and displays it in a styled box. Returns `null` when the notification is empty


**reducers folder**
- **anecdoteReducer.js** - Redux Toolkit slice managing the anecdotes array. Contains three reducers (`createAnecdote`, `updateAnecdote`, `setAnecdotes`) and three async thunks:
  - `initializeAnecdotes` - fetches all anecdotes from the backend and populates the store
  - `appendAnecdote` - creates a new anecdote via the service layer and adds it to the store
  - `updateVote` - increments the vote count for a given anecdote using `getState()` to retrieve the current state before updating

- **filterReducer.js** - simple slice managing a single string value for the search filter. Exposes `createFilter` action to update the filter on input change

- **notificationReducer.js** - slice managing the notification message string. Exposes `setNotification(message, timeInSeconds)` async thunk that dispatches `showNotification`, then clears it after the given timeout using a module-scoped `timeoutId` to cancel any active timer before setting a new one


**services folder**
- **anecdotes.js** - handles all backend communication with the `json-server` API at `http://localhost:3001/anecdotes`. Exports:
  - `getAll` - fetches all anecdotes
  - `createNew(content)` - POSTs a new anecdote with `votes: 0`
  - `update(id, updatedAnecdote)` - PUTs the updated anecdote (used for vote increments)


## Clone and run locally

Clone this repository:
```bash
git clone https://github.com/asweetcakee/webdev.git
cd webdev
git checkout fullstackopen
```

Navigate to the redux-anecdotes folder and install dependencies:
```bash
cd part6/redux-anecdotes
npm install
```

Available scripts:
```bash
# Start the json-server mock backend on port 3001 (required before running the app)
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
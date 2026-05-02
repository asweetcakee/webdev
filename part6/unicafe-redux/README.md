## Full Stack Open 2025 - Part 6
This directory contains my **frontend implementation and unit tests** for the **unicafe-redux** project in **Part 6** of the [Full Stack Open 2025](https://fullstackopen.com/en/part6) course.

The focus of this project is on introducing **Redux** as a state management solution - building a simple feedback counter app and testing its reducer logic with **Vitest** and **deep-freeze**.

The project is built with: `React`, `Redux`  
Tests covered with: `Vitest`, `deep-freeze`

Each solved exercise is committed using the following convention:  
> `Completed [exercise number]: [exercise name]. [what was done in the exercise]`

## Exercises
| Section             | Range     | Description                                                                    |
|---------------------|-----------|--------------------------------------------------------------------------------|
| `Unicafe revisited` | 6.1 - 6.2 | Redux store, counterReducer, action dispatching, immutability with deep-freeze |


## Setup


### NPM packages

**Production dependencies**
- `react` - core React library for building user interfaces
- `react-dom` - React package for DOM-specific rendering
- `redux` - predictable state container for managing application state

**Development dependencies**
- `@eslint/js` - ESLint's core rule definitions
- `@types/react` - type definitions for React (useful for editor IntelliSense)
- `@types/react-dom` - type definitions for React DOM
- `@vitejs/plugin-react` - Vite plugin enabling React fast refresh and JSX transformation
- `deep-freeze` - ensures state objects are not mutated directly in reducer tests
- `eslint` - JavaScript linter for code quality enforcement
- `eslint-plugin-react-hooks` - enforces the Rules of Hooks and hook usage correctness
- `eslint-plugin-react-refresh` - ensures proper configuration for React Fast Refresh
- `globals` - predefined global variables for ESLint environment awareness
- `vite` - modern build tool and development server for fast bundling
- `vitest` - unit and integration testing framework compatible with Vite


### NPM scripts
- `dev` - run the development server with **Vite** (hot-reloading enabled)
- `build` - create a **production-ready build** of the React app
- `lint` - run **ESLint** to check for syntax or style issues
- `preview` - locally preview the **production build**
- `test` - run all **Vitest** unit tests once (non-watch mode)


## Overview

**Project Tree**
<details>
<summary><strong>Project Structure</strong></summary>

```bash
unicafe-redux/              # Root folder
├── .gitignore
├── eslint.config.js        # ESLint configuration
├── index.html              # SPA entry point
├── package.json
├── package-lock.json
├── vite.config.js          # Vite build and dev server configuration
│
├── public/                 # Public assets
│   └── vite.svg
│
└── src/
    ├── main.jsx            # React root, Redux store creation, and DOM rendering
    └── reducers/
        ├── counterReducer.js       # Redux reducer for feedback state
        └── counterReducer.test.js  # Vitest unit tests for counterReducer
```
</details>


**Root Folder**
- **eslint.config.js** - contains ESLint rules for static code analysis and enforcing code style
- **index.html** - SPA entry point
- **vite.config.js** - Vite build tool configuration


**src root folder**
- **main.jsx** - creates the Redux store using `createStore` and `counterReducer`, renders the `App` component, and subscribes to store updates via `store.subscribe(renderApp)` to trigger re-renders on state changes. The UI is defined inline: dispatches `GOOD`, `OK`, `BAD`, and `RESET` actions directly on button clicks


**reducers folder**
- **counterReducer.js** - Redux reducer managing the feedback counter state (`good`, `ok`, `bad`). Handles four action types: `GOOD`, `OK`, `BAD` (each incrementing the respective counter), and `RESET` (returning to the initial zero state). Uses object spread to avoid direct state mutation

- **counterReducer.test.js** - Vitest unit tests for `counterReducer`. Uses `deep-freeze` to enforce immutability on state objects before each action. Covers:
  - returning the correct initial state on an unknown action
  - incrementing `good`, `ok`, and `bad` counters independently
  - resetting all counters to zero on `RESET`


## Clone and run locally

Clone this repository:
```bash
git clone https://github.com/asweetcakee/webdev.git
cd webdev
git checkout fullstackopen
```

Navigate to the unicafe-redux folder and install dependencies:
```bash
cd part6/unicafe-redux
npm install
```

Available scripts:
```bash
# Start the app in development mode with hot module replacement
npm run dev

# Create an optimized production build
npm run build

# Preview the production build locally
npm run preview

# Run all Vitest unit tests once
npm test

# Lint all JavaScript and JSX files
npm run lint
```
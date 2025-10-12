## Full Stack Open 2025 — Part 5
This directory contains my **frontend implementation and unit tests (vitest)** for **Part 5** of the [Full Stack Open 2025](https://fullstackopen.com/en/part5) course.

The focus of Part 5 is on **testing React applications** - including unit and E2E testing, while using the completed bloglist-backend from Part 4 with minor fixes and adjustments.

The frontend project is built with: `React` and `Axios`
Tests covered with: `Vitest`, `jsdom`

Each solved exercise is committed using the following convention:  
> `Completed [exercise number]: [exercise name]. [what was done in the exercise]`


## Exercises
| Section                           | Range       | Description                                                                            |
|-----------------------------------|-------------|----------------------------------------------------------------------------------------|
| `Blog List Frontend`              | 5.1 – 5.12  | Login Form, Conditional Rendering, LocalStorage, components, props.children, useRef    |
| `Blog List Tests`                 | 5.13 – 5.16 | Unit testing, Vitest, jsdom, debugging, test coverage                                  |
| `Blog List End To End Testing`    | 5.17 – 5.23 | E2E testing, Playwright, Test initialization, DB state control, debugging              |

## Setup


### NPM packages

**Production dependencies**
- `axios` - promise-based HTTP client used for communication with the backend API  
- `react` - core React library for building user interfaces  
- `react-dom` - React package for DOM-specific rendering and hydration

**Development dependencies**
- `@eslint/js` - ESLint’s core rule definitions  
- `@testing-library/jest-dom` - custom Jest matchers for DOM assertions  
- `@testing-library/react` - utilities for testing React components  
- `@testing-library/user-event` - simulates realistic user interactions (typing, clicking, etc.)  
- `@types/react` - type definitions for React (useful for editor IntelliSense)  
- `@types/react-dom` - type definitions for React DOM  
- `@vitejs/plugin-react` - Vite plugin enabling React fast refresh and JSX transformation  
- `@vitest/coverage-v8` - coverage reporting for Vitest using V8 engine  
- `eslint` - JavaScript linter for code quality enforcement  
- `eslint-plugin-react` - ESLint rules specific to React best practices  
- `eslint-plugin-react-hooks` - enforces the Rules of Hooks and hook usage correctness  
- `eslint-plugin-react-refresh` - ensures proper configuration for React Fast Refresh  
- `globals` - predefined global variables for ESLint environment awareness  
- `jsdom` - simulated browser environment for testing React components  
- `vite` - modern build tool and development server for fast bundling  
- `vitest` - unit and integration testing framework compatible with Vite


### NPM scripts
- `dev` - run the development server with **Vite** (hot-reloading enabled)  
- `build` - create a **production-ready build** of the React app  
- `lint` - run **ESLint** to check for syntax or style issues  
- `lint:fix` - run ESLint and **automatically fix** any correctable issues  
- `preview` - locally preview the **production build**
- `test` - run all **Vitest** unit and integration tests once (non-watch mode)


## Overview

**Project Tree**  
<details>
<summary><strong>Project Structure</strong></summary>

```bash
bloglist-frontend/              # Root folder  
├── .gitignore  
├── README.md                   # project readme  
├── eslint.config.mjs           # ESLint configuration  
├── index.html                  # SPA entry point  
├── package.json  
├── package-lock.json  
├── testSetup.js                # global test setup for React Testing Library (jest-dom + cleanup) 
├── vite.config.js              # configures dev server proxy and Vitest environment (jsdom)
│
├── public/                     # public assets  
│   └── vite.svg  
│
└── src/                        
    ├── components/             # React components and unit tests  
    │   ├── Blog.jsx            
    │   ├── Blog.test.jsx       
    │   ├── BlogForm.jsx        
    │   ├── BlogForm.test.jsx   
    │   ├── Notification.jsx    
    │   └── Togglable.jsx       
    │
    ├── hooks/                  # custom React hooks  
    │   └── useNotification.js  # handles notification system  
    │
    ├── services/               # API communication layer  
    │   ├── blogs.js            
    │   └── login.js             
    │
    ├── App.jsx                 # main React component  
    └── main.jsx                # React root and DOM rendering entry point 
```
</details>


**Root Folder**
- **eslint.config.mjs** - contains ESLint rules for static code analysis and enforcing code style
- **index.html** - SPA entry point
- **testSetup.js** - global test setup for React Testing Library (jest-dom + cleanup)
- **vite.config.js** - configures dev server proxy and Vitest environment (jsdom)


**src root folder**
- **main.jsx** - React root and DOM rendering entry point
- **App.jsx** - main React component managing authentication, blog list state, and backend interactions


**components folder**
- **Blog.jsx** - displays individual blog entry, toggles details (URL, likes, user) visibility and handles like/delete actions
- **Blog.test.jsx** - unit tests for Blog component. Verifies default rendering, view toggle, and like button behavior
- **BlogForm.jsx** - controlled form component for creating new blogs. Manages title, author, and URL inputs and triggers parent createBlog handler on submit
- **BlogForm.test.jsx** - unit tests for BlogForm. Verifies form submission calls createBlog with correct input data
- **Notification.jsx** - reusable component for displaying success or error messages. Dynamically styles notifications based on `type` (success, error, or default)
- **Togglable.jsx** - wrapper component that shows or hides its children. Exposes `show`, `hide`, and `toggle` methods via React ref for parent control (used to toggle BlogForm visibility)


**hooks folder**
- **useNotification.js** - custom React hook that manages notification messages and types (success, error, default). Automatically clears notifications after 5 seconds and exposes `notify()` for triggering alerts


**services folder**
- **blogs.js** - handles all blog-related API operations (`getAll`, `create`, `update`, `deleteBlog`), includes token-based authorization using Axios
- **login.js** - manages user authentication by sending login credentials to the backend and returning the authenticated user data


## Clone and run locally

Clone this repository:
```bash
git clone https://github.com/asweetcakee/webdev.git
cd webdev
git checkout fullstackopen
```

Navigate to the frontend folder and install dependencies:
```bash
cd part5/bloglist-frontend
npm install
```

Available scripts:
```bash
# Start the app in development mode with hot module replacement (auto reload on save)
npm run dev

# Create an optimized production build
npm run build

# Preview the production build locally (useful for deployment verification)
npm run preview

# Run all tests once in headless mode using Vitest
npm test

# Lint all JavaScript and JSX files to detect stylistic and code-quality issues
npm run lint

# Automatically fix lint errors where possible
npm run lint:fix
```
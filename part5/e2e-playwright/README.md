## Full Stack Open 2025 — Part 5
This directory contains my **end-to-end (E2E) tests** for **Part 5** of the [Full Stack Open 2025](https://fullstackopen.com/en/part5) course, built with **Playwright**.

It verifies the complete user workflow across the [**frontend (React)**](https://github.com/asweetcakee/webdev/tree/fullstackopen/part5/bloglist-frontend) and [**backend (Express/MongoDB)**](https://github.com/asweetcakee/webdev/tree/fullstackopen/part5/bloglist-backend) to ensure all features behave as expected in real browser conditions.

Each solved exercise is committed using the following convention:  
> `Completed [exercise number]: [exercise name]. [what was done in the exercise]`

## Exercises
| Section                           | Range       | Description                                                                            |
|-----------------------------------|-------------|----------------------------------------------------------------------------------------|
| `Blog List Frontend`              | 5.1 – 5.12  | Login Form, Conditional Rendering, LocalStorage, components, props.children, useRef    |
| `Blog List Tests`                 | 5.13 – 5.16 | Unit testing, Vitest, jsdom, debugging, test coverage                                  |
| `Blog List End To End Testing`    | 5.17 – 5.23 | E2E testing, Playwright, Test initialization, DB state control, debugging              |


## Setup


### NPM Packages

**Development dependencies**
- `@playwright/test` — core Playwright testing framework providing browser automation, assertions, and reporting tools for end-to-end testing  
- `@types/node` — TypeScript type definitions for Node.js, improving IntelliSense and static analysis in editors


### NPM Scripts
- `test` — runs all **Playwright test suites** once in headless mode (Chrome, Firefox, and WebKit)  
- `test:ui` — launches **Playwright’s interactive test runner UI** for visual debugging and step-by-step execution  
- `test:debug` — opens the browser in **debug mode**, pauses at each Playwright action, and allows breakpoints for troubleshooting  
- `test:report` — generates and displays an **HTML report** summarizing all test results, screenshots, and traces


## Overview

**Project Tree**  
<details>
<summary><strong>Project Structure</strong></summary>

```bash
bloglist-frontend/              # Root folder  
├── .gitignore  
├── README.md                   # project readme  
├── playwright.config.js        # Global Playwright configuration 
├── package.json  
├── package-lock.json  
│
└── tests/                        
    ├── blog_app.spec.js        # Main Playwright test suite for Bloglist app     
    └── helper.js               # Reusable utility functions shared across tests
```
</details>


**Root Folder**  
- **playwright.config.js** - configures Playwright end-to-end testing environment.  
  Key settings:  
  - **timeout: 3000** - limits max test execution time to 3 seconds  
  - **fullyParallel: false** - disables full parallelization for stable DB-dependent tests  
  - **workers: 1** - runs tests sequentially to avoid race conditions  
  - **baseURL: 'http://localhost:5173'** - sets frontend test target (Vite dev server)


**tests folder**
- **blog_app.spec.js** – main Playwright E2E suite verifying end-to-end functionality of the Blog app (authentication, blog creation, likes, deletion, permissions, sorting).  
  - Resets backend via `/api/testing/reset` before each test.  
  - Creates two test users (`test`, `second`) for ownership and authorization checks.  
  - Validates login UI elements and login success/failure notifications.  
  - Ensures blogs are ordered by like count in descending order.  
  - Confirms authenticated users can create, view, like, and delete their own blogs.  
  - Verifies non-owners cannot delete blogs created by others.  
  - Asserts consistent UI states using helper locators and custom assertions.  

- **helper.js** – utility module encapsulating reusable Playwright test helpers to keep test logic DRY and readable.  
  - **loginWith(page, username, password)** – fills login form and submits.  
  - **hasNotification(page, message, textColor, borderColor)** – asserts notification text and CSS color styles.  
  - **openBlogForm(page)** – opens the blog creation form.  
  - **fillAndSubmitBlogForm(page, blog)** – completes and submits blog creation form with provided data.  
  - **expectLocatorsVisible(locators)** – ensures all given Playwright locators are visible.  
  - **getToken(request, credentials)** – logs in via API and retrieves JWT token for authenticated requests.  
  - **addBlogs(request, blogs, token)** – creates multiple blogs using authenticated API calls.  
  - **expectBlogsOrderedByTitle(page, expectedTitles)** – asserts blogs appear in the expected order.  
  - **expandAllBlogs(page, blogs)** – expands all blog details by title.  
  - **getLikeCounts(page)** – retrieves and parses numeric like counts for sorting verification.  


## Clone and run locally

Clone this repository:
```bash
git clone https://github.com/asweetcakee/webdev.git
cd webdev
git checkout fullstackopen
```

Navigate to the E2E folder and install dependencies:
```bash
cd part5/e2e-playwright
npm install
```

Available scripts:
```bash
# Run all Playwright tests in headless mode
npm run test

# Open the HTML test report generated by the last run
npm run test:report

# Launch Playwright in interactive UI mode to run/debug tests visually
npm run test:ui

# Run tests in debug mode with the Playwright inspector for step-by-step debugging
npm run test:debug
```

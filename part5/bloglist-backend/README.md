## Full Stack Open 2025 — Part 5  
This directory contains my **backend implementation**, originally built for [**Part 4**](https://github.com/asweetcakee/webdev/tree/fullstackopen/part4/bloglist),  
and now **reused and slightly improved** for **Part 5** of the [Full Stack Open 2025](https://fullstackopen.com/en/part5) course.

The project is built with **Node.js**, **Express**, and **MongoDB** (via Mongoose) and focuses on:

- **Unit testing** and **Integration testing** with **Jest** and **Supertest**  
- Connecting the application to a **MongoDB** database
- Implementing secure password hashing with **bcrypt**  
- Adding token-based authentication using **JSON Web Token (JWT)**


## Updates in Part 5

### **POST /api/blogs**
- Prevents clients from overriding the `user` field in the request body (fixes a potential privilege escalation issue).  
- Ensures that the authenticated user from the token is always the creator of the blog.  
- The created blog response now includes populated user information (`username`, `name`, and `id`).

### **PUT /api/blogs/:id**
- Only the *owner* (authenticated creator) of the blog can update it.  
- The updated blog response now also includes populated user details for consistent frontend rendering.

### **Testing Environment**
- Added a **conditional test route mount** for integration testing in `app.js`
```js
  if (process.env.NODE_ENV === 'test') {
    const testingRoutes = require('./controllers/testing')
    app.use('/api/testing', testingRoutes)
  }
```
 

## Setup


### NPM packages

**Production dependencies**
- `bcrypt` — password hashing  
- `cross-env` — set environment variables across OSes  
- `dotenv` — environment variable management  
- `express` — web server framework  
- `jsonwebtoken` — token-based authentication  
- `mongoose` — MongoDB ODM  
- `morgan` — HTTP request logging 

**Development dependencies**
- `eslint` — JavaScript linter  
- `@eslint/js` — ESLint's core rules  
- `@stylistic/eslint-plugin-js` — stylistic linting rules  
- `globals` — predefined global variables for ESLint  
- `supertest` — HTTP endpoint testing

### NPM scripts
- `start` — Run the application in **production** mode  
- `dev` — Run the application in **development** mode with file watching enabled  
- `test` — Run all tests in **test** environment  
- `test:only` — Run only tests marked with `test.only()` in **test** environment  
- `lint` — Run ESLint to check for code style and syntax issues

## Overview

**Project Tree**  
<details>
<summary><strong>Project Structure</strong></summary>

```bash
bloglist/                  # Root folder  
├── .env                   # Environment variables (not committed)  
├── .env.example           # Example environment variables  
├── .gitignore  
├── app.js                 # Express application setup  
├── eslint.config.mjs      # ESLint configuration  
├── index.js               # Application entry point  
├── package.json  
├── package-lock.json  
|
├── controllers/           # Route controllers  
│   ├── blogs.js  
│   ├── login.js  
│   └── users.js  
|
├── models/                # Mongoose models  
│   ├── blog.js  
│   └── user.js  
|
├── test_routes/           # REST client test files  
│   ├── delete.rest  
│   ├── get.rest  
│   ├── post.rest  
│   └── put.rest  
|
├── tests/                 # Jest & Supertest test files  
│   ├── bloglists_for_testing.js  
│   ├── blogs_api.test.js  
│   ├── list_helper.test.js  
│   ├── test_helper.js  
│   └── users_api.test.js  
|
└── utils/                 # Utility modules  
    ├── config.js  
    ├── list_helper.js  
    ├── logger.js  
    └── middleware.js  
```
</details> 

**Root Folder**  

- **index.js** — starts the server on the defined `PORT` and imports the Express app from `app.js`  
- **app.js** — configures and attaches all middlewares, sets up routes, and connects to MongoDB
- **.env.example** — provides an example of required environment variables for running the Bloglist app 
- **eslint.config.mjs** — contains ESLint rules for static code analysis and enforcing code style  



**Controllers Folder**
Contains API route handlers for the Bloglist app following **RESTful guidelines**
**Base Routes:**
- `/api/blogs`
- `/api/users`
- `/api/login`

**blogs.js** — handles:
  - **GET /api/blogs** — fetch all blogs as JSON, with populated user data
  - **GET /api/blogs/:id** — fetch a specific blog by an existing ID
  - **POST /api/blogs** — creates a new blog and assign it to the first user (according to exercise requirements)
  - **DELETE /api/blogs/:id** — deletes a blog by its existing ID
  - **PUT /api/blogs/:id** — updates a blog by its existing ID
  - **Authorization:** `POST`, `DELETE`, and `PUT` require the `userExtractor()` middleware for token verification

**users.js** — handles:
  - **GET /api/users** — fetch all users as JSON, with populated blog data
  - **POST /api/users** — creates a new user and passwords are hashed by using **bcrypt** (10 salt rounds)

**login.js** — handles:
  - **POST /api/login** — authenticate a user and return a json web token (JWT). Requires plain-text password for verification



**Models Folder**
Contains **Mongoose document schemas** for `Blog` and `User`

- **blog.js** — Blog schema:
  ```js
  {
    title: String,
    author: String,
    url: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: Number
  }
  ```
  - transforms JSON by replacing `_id` with `id`
  - removes `_id` and `__v` fields from the output

- **user.js** — User schema:
  ```js
  {
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    username: { type: String, unique: true },
    name: String,
    passwordHash: String // hashed using bcrypt
  }
  ```
  - transforms JSON by replacing `_id` with `id`
  - removes `_id`, `__v` and `passwordHash` fields from the output



**Utils Folder**  
Contains utility files:

- **config.js**  
  Uses `dotenv` to access and store `.env` variables

- **list_helper.js**  
  Contains helper functions for `list_helper.test.js`

- **logger.js**  
  Contains logic for logging

- **middleware.js**  
  Includes five middlewares that are used across the application



**Middlewares**  
The application includes **five** middlewares:

- **httpLogger**  
  Logs HTTP requests using the `morgan` library with a custom format including request body
  Disabled in the `test` environment to avoid noisy logs

- **unknownEndpoint**  
  Returns a `404 Not Found` error when a request is made to a non-existent endpoint

- **errorHandler**  
  Handles and responds to specific errors with corresponding status codes:  
  - `CastError` → 400 (malformatted ID)  
  - `ValidationError` → 400 (validation failure)  
  - MongoDB duplicate key error → 400 (username must be unique)  
  - Token errors (`token is missing`, `invalid token`, `no user to assign`) → 401 (unauthorized)

- **tokenExtractor**  
  Extracts a token from the `Authorization` header (expects `"Bearer <token>"`) and stores it in `req.token`

- **userExtractor**  
  Verifies the token, finds the corresponding user from the database, and attaches the user object to `req.user`
  Throws an error if the token is missing, invalid, or no matching user is found



**Tests folder**  
Contains automated tests and helpers for the application:

- **API Tests**:  
  - `/api/blogs` — CRUD and authentication tests for blog operations
  - `/api/users` — User creation and validation tests 
  - `list_helper.test.js` — Unit tests for list manipulation helper functions

- **Helper Files**:  
  - `bloglists_for_testing.js` — provides static blog lists for test scenarios  
  - `test_helper.js` — provides reusable helper functions and `initialUsers` array for setting up test data



**test_helper.js**  
Contains reusable test utilities and mock data for integration and unit tests
- **initialBlogs** — predefined set of blogs (from `bloglists_for_testing`) for seeding test data
- **initialUsers** — array of initial user objects with plain-text passwords for test setup

**Helper Functions:**
- **blogsInDb** — retrieves the current list of blogs from the database in JSON format (transformed as per Blog model)  
- **usersInDb** — retrieves the current list of users from the database in JSON format (transformed as per User model)  
- **generateNonExistingId** — creates a valid but non-existent MongoDB ID by temporarily saving and deleting a document using Mongoose  
- **hashPassword** — hashes a given password using `bcrypt` with 10 salt rounds
- **getFirstUserFromDb** — returns the first user in the database as an object with a plain-text password (matched from `initialUsers`) for test assertions
- **loginAndGetToken** — logs in with given user credentials and returns a valid token (*expects a plain-text password*)
- **generateNonExistingToken** — generates a valid JWT token for a non-existent user by signing a fake Mongoose ID with `jsonwebtoken`



**Test_routes folder**  
Contains integration test files that perform HTTP requests (GET, POST, DELETE, PUT) against the API endpoints using a test runner (e.g., Jest + Supertest) 



## Clone and run locally

Clone this repository:
```bash
git clone https://github.com/asweetcakee/webdev.git
cd webdev
git checkout fullstackopen
```

Navigate to the backend folder (Express) and install dependencies:
```bash
cd part5/bloglist-backend
npm install
```

Create your `.env` file and by copying the provided `.env.example` and update values as needed:
```bash
cp .env.example .env
```

Available scripts:
```bash
# Start the app in development mode (with file watching --watch)
npm run dev

# Start the app in production mode
npm start

# Run all tests (if tests share the same DB, run sequentially to avoid race conditions:
#   Node's built-in test runner: npm test -- --test-concurrency=1
#   Jest: npm test -- --runInBand )
npm test

# Run only tests marked with `.only`
npm run test:only

# Lint the codebase
npm run lint
```
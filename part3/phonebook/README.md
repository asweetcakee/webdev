## Full Stack Open 2025 — Part 3
This directory contains my **backend and frontend solutions** to **Part 3** of the [Full Stack Open 2025](https://fullstackopen.com/en/part3) course. The focus is on **building a RESTful API using Node.js and Express**, connecting it to a **MongoDB** database, and integrating the API with a **React frontend**.
  
Each solved exercise is committed using the following convention:
> `Completed [exercise number]: [exercise name]. [what was done in the exercise]`

## Exercises
| Section        | Range       | Description                               |
|----------------|-------------|-------------------------------------------|
| `phonebook`    | 3.1 – 3.22  | CRUD API, middleware, MongoDB, deployment |

## Links
This part connects the **backend from Part 3** with the **frontend from Part 2**, and was deployed to a cloud platform (Render).

**Deployed Application:**
[Phonebook App on Render](https://phonebook-backend-p7zj.onrender.com)

**Production Backend Repository:**
[Phonebook Backend Repository](https://github.com/asweetcakee/phonebook-backend)

## Clone and run locally

Clone this repository:
```bash
git clone https://github.com/asweetcakee/webdev.git
cd webdev
git checkout fullstackopen
```

The **frontend and backend run on different ports** locally.

To start both:

**Frontend(Vite)**
```bash
cd part3/phonebook/frontend
npm install
npm run dev
```

**Backend(Express)**
```bash
cd part3/phonebook/backend
npm install
npm run dev
```

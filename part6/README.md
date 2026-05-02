## Full Stack Open 2025 - Part 6
This directory contains my **full stack implementation** for **Part 6** of the [Full Stack Open 2025](https://fullstackopen.com/en/part6) course.

The focus of Part 6 is on **advanced state management** - exploring Redux, Redux Toolkit, and TanStack Query as alternatives to local React state.

The projects are built with:
- **Frontend**: `React`, `Redux`, `Redux Toolkit`, `react-redux`
- **State / Server**: `TanStack Query`, `json-server`
- **Testing**: `Vitest`, `deep-freeze`

Each solved exercise is committed using the following convention:  
> `Completed [exercise number]: [exercise name]. [what was done in the exercise]`

## Folder structure
**Unicafe Redux**: [`unicafe-redux`](https://github.com/asweetcakee/webdev/tree/fullstackopen/part6/unicafe-redux) - feedback counter app using vanilla Redux and a custom reducer, with Vitest unit tests  
**Redux Anecdotes**: [`redux-anecdotes`](https://github.com/asweetcakee/webdev/tree/fullstackopen/part6/redux-anecdotes) - anecdote voting app using Redux Toolkit with multiple slices (anecdotes, filter, notification) and a json-server backend  
**Query Anecdotes**: [`query-anecdotes`](https://github.com/asweetcakee/webdev/tree/fullstackopen/part6/query-anecdotes) - anecdote app using TanStack Query for server state and React Context for notification state, backed by a custom json-server  

## Clone and run locally

Clone this repository:
`````````bash
git clone https://github.com/asweetcakee/webdev.git
cd webdev
git checkout fullstackopen
` ``

Navigate to the unicafe-redux folder and install dependencies:
````````bash
cd part6/unicafe-redux
npm install
` ``

Navigate to the redux-anecdotes folder and install dependencies:
```````bash
cd part6/redux-anecdotes
npm install
` ``

Navigate to the query-anecdotes folder and install dependencies:
``````bash
cd part6/query-anecdotes
npm install
` ``

### Running unicafe-redux
`````bash
npm run dev       # start the app
npm run test      # run Vitest unit tests
` ``

### Running redux-anecdotes
````bash
npm run server    # start json-server on port 3001
npm run dev       # start the app
` ``

### Running query-anecdotes
```bash
npm run server    # start custom json-server on port 3001
npm run dev       # start the app
` ``
```
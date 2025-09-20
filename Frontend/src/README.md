# Task Tracker Frontend

A simple Task Tracker application built with **React**, **Adobe React Spectrum**, and **Relay** for GraphQL data fetching.

## Features

- ✅ **Add New Tasks**: Create tasks with title and description
- ✅ **View Task List**: Display all tasks in a clean table view
- ✅ **Toggle Status**: Switch tasks between Pending and Completed
- ✅ **Responsive UI**: Built with Adobe React Spectrum components
- ✅ **GraphQL Integration**: Uses Relay for efficient data fetching

## Project Structure

```
src/
├── components/
│   ├── TaskForm.tsx       # Form to add new tasks
│   ├── TaskItem.tsx       # Individual task row component
│   ├── TaskList.tsx       # Task list/table component
│   └── TaskTracker.tsx    # Main container component
├── graphql/
│   └── queries.ts         # GraphQL queries and mutations
├── relay/
│   └── environment.ts     # Relay environment configuration
└── types/
    └── Task.ts            # TypeScript interfaces
```

## GraphQL Schema Requirements

The backend should expose these GraphQL operations at `/graphql`:

### Query
```graphql
type Query {
  getAllTasks: [Task!]!
}
```

### Mutations
```graphql
type Mutation {
  createTask(title: String!, description: String!): Task!
  updateTaskStatus(id: ID!, status: String!): Task!
}
```

### Types
```graphql
type Task {
  id: ID!
  title: String!
  description: String!
  status: String! # "Pending" or "Completed"
}
```

## Components Overview

### TaskForm
- Form with title (required) and description fields
- Calls `createTask` mutation on submit
- Includes form validation and loading states

### TaskList
- Fetches tasks using `getAllTasks` query
- Displays tasks in a responsive table
- Shows empty state when no tasks exist
- Handles loading and error states

### TaskItem
- Represents individual task rows
- Toggle button to switch between Pending/Completed
- Uses `updateTaskStatus` mutation
- Color-coded status badges

### TaskTracker
- Main container component
- Responsive grid layout
- Suspense boundary for async operations

## Technology Stack

- **React 18** - Frontend framework
- **Adobe React Spectrum** - UI component library
- **Relay** - GraphQL client for data fetching
- **TypeScript** - Type safety
- **Vite** - Build tool

## Backend Integration

This frontend is ready to connect to a .NET GraphQL backend. The Relay environment is configured to make requests to `/graphql` endpoint.

### Expected API Behavior

1. **getAllTasks**: Returns array of all tasks
2. **createTask**: Creates new task and returns it
3. **updateTaskStatus**: Updates task status and returns updated task

The mutations automatically update the Relay cache, ensuring the UI stays in sync with the backend state.

## Development Notes

- All GraphQL operations use Relay hooks (`useLazyLoadQuery`, `useMutation`)
- The app uses Adobe React Spectrum's theming system
- Error handling is implemented for all GraphQL operations
- Form validation prevents empty task creation
- Optimistic updates could be added for better UX

## Next Steps

1. Connect to your .NET GraphQL backend
2. Add task deletion functionality
3. Implement task editing
4. Add due dates and priorities
5. Add task filtering and sorting
6. Implement real-time updates with subscriptions
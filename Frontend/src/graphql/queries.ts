import { graphql } from 'react-relay';

// Relay operation definitions
export const GET_ALL_TASKS_QUERY = graphql`
  query queriesGetTasksQuery {
    taskList {
      id
      title
      description
      status
    }
  }
`;

export const CREATE_TASK_MUTATION = graphql`
  mutation queriesCreateTaskMutation($request: TaskRequestInput!) {
    createTask(request: $request) {
      id
      title
      description
      status
    }
  }
`;

export const UPDATE_TASK_STATUS_MUTATION = graphql`
  mutation queriesUpdateTaskMutation($id: UUID!, $status: Status!) {
    updateTask(id: $id, status: $status) {
      id
      title
      description
      status
    }
  }
`;

// Once you have your .NET GraphQL backend running:
// 1. Generate schema.graphql from your backend
// 2. Run: npx relay-compiler
// 3. Replace the above functions with these Relay queries:

/*
import { graphql } from 'react-relay';

export const GET_ALL_TASKS_QUERY = graphql`
  query getAllTasksQuery {
    getAllTasks {
      id
      title
      description
      status
    }
  }
`;

export const CREATE_TASK_MUTATION = graphql`
  mutation createTaskMutation($title: String!, $description: String!) {
    createTask(title: $title, description: $description) {
      id
      title
      description
      status
    }
  }
`;

export const UPDATE_TASK_STATUS_MUTATION = graphql`
  mutation updateTaskStatusMutation($id: ID!, $status: String!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      title
      description
      status
    }
  }
`;
*/
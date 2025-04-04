import { gql } from 'apollo-angular';

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      _id
      firstName
      lastName
      email
      department
      position
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      _id
      firstName
      lastName
      email
      department
      position
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: EmployeeInput!) {
    addEmployee(input: $input) {
      _id
      firstName
      lastName
      email
      department
      position
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      _id
      firstName
      lastName
      email
      department
      position
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;
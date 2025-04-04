const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Employee {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    department: String
    position: String
  }

  input EmployeeInput {
    firstName: String!
    lastName: String!
    email: String!
    department: String
    position: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    signup(username: String!, email: String!, password: String!): AuthPayload
    addEmployee(input: EmployeeInput!): Employee
    updateEmployee(id: ID!, input: EmployeeInput!): Employee
    deleteEmployee(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
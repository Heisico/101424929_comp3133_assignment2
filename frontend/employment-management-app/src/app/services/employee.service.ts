import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEES, GET_EMPLOYEE, ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '../graphql/queries';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getEmployees() {
    return this.apollo.watchQuery({
      query: GET_EMPLOYEES,
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  getEmployee(id: string) {
    return this.apollo.query({
      query: GET_EMPLOYEE,
      variables: { id },
      fetchPolicy: 'network-only'
    });
  }

  addEmployee(employee: any) {
    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: { input: employee }
    });
  }

  updateEmployee(id: string, employee: any) {
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: { id, input: employee }
    });
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { id }
    });
  }
}
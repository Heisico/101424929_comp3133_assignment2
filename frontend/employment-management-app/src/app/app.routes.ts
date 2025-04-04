import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'employees', 
    component: EmployeeListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'employees/add', 
    component: AddEmployeeComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'employees/:id', 
    component: ViewEmployeeComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'employees/edit/:id', 
    component: EditEmployeeComponent,
    canActivate: [authGuard]
  },
  
  { path: '**', redirectTo: '/login' }
];
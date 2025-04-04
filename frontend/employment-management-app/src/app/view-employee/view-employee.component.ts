import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatProgressSpinnerModule
  ]
})
export class ViewEmployeeComponent {
  employee: any;
  loading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: string },
    private employeeService: EmployeeService
  ) {
    this.loadEmployee();
  }

  loadEmployee() {
    this.employeeService.getEmployee(this.data.employeeId).subscribe({
      next: (result: any) => {
        this.employee = result.data.employee;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading employee:', error);
        this.loading = false;
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'actions'];
  loading = true;

  constructor(
    private employeeService: EmployeeService,
    public router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (result: any) => {
        this.employees = result.data.employees;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.loading = false;
      }
    });
  }

  viewEmployee(id: string) {
    this.dialog.open(ViewEmployeeComponent, {
      width: '500px',
      data: { employeeId: id }
    });
  }

  editEmployee(id: string) {
    this.router.navigate([`/employees/edit/${id}`]);
  }

  deleteEmployee(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title: 'Confirm Delete', message: 'Are you sure you want to delete this employee?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            this.loadEmployees();
          },
          error: (error) => {
            console.error('Error deleting employee:', error);
          }
        });
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DataService } from '../data.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  imports: [CommonModule, MatTableModule]
})
export class SummaryComponent implements OnInit {
  csvData: any[] = [];
  metadata: string[] = [];
  rowErrors: any[] = [];
  correctRows = 0;
  incorrectRows = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.csvData = this.dataService.getCsvData();
    this.metadata = this.dataService.getMetadata();
    this.validateData();
    this.calculateSummary();
  }

  validateData(): void {
    this.rowErrors = this.csvData.map(row => {
      const errors: any = {};
      if (!row.Name) errors.name = 'Empty value';
      if (!row.Email) {
        errors.email = 'Empty email';
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(row.Email)) {
        errors.email = 'Invalid email';
      }
      if (!row['Phone Number']) {
        errors.phoneNumber = 'Empty phone number';
      } else if (!/^\d{10}$/.test(row['Phone Number'])) {
        errors.phoneNumber = 'Invalid phone number';
      }
      if (!row.City) errors.city = 'Empty value';
      if (!row.Address) errors.address = 'Empty value';
      if (!row.GPA || isNaN(row.GPA) || row.GPA < 0 || row.GPA > 10) errors.gpa = 'Invalid GPA';

      return errors;
    });
  }

  calculateSummary(): void {
    this.correctRows = this.rowErrors.filter(errors => Object.keys(errors).length === 0).length;
    this.incorrectRows = this.rowErrors.length - this.correctRows;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  imports: [CommonModule]
})
export class SummaryComponent implements OnInit {
  csvData: any[] = [];
  rowErrors: any[] = [];
  correctRows = 0;
  incorrectRows = 0;

//   ngOnInit(): void {
//     const storedData = localStorage.getItem('csvData');
//     if (storedData) {
//       this.csvData = JSON.parse(storedData);
//       this.validateData();
//       this.calculateSummary();
//     }
//   }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedData = localStorage.getItem('csvData');
      if (storedData) {
        this.csvData = JSON.parse(storedData);
        this.validateData();
        this.calculateSummary();
      }
    } else {
      console.error('localStorage is not available');
    }
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

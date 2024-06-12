import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview',
  standalone: true,
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  imports: [CommonModule]
})
export class PreviewComponent implements OnInit {
  csvData: any[] = [];
  rowErrors: any[] = [];

  constructor(private router: Router) {}

    ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedData = localStorage.getItem('csvData');
      if (storedData) {
        this.csvData = JSON.parse(storedData);
        this.validateData();
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

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  goToSummary(): void {
    this.router.navigate(['/summary']);
  }
}
